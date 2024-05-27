import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar, { SortItem, SortProps } from "../../components/controlBar/SearchBar.component";
import FilterMenu from "../../components/filterMenu.tsx/FilterMenu.component";
import { useEffect, useState } from "react";
import { AirTableQueryBody } from "../../redux/services/airtable/types";
import useDebounce from "../../hooks/useDebounce";
import ProgramCourseCard, { IProgramCourseCard } from "./components/CourseCard.component";
import { useGetCourseListMutation } from "../../redux/services/airtable/course/courseApi";
import { useGetUniversityListQuery } from "../../redux/services/airtable/university/universityApi";
import { useGetUniversityTypeListQuery } from "../../redux/services/airtable/universityType/universityType";

//--------------
// interfaces
//--------------
interface IProgramProfile {
  programId: string;
}
//---------------
// component
//---------------
const ProgramProfile = ({ programId }: IProgramProfile) => {
  //-------------
  // local states
  //-------------
  const [courses, setCourses] = useState<IProgramCourseCard[]>([]);
  const [offset, setOffset] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortItem>({ field: "name", direction: "asc" });
  const [studyModeFilter, setStudyModeFilter] = useState<string>();
  //-------------
  // hooks
  //-------------
  const [getCourseList, { data, isLoading, isSuccess }] = useGetCourseListMutation();
  const { currentData: universityData } = useGetUniversityListQuery();
  const { currentData: typeData } = useGetUniversityTypeListQuery();
  const debouncedSearch = useDebounce(search, 500);

  //-------------
  // constants
  //-------------
  const queryBody: AirTableQueryBody = {
    pageSize: 5,
    sort: [sort],
    fields: ["name", "study_mode", "duration", "full_cost", "uni_id"],
    filterByFormula: `AND({program_id}="${programId}", SEARCH(LOWER("${debouncedSearch}"),LOWER({name}))
    ${studyModeFilter ? `,TRIM(LOWER({study_mode}))=LOWER("${studyModeFilter}")` : ""}
  )`,
    offset,
  };
  //-------------
  // triggers
  //-------------
  useEffect(() => {
    setCourses([]);
    getCourseList(queryBody);
  }, [debouncedSearch, sort, studyModeFilter, universityData, typeData]);

  useEffect(() => {
    if (!isLoading && data) {
      const { courseList } = data;
      const programCourseList: IProgramCourseCard[] = courseList.map(course => {
        const university = universityData?.universityList.find(university => course.universityId === university.id);
        const type = typeData?.universityTypeList.find(type => type.type === university?.type);
        return {
          ...course,
          logoImage: university?.image || university?.name || "",
          typeImage: type?.image || type?.type || "",
        };
      });
      setCourses(prev => [...prev, ...programCourseList]);
      setOffset(data?.offset);
    }
  }, [data, universityData, typeData]);
  //-------------
  // handlers
  //-------------
  const handleOnSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setOffset(undefined);
    setSearch(event.target.value);
  };
  const handleOnSort = (value: SortItem) => {
    setOffset(undefined);
    setSort(value);
  };
  const sortProps: SortProps = {
    sortItems: [
      { label: "Most Wanted", value: { field: "ranking", direction: "asc" } },
      { label: "Price Low to Hight", value: { field: "full_cost", direction: "asc" } },
      { label: "Price Hight to Low", value: { field: "full_cost", direction: "desc" } },
    ],
    onSelectSort: handleOnSort,
  };
  return (
    <Stack
      sx={{
        maxWidth: "100%",
        px: 2.5,
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box width={"100%"}>
        <SearchBar onSearch={handleOnSearch} sortProps={sortProps} />
      </Box>
      <Stack direction={"row"} gap={1} width={"100%"}>
        <FilterMenu
          fieldName="study_mode"
          label="Study mode"
          onFilter={(value: string) => {
            setOffset(undefined);
            setStudyModeFilter(value);
          }}
        />
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: " flex",
          flexDirection: " column",
          gap: 2,
          py: 0.5,
        }}
      >
        {isLoading && courses.length === 0 && (
          <Typography variant="h3" sx={{ alignSelf: "center" }}>
            Loading...
          </Typography>
        )}
        {isSuccess && courses.length === 0 && (
          <Typography variant="h3" sx={{ alignSelf: "center" }}>
            No Matching Records
          </Typography>
        )}
        {courses.map((value: IProgramCourseCard, index: number) => (
          <ProgramCourseCard
            name={value.name}
            fullCost={value.fullCost}
            studyMode={value.studyMode}
            duration={value.duration}
            logoImage={value.logoImage}
            typeImage={value.typeImage}
            key={index}
          />
        ))}
      </Box>
      {offset && (
        <Button
          disabled={isLoading}
          onClick={() => getCourseList(queryBody)}
          variant="outlined"
          sx={{ maxWidth: "fit-content", borderRadius: 4, color: "#ee8c00", borderColor: "#ee8c00" }}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
};

export { ProgramProfile };

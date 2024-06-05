import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar, { SortItem, SortProps } from "../../components/controlBar/SearchBar.component";
import FilterMenu from "../../components/filterMenu/FilterMenu.component";
import { useEffect, useState } from "react";
import { AirTableQueryBody } from "../../redux/course/airtable.model";
import useDebounce from "../../hooks/useDebounce";
import UniversityCourseCard from "./components/CourseCard.component";
import { useGetCourseListMutation } from "../../redux/course/course.api";
import { CourseModel } from "../../redux/course/course.model";

//--------------
// interfaces
//--------------
interface IUniversityProfile {
  universityId: number;
}

//---------------
// component
//---------------
const UniversityProfile = ({ universityId }: IUniversityProfile) => {
  //-------------
  // local states
  //-------------
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const [offset, setOffset] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortItem>({ field: "name", direction: "asc" });
  const [studyLevelFilter, setStudyLevelFilter] = useState<string>();
  const [studyFieldFilter, setStudyFieldFilter] = useState<string>();
  const [studyModeFilter, setStudyModeFilter] = useState<string>();
  //-------------
  // hooks
  //-------------
  const [getCourseList, { data, isLoading, isSuccess }] = useGetCourseListMutation();
  const debouncedSearch = useDebounce(search, 500);
  //-------------
  // constants
  //-------------
  const queryBody: AirTableQueryBody = {
    pageSize: 5,
    sort: [sort],
    fields: ["name", "study_mode", "duration", "full_cost"],
    filterByFormula: `AND({uni_id}=${universityId}, SEARCH(LOWER("${debouncedSearch}"),LOWER({name})) 
    ${studyLevelFilter ? `,TRIM(LOWER({degree}))=LOWER("${studyLevelFilter}")` : ""}
    ${studyFieldFilter ? `,TRIM(LOWER({study_field}))=LOWER("${studyFieldFilter}")` : ""}
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
  }, [debouncedSearch, sort, studyLevelFilter, studyFieldFilter, studyModeFilter]);

  useEffect(() => {
    if (!isLoading && data) {
      const { courseList } = data;
      setCourses(prev => [...prev, ...courseList]);
      setOffset(data?.offset);
    }
  }, [data]);
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
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box width={"100%"}>
        <SearchBar onSearch={handleOnSearch} sortProps={sortProps} />
      </Box>
      <Stack direction={"row"} gap={1} width={"100%"}>
        <FilterMenu
          fieldName="degree"
          label="Study Level"
          onFilter={(value: string) => {
            setOffset(undefined);
            setStudyLevelFilter(value);
          }}
        />
        <FilterMenu
          fieldName="study_field"
          label="Study field"
          onFilter={(value: string) => {
            setOffset(undefined);
            setStudyFieldFilter(value);
          }}
        />
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
        {courses.map((value: CourseModel, index: number) => (
          <UniversityCourseCard name={value.name} fullCost={value.fullCost} studyMode={value.studyMode} duration={value.duration} key={index} />
        ))}
      </Box>
      {offset && (
        <Button
          disabled={isLoading}
          onClick={() => getCourseList(queryBody)}
          variant="outlined"
          color="secondary"
          sx={{ maxWidth: "fit-content", borderRadius: 4 }}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
};

export { UniversityProfile };


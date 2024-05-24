import CourseCard from "./CourseCard.component";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar from "../../components/ControlBar/SearchBar.component";
import FilterMenu from "../../components/ControlBar/FilterMenu.component";
import { useGetCourseListMutation } from "../../services/airTable/airTable";
import { useEffect, useState } from "react";
import { AirTableQueryBody, UniversityCourseModel } from "../../services/airTable/types";
import useDebounce from "../../hooks/useDebounce";

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
  const [courses, setCourses] = useState<UniversityCourseModel[]>([]);
  const [offset, setOffset] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
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
    sort: [{ field: "name", direction: "asc" }],
    fields: ["name", "study_mode", "duration", "full_cost"],
    filterByFormula: `AND({uni_id}=${universityId}, SEARCH(LOWER("${debouncedSearch}"),LOWER({name})))`,
    offset,
  };

  //-------------
  // triggers
  //-------------

  useEffect(() => {
    setCourses([]);
    getCourseList(queryBody);
  }, [debouncedSearch]);

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
  return (
    <Stack
      sx={{
        maxWidth: "100%",
        px: 2.5,
        gap: 1,
        alignItems: "center",
      }}
    >
      {universityId}
      <Box width={"100%"}>
        <SearchBar onSearch={handleOnSearch} />
      </Box>
      <Stack direction={"row"} gap={1} width={"100%"}>
        <FilterMenu />
        <FilterMenu />
        <FilterMenu />
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
        {courses.map((value: UniversityCourseModel, index: number) => (
          <CourseCard name={value.name} fullCost={value.fullCost} studyMode={value.studyMode} duration={value.duration} key={index} />
        ))}
      </Box>
      {offset && (
        <Button disabled={isLoading} onClick={() => getCourseList(queryBody)} variant="outlined" sx={{ maxWidth: "fit-content", borderRadius: 4 }}>
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </Stack>
  );
};

export { UniversityProfile };

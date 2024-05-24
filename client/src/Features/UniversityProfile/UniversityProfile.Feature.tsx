import CourseCard from "./CourseCard.component";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar from "../../components/ControlBar/SearchBar.component";
import FilterMenu from "../../components/ControlBar/FilterMenu.component";
import { useGetCourseListMutation } from "../../services/airTable/airTable";
import { useEffect } from "react";
import { AirTableQueryBody, UniversityCourseModel } from "../../services/airTable/types";

interface IUniversityProfile {
  universityId: number;
}
const UniversityProfile = ({ universityId = 212 }: IUniversityProfile) => {
  const queryBody: AirTableQueryBody = {
    pageSize: 5,
    sort: [{ field: "name", direction: "asc" }],
    fields: ["name", "study_mode", "duration", "full_cost"],
    filterByFormula: `{uni_id}=${universityId}`,
    offset: undefined,
  };
  const [getCourseList, { data, isLoading }] = useGetCourseListMutation();
  useEffect(() => {
    getCourseList(queryBody);
  }, []);

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
        <SearchBar />
      </Box>
      <Stack direction={"row"} gap={1} width={"100%"}>
        <FilterMenu />
        <FilterMenu />
        <FilterMenu />
      </Stack>
      <Box
        sx={{
          display: " flex",
          flexDirection: " column",
          gap: 2,
          py: 0.5,
        }}
      >
        {isLoading && <Typography variant="h3">Loading...</Typography>}
        {!isLoading && data?.length === 0 && <Typography variant="h3">No Matching Records</Typography>}
        {data &&
          data.map((value: UniversityCourseModel, index: number) => (
            <CourseCard name={value.name} fullCost={value.fullCost} studyMode={value.studyMode} duration={value.duration} key={index} />
          ))}
      </Box>
      {!isLoading && data?.length !== 0 && (
        <Button variant="outlined" sx={{ maxWidth: "fit-content", borderRadius: 4 }}>
          Load More
        </Button>
      )}
    </Stack>
  );
};

export { UniversityProfile };

import ReactDOM from "react-dom/client";
import CourseCard from "./CourseCard.component";
import { Box, Button, Stack } from "@mui/material";
import SearchBar from "../../Components/ControlBar/SearchBar.component";
import FilterMenu from "../../Components/ControlBar/FilterMenu.component";
interface IUniversityProfile {
  universityId: number;
}
const UniversityProfile = ({ universityId }: IUniversityProfile) => {
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
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </Box>
      <Button variant="outlined" sx={{ maxWidth: "fit-content", borderRadius: 4 }}>
        Load More
      </Button>
    </Stack>
  );
};

// For WebFlow Embedding
const elementId = document.getElementById("uni-courses");
if (elementId) {
  try {
    const universityId = elementId.getAttribute("universityId");
    ReactDOM.createRoot(elementId).render(<UniversityProfile universityId={Number(universityId)} />);
  } catch (error) {
    console.error(error);
  }
}

export default UniversityProfile;

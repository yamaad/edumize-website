import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InstituteCourseFeeModel, InstituteCourseModel, InstituteModel } from "./institute.model";
import { languageInstituteCourseApi } from "./institute.api";

interface InstituteState {
  instituteList: InstituteModel[];
  currentInstitute?: InstituteModel;

  courseList: InstituteCourseModel[];
  selectedCourse?: InstituteCourseModel;

  courseFeeList: InstituteCourseFeeModel[];
  selectedCourseFee?: InstituteCourseFeeModel;
}

// Define the initial state using that type
const initialState: InstituteState = {
  instituteList: [],
  currentInstitute: undefined,

  courseList: [],
  selectedCourse: undefined,

  courseFeeList: [],
  selectedCourseFee: undefined,
};

export const InstituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setCurrentInstitute: (state, action: PayloadAction<number>) => {
      state.currentInstitute = state.instituteList.filter(institute => institute.id === action.payload)[0];
    },
    setSelectedCourse: (state, action: PayloadAction<InstituteCourseModel>) => {
      state.selectedCourse = action.payload;
    },
    setSelectedCourseFee: (state, action: PayloadAction<InstituteCourseFeeModel>) => {
      state.selectedCourseFee = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(languageInstituteCourseApi.endpoints.getLanguageInstitute.matchFulfilled, (state, action) => {
        state.instituteList = action.payload;
      })
      .addMatcher(languageInstituteCourseApi.endpoints.getLanguageInstituteCourseList.matchFulfilled, (state, action) => {
        state.courseList = action.payload;
      })
      .addMatcher(languageInstituteCourseApi.endpoints.getLanguageInstituteCourseFeeList.matchFulfilled, (state, action) => {
        state.courseFeeList = action.payload;
      });
  },
});

export const { setCurrentInstitute, setSelectedCourse, setSelectedCourseFee } = InstituteSlice.actions;
export default InstituteSlice.reducer;

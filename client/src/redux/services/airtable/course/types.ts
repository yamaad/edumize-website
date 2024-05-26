export interface FilterOptionsData {
  filterOptions: string[];
  offset?: string;
}

export interface CourseModel {
  name: string;
  studyMode?: string;
  fullCost: number;
  duration: string;
  universityId?: number;
}

export interface CourseData {
  courseList: CourseModel[];
  offset?: string;
}

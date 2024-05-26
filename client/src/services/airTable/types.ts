export interface UniversityCourseModel {
  name: string;
  studyMode?: string;
  fullCost: number;
  duration: string;
}
export interface UniversityModel {
  type: string;
  image: string;
}

export interface AirTableQueryBody {
  pageSize: number;
  sort?: { field: string; direction: string }[];
  fields: string[];
  filterByFormula: string;
  offset?: string;
}

export interface AirTableResponse {
  offset?: string;
  records: [];
}

export interface FilterOptionsData {
  filterOptions: string[];
  offset?: string;
}
export interface UniversityData {
  universityList: UniversityModel[];
  offset?: string;
}
export interface UniversityCourseData {
  courseList: UniversityCourseModel[];
  offset?: string;
}

export interface UniversityCourseModel {
  name: string;
  studyMode?: string;
  fullCost: number;
  duration: string;
}

export interface AirTableResponse {
  records: [];
}

export interface AirTableQueryBody {
  pageSize: number;
  sort: { field: string; direction: string }[];
  fields: string[];
  filterByFormula: string;
  offset?: string;
}

export interface AirTableQueryBody {
  pageSize: number;
  sort?: { field: string; direction: string }[];
  fields: string[];
  filterByFormula: string;
  offset?: string;
}

export interface AirTableResponse {
  offset?: string;
  records: any[];
}

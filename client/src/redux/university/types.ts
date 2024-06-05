export interface UniversityModel {
  id: number;
  name: string;
  type: string;
  image: string;
}
export interface UniversityData {
  universityList: UniversityModel[];
  offset?: string;
}

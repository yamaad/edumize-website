export interface UniversityTypeModel {
  type: string;
  image: string;
}
export interface UniversityTypeData {
  universityTypeList: UniversityTypeModel[];
  offset?: string;
}

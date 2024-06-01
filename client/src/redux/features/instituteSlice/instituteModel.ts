export interface InstituteModel {
  id: number;
  name: string;
  location: string;
}
export interface InstituteCourseModel {
  id: number;
  name: string;
}
export interface InstituteCourseFeeModel {
  id: number;
  duration: number;
  offer?: string;
  originalFee: number;
  discountedFee: number;
  edumizeDiscountRate: number;
  registrationFee: number;
  placementTest: number;
  visaAndInsurance: number;
  booksAndMaterials: number;
  immigrationClearanceAndAirportPickUp: number;
  instituteId: number;
  courseId: number;
}

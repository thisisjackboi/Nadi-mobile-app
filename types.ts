export enum Language {
  ENGLISH = 'English',
  ASSAMESE = 'অসমীয়া'
}

export enum GrievanceStatus {
  SUBMITTED = 'Submitted',
  IN_REVIEW = 'In Review',
  ASSIGNED = 'Assigned',
  RESOLVED = 'Resolved'
}

export enum GrievanceCategory {
  ROADS = 'Roads',
  ELECTRICITY = 'Electricity',
  WATER = 'Water',
  SANITATION = 'Sanitation',
  CORRUPTION = 'Corruption',
  OTHER = 'Other'
}

export interface User {
  phoneNumber: string;
  isVerified: boolean;
  aadhaarNumber?: string;
  name?: string;
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: GrievanceCategory;
  location: string;
  status: GrievanceStatus;
  dateSubmitted: string;
  imageUrl?: string;
  isAnonymous: boolean;
  updates: GrievanceUpdate[];
}

export interface GrievanceUpdate {
  date: string;
  title: string;
  description: string;
  author: string; // e.g., "System", "Junior Engineer"
}

export type ScreenName = 
  | 'SPLASH' 
  | 'LOGIN_LANG' 
  | 'LOGIN_PHONE' 
  | 'LOGIN_OTP' 
  | 'LOGIN_AADHAAR' 
  | 'DASHBOARD' 
  | 'SUBMIT_STEP_1' 
  | 'SUBMIT_STEP_2' 
  | 'SUBMIT_STEP_3' 
  | 'GRIEVANCE_DETAIL' 
  | 'PROFILE';

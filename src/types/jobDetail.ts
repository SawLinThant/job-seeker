export interface JobDetailTypeI {
  data: Data;
}

export interface Data {
  id: string;
  title: string;
  companyLogo: string;
  company: string;
  job_post_count: number;
  business_description?: string;
  business_job_post_count?: number;
  location: Location;
  applicants: number;
  views: number;
  salary: Salary;
  gender: string;
  job_requirement: string;
  date: string;
  workEnvironment: string;
  jobType: string;
  lastApplyDate: string;
  rating: number;
  job_description: string;
  is_applied: boolean;
  is_saved: boolean;
  job_level: string;
  year_of_experience: string;
  is_japanese_level_required: boolean;
  japanese_level: string;
  is_needed_to_upload_document: string;
  visa_type: string;
  total_review: number;
  business_id: string;
  is_can_review: boolean;

  reviews: REVIEW[];
}

export interface Location {
  region: string;
  township: string;
  country: string;
}

export interface Salary {
  start: number;
  end: number;
}
export interface REVIEW {
  id: string;
  reviewer_name: string;
  image: Image;
  reviewed_time: string;
  rating: number;
  review: string;
  total_like: number;
  is_liked_self: boolean;
}

export interface Image {
  id: string;
  title: string;
  path: string;
  size: string;
  file_format: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeDetailI {
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  website_url: string;
  company_size: string;
  phone: any;
  overview: string;
  recruited: number;
  address: any;
  job_posts: JobPost[];
  email: any;
}

export interface JobPost {
  id: string;
  title: string;
  companyLogo: string;
  company: string;
  location: string;
  applicants: string;
  views: string;
  salary: Salary;
  date: string;
  published_at: string;
  workEnvironment: string;
  jobType: string;
  lastApplyDate: string;
  rating: string;
  is_applied: boolean;
  is_saved: boolean;
  gender: any;
}

export interface Salary {
  start: number;
  end: number;
}

export interface IdealCandidate {
  age: string;
  gender: string;
  traits: string[];
}

export interface JobAbout {
  posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  end_date: string;
  categories: string[];
  required_skills: string[];
}

type ImageSource = string | { src: string; height: number; width: number; blurDataURL?: string; };

export interface JobPosting {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: IdealCandidate;
  when_where: string;
  about: JobAbout;
  company: string;
  image: ImageSource;
  display_tags: string[]; 
}

export interface JobDataRoot {
    job_postings: JobPosting[];
}
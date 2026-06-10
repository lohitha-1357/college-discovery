export type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  type: "IIT" | "NIT" | "Private" | "Deemed";
  courses: Course[];
  placements: Placement;
  reviews: Review[];
  overview: string;
  logo: string;
};

export type Course = {
  name: string;
  duration: string;
  fees: number;
};

export type Placement = {
  avgPackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type FilterState = {
  search: string;
  type: string[];
  minRating: number;
  maxFees: number;
  location: string;
};
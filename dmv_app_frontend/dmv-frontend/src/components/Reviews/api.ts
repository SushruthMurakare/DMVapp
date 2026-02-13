export interface Review {
  id: number;
  name: string;
  visit_type: string;
  test_date: Date;
  dmv_location: string;
  satisfied_count: string;
  experience: string;
}

export const fetchReviews = async (): Promise<Review[]> => {
  const res = await fetch("http://localhost:8000/reviews");
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

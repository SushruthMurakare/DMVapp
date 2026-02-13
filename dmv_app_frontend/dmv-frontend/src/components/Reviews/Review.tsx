import { useEffect, useState } from "react";
import { fetchReviews, type Review } from "./api";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading sections...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, max-content))",
        gap: "20px",
        padding: "20px",
        justifyContent: "center", 
      }}
    >
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            minWidth: "250px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>{review.name}</h3>
          <p>
            <strong>Visit Type:</strong> {review.visit_type}
          </p>
          <p>
            <strong>Test Date:</strong>{" "}
            {new Date(review.test_date).toLocaleDateString()}
          </p>
          <p>
            <strong>DMV Location:</strong> {review.dmv_location}
          </p>
          <p>
            <strong>Satisfaction:</strong> {review.satisfied_count} / 5
          </p>
          <p>
            <strong>Experience:</strong> {review.experience}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

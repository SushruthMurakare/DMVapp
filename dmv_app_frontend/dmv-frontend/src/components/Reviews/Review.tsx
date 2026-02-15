import { useEffect, useState } from "react";
import { fetchReviews, type Review } from "./api";
import ReviewForm from "./ReviewForm";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, []);

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  if (loading) return <div>Loading sections...</div>;

  return (
    <div style={{ padding: "20px" }}>
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

      <div style={{ width: "80%", margin: "40px auto 0 auto" }}>
        <ReviewForm onReviewAdded={handleReviewAdded} />
      </div>
    </div>
  );
};

export default Reviews;

import React, { useState } from "react";
import { fetchReviews, type Review } from "./api";

interface Props {
  onReviewAdded: (newReview: Review) => void;
}

const ReviewForm: React.FC<Props> = ({ onReviewAdded }) => {
  const [name, setName] = useState("");
  const [visitType, setVisitType] = useState("");
  const [testDate, setTestDate] = useState("");
  const [dmvLocation, setDmvLocation] = useState("");
  const [satisfaction, setSatisfaction] = useState("5");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      name,
      visit_type: visitType,
      test_date: new Date(testDate),
      dmv_location: dmvLocation,
      satisfied_count: satisfaction,
      experience,
    };
    await fetch("http://localhost:8000/submit/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    onReviewAdded(newReview as Review);

    // Reset form
    setName("");
    setVisitType("");
    setTestDate("");
    setDmvLocation("");
    setSatisfaction("5");
    setExperience("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "40px", padding: "20px", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h3>Write a Review</h3>

      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
      
      <select value={visitType} onChange={(e) => setVisitType(e.target.value)} required style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}>
        <option value="">Select Visit Type</option>
        <option value="Written Test">Written Test</option>
        <option value="Driving Test">Driving Test</option>
      </select>

      <input type="date" value={testDate} onChange={(e) => setTestDate(e.target.value)} required style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />

      <input type="text" placeholder="DMV Location" value={dmvLocation} onChange={(e) => setDmvLocation(e.target.value)} required style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />

      <select value={satisfaction} onChange={(e) => setSatisfaction(e.target.value)} style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}>
        <option value="1">1 - Poor</option>
        <option value="2">2</option>
        <option value="3">3 - Average</option>
        <option value="4">4</option>
        <option value="5">5 - Excellent</option>
      </select>

      <textarea placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} required style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />

      <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

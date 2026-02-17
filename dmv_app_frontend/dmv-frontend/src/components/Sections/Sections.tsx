import React, { useEffect, useState } from "react";
import { fetchSections } from "./api";
import type { Section } from "./api";
import { useNavigate } from "react-router-dom";


const Sections: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    fetchSections()
      .then((data) => setSections(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading sections...</div>;

  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px,  max-content))",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() => navigate(`/sections/${section.id}`)}
          style={{
            border: "1px solid #00000",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "#ffffff",
          }}
        >
          {section.title}
        </div>
      ))}
    </div>
  );
};

export default Sections;

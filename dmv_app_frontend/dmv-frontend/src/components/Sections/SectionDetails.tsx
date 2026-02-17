import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Section {
  id: number;
  title: string;
  summary: string | null;
}

const SectionDetails: React.FC = () => {
  const { id } = useParams();
  const [section, setSection] = useState<Section | null>(null);
  const [sectionTitle, setSectionTitle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSection = async () => {
      const res = await fetch(`http://localhost:8000/section/${id}`);
     
      const data = await res.json();
      setSectionTitle(data[0].title)

      if (data[0].summary) {
        setSection(data[0]);
      } else {
        // If no summary → generate it
        const summaryRes = await fetch(
          `http://localhost:8000/sections/${id}/summary`,
          { method: "POST" }
        );

        const updatedSection = await summaryRes.json();
        setSection(updatedSection);
      }

      setLoading(false);
    };

    loadSection();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2>{sectionTitle}</h2>
      <p>{section?.summary}</p>
    </div>
  );
};

export default SectionDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Section {
  id: number;
  title: string;
  summary: string | null;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SectionDetails: React.FC = () => {
  const { id } = useParams();
  const [section, setSection] = useState<Section | null>(null);
  const [sectionTitle, setSectionTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const loadSection = async () => {
      const res = await fetch(`http://localhost:8000/section/${id}`);
      const data = await res.json();

      setSectionTitle(data[0].title);

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

  const loadSectionById = async (sectionId: number) => {
  setLoading(true);
  const res = await fetch(`http://localhost:8000/section/${sectionId}`);
  const data = await res.json();
  setSection(data[0]);
  setSectionTitle(data[0].title);
  setLoading(false);
};

  const handlePrevSection = () => {
  if (!section) return;
  const prevId = section.id - 1; // Or use your actual section order
  // Load previous section by id
  loadSectionById(prevId);
};

const handleNextSection = () => {
  if (!section) return;
  const nextId = section.id + 1; // Or use your actual section order
  loadSectionById(nextId);
};


  // Handle sending a chat message
  const sendMessage = async () => {
    if (!chatInput.trim() || !section) return;

    // Add user message to chat
    const newMessage: ChatMessage = { role: "user", content: chatInput };
    setChatHistory([...chatHistory, newMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chatresponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section_id: section.id,
          prompt: chatInput,
        }),
      });

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
     <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  }}
>

  <button
    style={{
      fontSize: "24px",
      border: "none",
      background: "none",
      cursor: "pointer",
    }}
    onClick={() => handlePrevSection()}
  >
    ◀
  </button>


  <div style={{ flex: 1 }}>
    <h2>{sectionTitle}</h2>
    <p>{section?.summary}</p>
  </div>


  <button
    style={{
      fontSize: "24px",
      border: "none",
      background: "none",
      cursor: "pointer",
    }}
    onClick={() => handleNextSection()}
  >
    ▶
  </button>
</div>



      <div style={{ marginTop: "40px" }}>
        <h3>What did not understand about this section</h3>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            minHeight: "200px",
            maxHeight: "400px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          {chatHistory.length === 0 && <p>Ask anything about this section...</p>}
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                margin: "5px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: msg.role === "user" ? "#daf1ff" : "#f1f0f0",
                  padding: "6px 10px",
                  borderRadius: "12px",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {chatLoading && <p>Assistant is typing...</p>}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your question here..."
            style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
            disabled={chatLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionDetails;

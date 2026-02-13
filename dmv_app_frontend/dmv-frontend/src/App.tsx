import Nav from "./components/Nav";
import { colors, fonts } from "./styles/theme";
import ColoradoImg from "./assets/Colorado.jpg";
import Sections from "./components/Sections/Sections";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Reviews from "./components/Reviews/Review";


const appContainer: React.CSSProperties = {
  minHeight: "100vh",
  backgroundColor: colors.background,
  fontFamily: fonts.body,
};

const headerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
};

function App() {
  return (
    <Router>
      <div style={appContainer}>
        <header style={headerStyle}>
          <img
            src={ColoradoImg}
            alt="Colorado"
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "flex-start",
              margin: "5px",
            }}
          />
          <Nav />
        </header>
        <main>
          <Routes>
          <Route path="/" element={<Navigate to="/sections" />} /> 
          <Route path="/sections" element={<Sections />} />
          <Route path="/reviews" element={<Reviews />} />

        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

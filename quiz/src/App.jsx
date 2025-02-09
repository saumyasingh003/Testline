import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Answers from "./components/Answers";

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "18px", // Increase font size
            padding: "16px", // Increase padding
            maxWidth: "500px", // Increase width
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/answers" element={<Answers />} />
      </Routes>
    </Router>
  );
}

export default App;

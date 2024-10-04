// import Getdata from "./getData";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Data from "./Data";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Data />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

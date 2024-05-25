import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Create from "./components/Create";
function App() {
  return (
      <BrowserRouter className="text-3xl font-bold underline">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Create />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

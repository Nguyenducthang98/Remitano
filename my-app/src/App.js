import "./App.css";
import Header from "./Header";
import Body from "./Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route exact path="/" element={<Body />} />
            <Route path="/share" element={<div />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

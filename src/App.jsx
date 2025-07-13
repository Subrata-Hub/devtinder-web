import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/connections" element={<div>Connection Page</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./components/LandingLayout";
import NewHome from "./pages/Landing/NewHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<NewHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

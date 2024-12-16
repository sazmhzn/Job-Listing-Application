import { BrowserRouter, Route, Routes } from "react-router-dom";

import Applied from "./pages/Landing/Applied";

import PageNotFound from "./pages/shared/PageNotFound";
import NewHome from "./pages/Landing/NewHome";
import Jobs from "./pages/Landing/Jobs";
import JobDetail from "./pages/Landing/JobDetail";
import { FavoritesProvider } from "./context/FavoritesContext";
import Landing from "./components/LandingLayout";
function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<NewHome />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="/job-details/:id" element={<JobDetail />} />
            <Route path="/applied" element={<Applied />} />
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;

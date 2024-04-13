import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import EmptyData from "./components/Empty-data";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <EmptyData
            title="404 - Page not found"
            text="Sorry, the page you are looking for does not exist."
            redirectUrl="/"
            textButton="Back to home"
          />
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/details/:symbol/:exchange" element={<Details />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;

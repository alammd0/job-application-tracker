import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./page/Home";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/main/Navbar";

function App() {
  return (
    <div className="bg-[#14181B] min-h-screen text-white overflow-x-hidden">
      <NavBar />

      <main className="px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

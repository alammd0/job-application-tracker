import "react-toastify/dist/ReactToastify.css";
import { IntroductionPage } from "./page/Introduction";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/main/Navbar";
import { SignupPage } from "./page/Signup";
import { LoginPage } from "./page/Login";
import DashboardLayout from "./page/DashboardLayout";
import { CreateJob } from "./page/CreateJob";
import { ViewJobs } from "./page/ViewJob";
import { Profile } from "./page/Profile";
import { HomPage } from "./page/Home";
import { JobDetails } from "./page/JobDetails";

function App() {
  return (
    <div className="bg-[#14181B] min-h-screen text-white overflow-x-hidden">
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<IntroductionPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element = {<HomPage /> } />
          <Route path="/home/job-details/:id" element = {<JobDetails />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="create-job" element={< CreateJob />} />
            <Route path="view-jobs" element={<ViewJobs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

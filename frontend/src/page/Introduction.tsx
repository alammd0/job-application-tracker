import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const IntroductionPage = () => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <div className="w-9/12 mx-auto pt-5 md:pb-5  pb-10 mb-8 relative">
      <div className="flex flex-col gap-10">
        <div className="bg-[#272727] px-5 py-7 text-white flex flex-col gap-4 rounded-md shadow-md shadow-gray-800">
          <h2 className=" text-xl font-semibold font-mono">
            {" "}
            <b>Project Notes:</b> Job Application Tracker (Mini CRM)
          </h2>

          <div className="text-[16px] font-normal">
             <b> Project Description </b> <br /> <br /> Job Application Tracker is a web-based
            application designed to streamline and simplify the job search
            process for candidates. It gives users a centralized platform to
            track their job applications, manage statuses, and stay organized
            throughout their job-hunting journey.
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <p className="text-xl font-semibold font-mono">
            {" "}
            Tech Stack: (Used to Build Project)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#272727] px-5 py-7 text-white rounded-md">
            {/* Frontend Tech Stack */}
            <div>
              <p className="text-lg font-semibold mb-2 underline">
                Frontend Tech Stack:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>React.js (with TypeScript)</li>
                <li>Redux Toolkit (State management)</li>
                <li>React Router DOM (Routing)</li>
                <li>React Toastify (Notifications)</li>
                <li>Tailwind CSS or custom CSS for styling</li>
                <li>Axios for API requests</li>
                <li>React Icons</li>
              </ul>
            </div>

            {/* Backend Tech Stack */}
            <div>
              <p className="text-lg font-semibold mb-2 underline">
                Backend Tech Stack:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Node.js with Express.js</li>
                <li>Javascript</li>
                <li>JWT for Authentication</li>
                <li>Zod for Validation</li>
                <li>Nodemailer (for sending emails)</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#272727] px-5 py-7 text-white rounded-md">
            <div>
              <p className="text-lg font-semibold mb-2 underline">Database: </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  PostgreSQL via Prisma ORM <br />
                  (MongoDB is also optional but you are currently using Prisma,
                  which works best with PostgreSQL.)
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-semibold mb-2 underline">
                Project Deployment:{" "}
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Render for Backend</li>
                <li>Vercel for frontend</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-[#272727] px-3 py-4 w-fit rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold">
            <Link to="https://github.com/alammd0/job-application-tracker">
              Project Github Repositories
            </Link>
          </button>

          {token && (
            <button className="bg-[#272727] px-3 py-4 w-fit rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold">
              <Link to="/home">Go to Home</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

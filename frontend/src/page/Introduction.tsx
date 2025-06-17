import { Link } from "react-router-dom";

export const IntroductionPage = () => {
  return (
    <div className="w-9/12 mx-auto pt-5 pb-5 relative">
      <div className="flex flex-col gap-10">
        <div className="bg-[#272727] px-5 py-7 text-white flex flex-col gap-4 rounded-md shadow-md shadow-gray-800">
          <h2 className=" text-xl font-semibold font-mono">
            {" "}
            <b>Project Notes:</b> Job Application Tracker (Mini CRM)
          </h2>

          <div className="text-[16px] font-normal">
            <b>Objective:</b> <br /> Build a full-stack Job Application Tracker
            that allows users to manage and track their job applications,
            statuses, and notes with real-time notifications and role-based
            access.
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <p className="text-xl font-semibold font-mono"> Tech Stack: (Used to Build Project)</p>

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
              <p className="text-lg font-semibold mb-2 underline">Project Deployment: </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Render for Backend</li>
                <li>Vercel for frontend</li>
              </ul>
            </div>
          </div>
        </div>

        <button className="bg-[#272727] px-3 py-4 w-fit rounded-xl hover:scale-105 transition-all duration-200 text-[16px] font-semibold">
            <Link to="https://github.com/alammd0/job-application-tracker">Project Github Repositories</Link>
        </button>
      </div>
    </div>
  );
};

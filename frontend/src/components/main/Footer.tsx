import { Link } from "react-router-dom";

export const explorePage = [
  {
    id: 1,
    title: "Home",
    link: "/home",
  },
  {
    id: 2,
    title: "Add Job",
    link: "/dashboard/create-job",
  },
  {
    id: 3,
    title: "View Job",
    link: "/dashboard/view-jobs",
  },
  {
    id: 4,
    title: "Profile",
    link: "/dashboard/profile",
  },
];

export const exploreMySocialMedia = [
  {
    id: 1,
    title: "GitHub",
    link: "https://github.com/alammd0",
  },
  {
    id: 1,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/md-khalid-alam-3307b4219/",
  },
  {
    id: 1,
    title: "Instagram",
    link: "https://www.instagram.com/alam_md01?igsh=MTNlcTMwb3UxMzJwZA==",
  },
  {
    id: 1,
    title: "Portfolio",
    link: "https://alam-port.vercel.app/",
  },
];

export const FooterPage = () => {
  return (
    <div className="bg-[#272727] mt-14 w-full">
      <div className="w-8/12 mx-auto py-8">
        <p className="text-center text-white font-mono mb-4">
          ** Created By - Md Khalid Alam - 2025 **
        </p>

        <div className="flex justify-between text-white text-sm">
          <div className="flex md:flex-row flex-col gap-5">
            {explorePage.map((page) => (
              <div key={page.id}>
                <Link className="hover:underline" to={page.link}>
                  {page.title}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex  md:flex-row flex-col gap-5">
            {exploreMySocialMedia.map((account) => (
              <div key={account.title}>
                <Link className="hover:underline" to={account.link}>
                  {account.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

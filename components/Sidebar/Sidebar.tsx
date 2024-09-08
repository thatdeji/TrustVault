"use client";
import { Logo } from "@/svg/logo";
import { bottomNav, topNav } from "./Sidebar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="">
      <aside className="max-w-[286px] fixed lg:flex-shrink-0 lg:static top-0 left-0 overflow-y-auto h-screen w-full bg-[#F6F6F7] border border-[rgba(23,_24,_24,_0.05)] flex flex-col">
        <div className="flex items-center justify-center w-[181px] h-[28px] mb-20 mt-12 mx-auto">
          <Logo />
        </div>
        <ul className="list-none flex flex-col w-full gap-2 mb-16">
          {topNav.map((item) => (
            <li key={item.title}>
              <Link
                className={`flex items-center gap-3 w-full px-10 py-4 cursor-pointer ${
                  item.link.includes(pathname)
                    ? "bg-[#F3F0EC] border-l-4 border-l-[#5F4E3C]"
                    : ""
                }`}
                href={item.link}
              >
                <div className="w-6 h-6">{item.icon}</div>
                <span
                  className={`inline-block text-lg font-bold  ${
                    item.link.includes(pathname)
                      ? "text-[#5F4E3C]"
                      : "text-[rgba(31,_31,_31,_0.87)]"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-7">
          <div className="w-full h-[2px] bg-[#D9D9D9]" />
        </div>
        <ul className="list-none flex flex-col w-full gap-2 mt-16">
          {bottomNav.map((item) => (
            <li key={item.title}>
              <Link
                className={`flex items-center gap-3 w-full px-10 py-4 cursor-pointer ${
                  item.link.includes(pathname)
                    ? "bg-[#F3F0EC] border-l borderl-[#5F4E3C]"
                    : ""
                }`}
                href={item.link}
              >
                <div className="w-6 h-6">{item.icon}</div>
                <span
                  className={`inline-block text-lg font-bold  ${
                    item.link.includes(pathname)
                      ? "text-[#5F4E3C]"
                      : "text-[rgba(31,_31,_31,_0.87)]"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;

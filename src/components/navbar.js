"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Applications", href: "/applications" },
  { name: "Resources", href: "/resources" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <svg viewBox="0 0 637.38 316.17" width="96" height="64">
                <g>
                  <polygon points="617.07 226.46 620.37 226.46 620.37 235.29 621.86 235.29 621.86 226.46 625.15 226.46 625.15 225.11 617.07 225.11 617.07 226.46"></polygon>
                  <polygon points="628.83 235.29 628.83 226.09 628.9 226.09 631.7 235.29 632.91 235.29 635.79 226.09 635.85 226.09 635.85 235.29 637.35 235.29 637.35 225.11 634.66 225.11 632.42 232.67 632.35 232.67 629.94 225.11 627.33 225.11 627.33 235.29 628.83 235.29"></polygon>
                  <path d="M422.66,164.28c-11.55,0-16.36,34.64-16.36,40.42,0,5.14,1.77,7.54,6.25,7.54,11.56,0,16.37-34.81,16.37-40.42S426.84,164.28,422.66,164.28Z"></path>
                  <path d="M0,111.88,36.6,316.17l600.78-106.3V0ZM106.51,229.72H39.46L63.2,117.91h65l-7.06,23.58H86.94l-4,18.77h27.92L106,183H78.12l-4.81,22.79h38.34Zm29.68,2.09c-23.58,0-21.5-12.18-18-28.71l12-56.47c4.16-19.25,4.49-25.34,4.33-30l29-4.81c.32,4-.64,12.51-2.4,20.69L148.07,194c-3.06,14.6-3.38,18.46,2.88,18.46a10.85,10.85,0,0,0,3-.49l.81,17.33C150.79,230.69,143.89,231.81,136.19,231.81Zm71.91,1.13c-3.37-1.77-5.77-6.74-6.25-9.79-3.7,3.85-11.88,9.15-21.5,9.15-16.85,0-23.91-10.6-23.91-28.24s7.06-35.93,17.81-46.68c9.47-9.47,19.58-12.52,34.17-12.52,11.39,0,25.51,1.93,31.6,5-2.4,5.77-4.81,15.71-6.25,22.62l-6.25,29.84c-.65,2.72-.49,8.5,3.2,12.51ZM276,229.72l11.23-52.93c1.44-6.42.64-9.31-4-9.31-4.49,0-8,2.25-11.55,7.71l-11.71,54.53H232l11.07-52.13c2.57-12.51,3.53-19.89,2.25-28.08l24.7-4.65a47.23,47.23,0,0,1,1.45,9c6.41-5.6,16-9,25.18-9,20.69,0,22.79,11.72,20.22,23.75l-13,61.11Zm68.66,2.09c-23.1,0-34.33-14.76-28.39-42.67,5.93-28.08,22.94-44.28,47.32-44.28,11.87,0,18.29,3,25,9.79l-16.37,16.84c-2.4-3.36-6.58-6.09-10.42-6.09-6.42,0-11.23,5.13-14.76,22s-3.21,23.74,4.81,23.74c6.25,0,12-3.05,16.69-7.38l8.34,16.36A49.84,49.84,0,0,1,344.62,231.81Zm63.12,0c-19.57,0-30.64-10.75-30.64-29.84,0-21.33,11.56-57.1,50.7-57.1,17.32,0,30.64,8.5,30.64,29.35C458.44,195.88,446.41,231.81,407.74,231.81Z"></path>
                  <path d="M194,170.06c-5.93,6.89-9.46,23.09-9.46,33.36,0,5.61,1.6,8,5.45,8,3.37,0,9.15-5.77,9.79-8.49l7.7-36.26a5.68,5.68,0,0,0-3.37-1.13A11.77,11.77,0,0,0,194,170.06Z"></path>
                </g>
              </svg>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "border-slate-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
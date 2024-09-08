import { Community, Deals, Ecosystem, Home, Settler } from "@/svg/sidebarIcons";

export const topNav = [
  {
    title: "Home",
    icon: <Home />,
    link: "/dashboard",
  },
  {
    title: "Deals",
    icon: <Deals />,
    link: "/deals",
  },
  {
    title: "Settler",
    icon: <Settler />,
    link: "/settlers",
  },
];

export const bottomNav = [
  {
    title: "Ecosystem",
    icon: <Ecosystem />,
    link: "/ecosystem",
  },
  {
    title: "Community",
    icon: <Community />,
    link: "/community",
  },
];

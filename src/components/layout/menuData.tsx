import Image from 'next/image';
import { Icons } from '../ui/images/Icons';

export interface Item {
  icon?: JSX.Element | string;
  activeIcon?: JSX.Element | string;
  label: string;
  link: string;
  defLink?: string;
}

export interface Menu extends Item {
  children: Item[];
}

export const menuList: Menu[] = [
  {
    icon: <Image src="/images/dashboard-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/dashboard-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Dashboard',
    link: '/dashboard',
    defLink: '/dashboard',
    children: [],
  },
  {
    icon: <Image src="/images/job-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/job-sidebar-icon.svg" width={20} height={20} alt="active_latest_bets" />
    ),
    label: 'Jobs',
    link: '/jobs/list',
    defLink: '/jobs/list',
    children: [
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: 'Job List',
        link: '/jobs/list',
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: 'Hiring List',
        link: '/jobs/hiring-list',
      },
    ],
  },
  {
    icon: (
      <Image src="/images/paper-work-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    activeIcon: (
      <Image src="/images/paper-work-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Paper Work',
    link: '/paper-work',
    defLink: '/paper-work',
    children: [],
  },
  {
    icon: <Image src="/images/employee-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/employee-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Employee',
    link: '/employee',
    defLink: '/employee',
    children: [],
  },
  {
    icon: <Image src="/images/student-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/student-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Student',
    link: '/student',
    defLink: '/student',
    children: [],
  },
  {
    icon: <Image src="/images/agent-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/agent-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Agent',
    link: '/agent',
    defLink: '/agent',
    children: [],
  },
  {
    icon: <Image src="/images/business-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image
        src="/images/business-sidebar-icon.svg"
        width={20}
        height={20}
        alt="active_latest_bets"
      />
    ),
    label: 'Owner and Business',
    link: '/owners/list',
    defLink: '/owners/list',
    children: [
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: 'owners',
        link: '/owners/list',
      },
      {
        icon: <Icons.snippetsOutlined className="w-6 h-6" />,
        label: 'Business',
        link: '/owners/business',
      },
    ],
  },
  {
    icon: <Image src="/images/interview-sidebar-icon.svg" width={20} height={20} alt="dashboard" />,
    activeIcon: (
      <Image src="/images/interview-sidebar-icon.svg" width={20} height={20} alt="dashboard" />
    ),
    label: 'Interview',
    link: '/interview',
    defLink: '/interview',
    children: [],
  },
  {
    icon: <Image src="/images/inbox-sidebar-icon.svg" width={20} height={20} alt="inbox" />,
    activeIcon: <Image src="/images/inbox-sidebar-icon.svg" width={20} height={20} alt="inbox" />,
    label: 'Inbox',
    link: '/inbox',
    defLink: '/inbox',
    children: [],
  },
  {
    icon: <Image src="/images/connect-sidebar-icon.svg" width={20} height={20} alt="connect" />,
    activeIcon: (
      <Image src="/images/connect-sidebar-icon.svg" width={20} height={20} alt="connect" />
    ),
    label: 'Connect',
    link: '/connects',
    defLink: '/connects',
    children: [],
  },
  {
    icon: <Image src="/images/setting-sidebar-icon.svg" width={20} height={20} alt="setting" />,
    activeIcon: (
      <Image src="/images/setting-sidebar-icon.svg" width={20} height={20} alt="setting" />
    ),
    label: 'Setting',
    link: '/setting',
    defLink: '/setting',
    children: [],
  },

  // {
  //   icon: <Icons.profile className="w-6 h-6" />,
  //   activeIcon: (
  //     <Image
  //       src="/uploads/icons/active-dashboard.svg"
  //       width={20}
  //       height={20}
  //       alt="dashboard"
  //     />
  //   ),
  //   label: "Profile",
  //   link: "/profile",
  //   defLink: "/",
  //   children: []
  // },
  // {
  //   icon: <Icons.snippets className="w-6 h-6" />,
  //   activeIcon: (
  //     <Image
  //       src="/uploads/icons/active_latest_bets.svg"
  //       width={20}
  //       height={20}
  //       alt="active_latest_bets"
  //     />
  //   ),
  //   label: "Snippets",
  //   link: "",
  //   children: [
  //     {
  //       icon: <Icons.snippetsOutlined className="w-6 h-6" />,
  //       label: "Buttons",
  //       link: "/snippets/buttons"
  //     },
  //     {
  //       icon: <Icons.snippetsOutlined className="w-6 h-6" />,
  //       label: "Typography",
  //       link: "/snippets/typo"
  //     },
  //     {
  //       icon: <Icons.snippetsOutlined className="w-6 h-6" />,
  //       label: "Inputs",
  //       link: "/snippets/inputs"
  //     },
  //     {
  //       icon: <Icons.snippetsOutlined className="w-6 h-6" />,
  //       label: "Form",
  //       link: "/snippets/form"
  //     },
  //     {
  //       icon: <Icons.snippetsOutlined className="w-6 h-6" />,
  //       label: "Tables",
  //       link: "/snippets/table"
  //     }
  //   ]
  // }
];

export interface AppBarMenuList {
  icon: JSX.Element | string;
  label: string;
  link: string | null;
}
export const appBarMenuList: AppBarMenuList[] = [
  {
    icon: <Icons.profile className="w-4 h-4" />,
    label: 'Profile',
    link: '/profile',
  },
  {
    icon: <Icons.logout className="w-4 h-4" />,
    label: 'Logout',
    link: null,
  },
];

import {
  Calculator,
  FileText,
  Handshake,
  Layers3,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Package,
  User,
  Users,
  Wallet,
} from "lucide-react-native";

export const drawerMenus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/(root)/(drawer)/(tabs)/dashboard",
    path: "/dashboard",
  },
  {
    title: "Orders",
    icon: Package,
    href: "/(root)/(drawer)/(tabs)/order",
    path: "/order",
  },
  {
    title: "Multibox",
    icon: LayoutGrid,
    href: "/(root)/(drawer)/(tabs)/multibox",
    path: "/multibox",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/(root)/(drawer)/(tabs)/customers",
    path: "/customers",
  },
  {
    title: "Rate Calculator",
    icon: Calculator,
    href: "/rate-calculator",
    path: "",
  },
  {
    title: "Wallet",
    icon: Wallet,
    href: "/wallet",
    path: "",
  },
  {
    title: "Bulk Report",
    icon: Layers3,
    href: "/bulk-report",
    path: "/",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
    path: "/",
  },
  {
    title: "Agreement Center",
    icon: Handshake,
    href: "/agreement-center",
    path: "/",
  },
];

export const settingsMenus = [
  {
    title: "Profile",
    icon: User,
    href: "/(root)/(subPages)/profile",
    path: "/",
  },
  {
    title: "Password",
    icon: Lock,
    href: "/(root)/(drawer)/settings",
    path: "/",
  },
];

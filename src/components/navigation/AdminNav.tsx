
import { useLocation, Link } from "react-router-dom";
import { 
  BarChart, 
  Home, 
  MessageSquare, 
  Settings, 
  User, 
  Users,
  BookOpen,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/admin-dashboard",
      icon: Home,
    },
    {
      title: "Users",
      href: "/admin-users",
      icon: Users,
    },
    {
      title: "Courses",
      href: "/admin-courses",
      icon: BookOpen,
    },
    {
      title: "Departments",
      href: "/admin-departments",
      icon: Building,
    },
    {
      title: "Analytics",
      href: "/admin-analytics",
      icon: BarChart,
    },
    {
      title: "Messages",
      href: "/admin-messages",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/admin-settings",
      icon: Settings,
    },
    {
      title: "Profile",
      href: "/admin-profile",
      icon: User,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "nav-link",
            location.pathname === item.href && "active"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}

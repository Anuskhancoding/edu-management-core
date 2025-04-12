
import { useLocation, Link } from "react-router-dom";
import { Book, Calendar, Home, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function StudentNav() {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/student-dashboard",
      icon: Home,
    },
    {
      title: "Courses",
      href: "/student-courses",
      icon: Book,
    },
    {
      title: "Schedule",
      href: "/student-schedule",
      icon: Calendar,
    },
    {
      title: "Messages",
      href: "/student-messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/student-profile",
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

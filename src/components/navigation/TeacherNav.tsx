
import { useLocation, Link } from "react-router-dom";
import { Book, Calendar, FileText, Home, MessageSquare, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function TeacherNav() {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/teacher-dashboard",
      icon: Home,
    },
    {
      title: "My Classes",
      href: "/teacher-classes",
      icon: Book,
    },
    {
      title: "Students",
      href: "/teacher-students",
      icon: Users,
    },
    {
      title: "Assignments",
      href: "/teacher-assignments",
      icon: FileText,
    },
    {
      title: "Schedule",
      href: "/teacher-schedule",
      icon: Calendar,
    },
    {
      title: "Messages",
      href: "/teacher-messages",
      icon: MessageSquare,
    },
    {
      title: "Profile",
      href: "/teacher-profile",
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

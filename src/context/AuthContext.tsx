
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { addUser, findUser, UserRecord } from "@/utils/csvStorage";
import { toast } from "sonner";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  exportUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: string) => {
    // Simulate API call for realistic UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Find user in CSV storage
      const foundUser = findUser(email, password);
      
      if (!foundUser) {
        throw new Error("Invalid credentials or user not found");
      }
      
      // Check if role matches
      if (foundUser.role !== role) {
        throw new Error(`Account exists but not as a ${role}. Please select the correct role.`);
      }
      
      // Convert to AuthUser format
      const authUser: AuthUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      setUser(authUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(authUser));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Add user to CSV storage
      addUser({
        name,
        email,
        password, // In a real app, this should be hashed
        role: role as "student" | "teacher" | "admin"
      });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };
  
  const exportUserData = () => {
    try {
      // Create a downloadable CSV file
      const csvData = localStorage.getItem("users_csv_string") || "No users found";
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("User data exported successfully");
    } catch (error) {
      toast.error("Failed to export user data");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        exportUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

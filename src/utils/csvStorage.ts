
// A simple utility to manage user data in CSV format

// Define the type for a user record
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string; // Note: In a real app, this should be hashed
  role: "student" | "teacher" | "admin";
  createdAt: string;
}

// Initialize user storage
let users: UserRecord[] = [];

// Function to load users from local storage (simulating CSV file)
const loadUsers = (): UserRecord[] => {
  const storedUsers = localStorage.getItem("users_csv");
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  return [];
};

// Initialize users when module loads
users = loadUsers();

// Save users to local storage (simulating CSV file)
const saveUsers = () => {
  localStorage.setItem("users_csv", JSON.stringify(users));
  
  // Also generate a CSV string for download capability
  const csvHeader = "id,name,email,password,role,createdAt\n";
  const csvContent = users.map(user => 
    `${user.id},${user.name},${user.email},${user.password},${user.role},${user.createdAt}`
  ).join("\n");
  
  localStorage.setItem("users_csv_string", csvHeader + csvContent);
};

// Add a new user
export const addUser = (user: Omit<UserRecord, "id" | "createdAt">): UserRecord => {
  // Check if user already exists
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  
  // Create new user with ID and timestamp
  const newUser: UserRecord = {
    ...user,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers();
  return newUser;
};

// Find user by email and password
export const findUser = (email: string, password: string): UserRecord | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

// Function to export users as CSV for download
export const getUsersCsv = (): string => {
  return localStorage.getItem("users_csv_string") || "No users found";
};

// Get all users (for admin panel)
export const getAllUsers = (): UserRecord[] => {
  return [...users];
};

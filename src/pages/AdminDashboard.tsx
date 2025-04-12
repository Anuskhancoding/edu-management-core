
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminNav } from "@/components/navigation/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart as BarChartIcon, 
  BookOpen, 
  Building, 
  PlusCircle, 
  Users 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface Course {
  id: string;
  name: string;
  department: string;
  students: number;
  teacher: string;
}

interface Department {
  id: string;
  name: string;
  head: string;
  courses: number;
  faculty: number;
  students: number;
}

interface StatData {
  name: string;
  students: number;
  courses: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [statData, setStatData] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // In a real app, these would be API calls
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers([
        { id: '1', name: 'John Smith', email: 'john.smith@example.com', role: 'Teacher', status: 'Active', joinDate: '2024-01-15' },
        { id: '2', name: 'Emily Johnson', email: 'emily.j@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-10' },
        { id: '3', name: 'Michael Wilson', email: 'michael.w@example.com', role: 'Student', status: 'Active', joinDate: '2024-02-05' },
        { id: '4', name: 'Sarah Davis', email: 'sarah.d@example.com', role: 'Teacher', status: 'Active', joinDate: '2024-01-20' },
        { id: '5', name: 'David Thompson', email: 'david.t@example.com', role: 'Admin', status: 'Active', joinDate: '2023-11-15' },
      ]);
      
      setCourses([
        { id: '1', name: 'Introduction to Computer Science', department: 'Computer Science', students: 35, teacher: 'Dr. Smith' },
        { id: '2', name: 'Calculus I', department: 'Mathematics', students: 42, teacher: 'Prof. Johnson' },
        { id: '3', name: 'English Composition', department: 'English', students: 38, teacher: 'Dr. Williams' },
        { id: '4', name: 'Physics 101', department: 'Physics', students: 30, teacher: 'Prof. Brown' },
      ]);
      
      setDepartments([
        { id: '1', name: 'Computer Science', head: 'Dr. Alan Turing', courses: 12, faculty: 8, students: 180 },
        { id: '2', name: 'Mathematics', head: 'Dr. Katherine Johnson', courses: 15, faculty: 10, students: 220 },
        { id: '3', name: 'English', head: 'Dr. James Patterson', courses: 10, faculty: 7, students: 150 },
        { id: '4', name: 'Physics', head: 'Dr. Marie Curie', courses: 8, faculty: 6, students: 120 },
      ]);
      
      setStatData([
        { name: 'Computer Science', students: 180, courses: 12 },
        { name: 'Mathematics', students: 220, courses: 15 },
        { name: 'English', students: 150, courses: 10 },
        { name: 'Physics', students: 120, courses: 8 },
      ]);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <div className="bg-white rounded-lg shadow p-4">
          <AdminNav />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <DashboardLayout title="Admin Dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">
                  Students, teachers & admins
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Departments
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{departments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Academic departments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Student Enrollment
                </CardTitle>
                <BarChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {departments.reduce((acc, dept) => acc + dept.students, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total enrolled students
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={statData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#3b82f6" name="Students" />
                      <Bar dataKey="courses" fill="#10b981" name="Courses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="mt-6">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-4">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Name</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Email</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Role</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Status</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Join Date</th>
                          <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{user.name}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{user.email}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{user.role}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">
                              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                {user.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">
                              {new Date(user.joinDate).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                              <a href="#" className="text-primary hover:underline mr-3">
                                Edit
                              </a>
                              <a href="#" className="text-destructive hover:underline">
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="courses" className="mt-4">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Course Management</CardTitle>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Course
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Course Name</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Department</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Students</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Teacher</th>
                          <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {courses.map((course) => (
                          <tr key={course.id}>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{course.name}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{course.department}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{course.students}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{course.teacher}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                              <a href="#" className="text-primary hover:underline mr-3">
                                Edit
                              </a>
                              <a href="#" className="text-destructive hover:underline">
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="departments" className="mt-4">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Department Management</CardTitle>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Department
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Department Name</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Head</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Courses</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Faculty</th>
                          <th className="px-4 py-3.5 text-left text-sm font-semibold">Students</th>
                          <th className="px-4 py-3.5 text-right text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {departments.map((dept) => (
                          <tr key={dept.id}>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{dept.name}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{dept.head}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{dept.courses}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{dept.faculty}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm">{dept.students}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                              <a href="#" className="text-primary hover:underline mr-3">
                                Edit
                              </a>
                              <a href="#" className="text-destructive hover:underline">
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DashboardLayout>
      </div>
    </div>
  );
}

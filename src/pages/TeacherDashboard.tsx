
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TeacherNav } from "@/components/navigation/TeacherNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Book, FileText, Users, MessagesSquare } from "lucide-react";

interface Class {
  id: string;
  name: string;
  students: number;
  time: string;
  day: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  performanceScore: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissionsReceived: number;
  totalStudents: number;
}

export default function TeacherDashboard() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // In a real app, these would be API calls
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClasses([
        { id: '1', name: 'Introduction to Computer Science', students: 35, time: '10:00 AM', day: 'Mon/Wed' },
        { id: '2', name: 'Advanced Programming', students: 28, time: '2:00 PM', day: 'Tue/Thu' },
        { id: '3', name: 'Data Structures', students: 32, time: '11:00 AM', day: 'Mon/Wed/Fri' },
      ]);
      
      setStudents([
        { id: '1', name: 'John Smith', email: 'john.smith@example.com', performanceScore: 92 },
        { id: '2', name: 'Emily Johnson', email: 'emily.j@example.com', performanceScore: 88 },
        { id: '3', name: 'Michael Wilson', email: 'michael.w@example.com', performanceScore: 76 },
        { id: '4', name: 'Sarah Davis', email: 'sarah.d@example.com', performanceScore: 95 },
        { id: '5', name: 'David Thompson', email: 'david.t@example.com', performanceScore: 68 },
      ]);
      
      setAssignments([
        { id: '1', title: 'Programming Assignment 3', course: 'Introduction to Computer Science', dueDate: '2025-04-15', submissionsReceived: 28, totalStudents: 35 },
        { id: '2', title: 'Database Design Project', course: 'Advanced Programming', dueDate: '2025-04-18', submissionsReceived: 20, totalStudents: 28 },
        { id: '3', title: 'Algorithm Analysis', course: 'Data Structures', dueDate: '2025-04-20', submissionsReceived: 15, totalStudents: 32 },
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
          <TeacherNav />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <DashboardLayout title="Teacher Dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Classes
                </CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{classes.length}</div>
                <p className="text-xs text-muted-foreground">
                  This semester
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {classes.reduce((acc, cls) => acc + cls.students, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all classes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Assignments
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Pending submissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Messages
                </CardTitle>
                <MessagesSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Unread messages
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="classes" className="mt-6">
            <TabsList>
              <TabsTrigger value="classes">My Classes</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="classes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classes.map(cls => (
                      <div key={cls.id} className="border rounded-md p-4">
                        <div className="font-medium">{cls.name}</div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Students</p>
                            <p>{cls.students}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p>{cls.time}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Days</p>
                            <p>{cls.day}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <a href="#" className="text-primary text-sm hover:underline">
                            View Class
                          </a>
                          <span className="text-muted-foreground">|</span>
                          <a href="#" className="text-primary text-sm hover:underline">
                            Attendance
                          </a>
                          <span className="text-muted-foreground">|</span>
                          <a href="#" className="text-primary text-sm hover:underline">
                            Grade Book
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {students.map(student => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary text-white">
                              {student.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-40">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Performance</span>
                              <span className="text-sm font-medium">{student.performanceScore}%</span>
                            </div>
                            <Progress value={student.performanceScore} className="h-2" />
                          </div>
                          <a href="#" className="text-primary text-sm hover:underline">
                            Details
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="border rounded-md p-4">
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Course: {assignment.course}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Submissions</span>
                            <span className="text-sm">{assignment.submissionsReceived}/{assignment.totalStudents}</span>
                          </div>
                          <Progress 
                            value={(assignment.submissionsReceived / assignment.totalStudents) * 100} 
                            className="h-2" 
                          />
                        </div>
                        <div className="mt-3 flex gap-2">
                          <a href="#" className="text-primary text-sm hover:underline">
                            View Submissions
                          </a>
                          <span className="text-muted-foreground">|</span>
                          <a href="#" className="text-primary text-sm hover:underline">
                            Edit Assignment
                          </a>
                        </div>
                      </div>
                    ))}
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

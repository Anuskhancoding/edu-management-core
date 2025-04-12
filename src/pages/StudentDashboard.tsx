
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentNav } from "@/components/navigation/StudentNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, BookOpen } from "lucide-react";

interface Course {
  id: string;
  name: string;
  instructor: string;
  progress: number;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    // In a real app, these would be API calls
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCourses([
        { id: '1', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', progress: 75 },
        { id: '2', name: 'Calculus I', instructor: 'Prof. Johnson', progress: 60 },
        { id: '3', name: 'English Composition', instructor: 'Dr. Williams', progress: 90 },
        { id: '4', name: 'Physics 101', instructor: 'Prof. Brown', progress: 40 },
      ]);
      
      setAssignments([
        { id: '1', title: 'Programming Assignment 3', course: 'Introduction to Computer Science', dueDate: '2025-04-15' },
        { id: '2', title: 'Essay on Modern Literature', course: 'English Composition', dueDate: '2025-04-18' },
        { id: '3', title: 'Problem Set 5', course: 'Calculus I', dueDate: '2025-04-20' },
      ]);
      
      setAnnouncements([
        { id: '1', title: 'Campus Closure', content: 'Campus will be closed on Friday for maintenance.', date: '2025-04-10' },
        { id: '2', title: 'Registration Opens Soon', content: 'Summer course registration begins next week.', date: '2025-04-09' },
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
          <StudentNav />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <DashboardLayout title="Student Dashboard">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Courses Enrolled
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Current semester
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Assignments
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Due this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Overall Progress
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Events
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="courses" className="mt-6">
            <TabsList>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {courses.map(course => (
                  <Card key={course.id}>
                    <CardHeader>
                      <CardTitle>{course.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-medium">Progress:</div>
                        <div>{course.progress}%</div>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="mt-4">
                        <a href="#" className="text-primary text-sm hover:underline">
                          View Course
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="border rounded-md p-4">
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-muted-foreground">Course: {assignment.course}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <a href="#" className="text-primary text-sm hover:underline">
                            View Details
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="announcements" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map(announcement => (
                      <div key={announcement.id} className="border rounded-md p-4">
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm mt-1">{announcement.content}</div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Posted: {new Date(announcement.date).toLocaleDateString()}
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

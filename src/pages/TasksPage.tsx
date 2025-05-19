import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Timer,
} from "lucide-react";
import { mockTasks, getClientById, getUserById } from "../data/mockData";
import { Avatar } from "@/components/ui/avatar";

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const pendingTasks = mockTasks.filter(task => task.status === 'pending');
  const inProgressTasks = mockTasks.filter(task => task.status === 'in_progress');
  const completedTasks = mockTasks.filter(task => task.status === 'completed');

  const filteredTasks = mockTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all tasks across your firm.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{pendingTasks.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-500" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{inProgressTasks.length}</div>
              <p className="text-xs text-muted-foreground">Currently being worked on</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{completedTasks.length}</div>
              <p className="text-xs text-muted-foreground">Successfully finished</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <Button className="md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add New Task
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left">Task</th>
                        <th className="py-3 px-4 text-left">Client</th>
                        <th className="py-3 px-4 text-left">Due Date</th>
                        <th className="py-3 px-4 text-left">Priority</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Assigned To</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((task) => {
                        const client = getClientById(task.clientId || "");
                        const assignedUser = getUserById(task.assignedTo);
                        
                        return (
                          <tr key={task.id} className="border-b hover:bg-muted/20">
                            <td className="py-3 px-4">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                            </td>
                            <td className="py-3 px-4">{client?.name || "N/A"}</td>
                            <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${task.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'}`}
                              >
                                {task.priority}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                  task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'}`}
                              >
                                {task.status === 'completed' ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : task.status === 'in_progress' ? (
                                  <Timer className="w-3 h-3" />
                                ) : (
                                  <AlertCircle className="w-3 h-3" />
                                )}
                                <span className="capitalize">{task.status.replace('_', ' ')}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <div className="bg-primary text-xs flex items-center justify-center w-full h-full text-primary-foreground">
                                    {assignedUser?.name.substring(0, 2).toUpperCase() || "UN"}
                                  </div>
                                </Avatar>
                                <span>{assignedUser?.name || "Unassigned"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left">Task</th>
                        <th className="py-3 px-4 text-left">Client</th>
                        <th className="py-3 px-4 text-left">Due Date</th>
                        <th className="py-3 px-4 text-left">Priority</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Assigned To</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTasks.filter(task =>
                        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((task) => {
                        const client = getClientById(task.clientId || "");
                        const assignedUser = getUserById(task.assignedTo);
                        
                        return (
                          <tr key={task.id} className="border-b hover:bg-muted/20">
                            <td className="py-3 px-4">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                            </td>
                            <td className="py-3 px-4">{client?.name || "N/A"}</td>
                            <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${task.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'}`}
                              >
                                {task.priority}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <AlertCircle className="w-3 h-3" />
                                <span>Pending</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <div className="bg-primary text-xs flex items-center justify-center w-full h-full text-primary-foreground">
                                    {assignedUser?.name.substring(0, 2).toUpperCase() || "UN"}
                                  </div>
                                </Avatar>
                                <span>{assignedUser?.name || "Unassigned"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="in_progress" className="mt-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left">Task</th>
                        <th className="py-3 px-4 text-left">Client</th>
                        <th className="py-3 px-4 text-left">Due Date</th>
                        <th className="py-3 px-4 text-left">Priority</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Assigned To</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inProgressTasks.filter(task =>
                        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((task) => {
                        const client = getClientById(task.clientId || "");
                        const assignedUser = getUserById(task.assignedTo);
                        
                        return (
                          <tr key={task.id} className="border-b hover:bg-muted/20">
                            <td className="py-3 px-4">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                            </td>
                            <td className="py-3 px-4">{client?.name || "N/A"}</td>
                            <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${task.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'}`}
                              >
                                {task.priority}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Timer className="w-3 h-3" />
                                <span>In progress</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <div className="bg-primary text-xs flex items-center justify-center w-full h-full text-primary-foreground">
                                    {assignedUser?.name.substring(0, 2).toUpperCase() || "UN"}
                                  </div>
                                </Avatar>
                                <span>{assignedUser?.name || "Unassigned"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left">Task</th>
                        <th className="py-3 px-4 text-left">Client</th>
                        <th className="py-3 px-4 text-left">Due Date</th>
                        <th className="py-3 px-4 text-left">Priority</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Assigned To</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedTasks.filter(task =>
                        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((task) => {
                        const client = getClientById(task.clientId || "");
                        const assignedUser = getUserById(task.assignedTo);
                        
                        return (
                          <tr key={task.id} className="border-b hover:bg-muted/20">
                            <td className="py-3 px-4">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[250px]">{task.description}</div>
                            </td>
                            <td className="py-3 px-4">{client?.name || "N/A"}</td>
                            <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${task.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                  task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                  task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'}`}
                              >
                                {task.priority}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3" />
                                <span>Completed</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <div className="bg-primary text-xs flex items-center justify-center w-full h-full text-primary-foreground">
                                    {assignedUser?.name.substring(0, 2).toUpperCase() || "UN"}
                                  </div>
                                </Avatar>
                                <span>{assignedUser?.name || "Unassigned"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center gap-2">
                                <Button variant="ghost" size="sm">Edit</Button>
                                <Button variant="ghost" size="sm">View</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default TasksPage;

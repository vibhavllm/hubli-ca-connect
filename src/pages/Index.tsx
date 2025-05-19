
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Users, 
  ClipboardList,
  Search,
  FileText,
  CheckCircle,
  AlertCircle,
  Timer
} from "lucide-react";

import { 
  mockClients, 
  mockServices, 
  mockTasks, 
  getClientById,
  getUserById
} from "../data/mockData";

const ClientsTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 w-full md:w-1/2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>Add Client</Button>
      </div>
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="py-3 px-4 text-left">Client Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Tags</th>
                <th className="py-3 px-4 text-left">Since</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-muted/20">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">{client.type}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div>{client.email}</div>
                      <div className="text-xs text-muted-foreground">{client.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {client.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="capitalize">
                          {tag.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">{new Date(client.since).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TasksTab = () => {
  return (
    <div className="space-y-4">
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
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task) => {
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ServicesTab = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Due Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {mockServices.map((service) => {
                const client = getClientById(service.clientId);
                const assignedUser = getUserById(service.assignedTo);
                
                return (
                  <tr key={service.id} className="border-b hover:bg-muted/20">
                    <td className="py-3 px-4">
                      <div className="font-medium">{service.description}</div>
                    </td>
                    <td className="py-3 px-4">{client?.name || "N/A"}</td>
                    <td className="py-3 px-4 capitalize">{service.type.replace('_', ' ')}</td>
                    <td className="py-3 px-4">{new Date(service.dueDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${service.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          service.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          service.status === 'review' ? 'bg-purple-100 text-purple-800' :
                          service.status === 'on_hold' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'}`}
                      >
                        <span className="capitalize">{service.status.replace('_', ' ')}</span>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const pendingTasks = mockTasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = mockTasks.filter(task => task.status === 'in_progress').length;
  const upcomingDeadlines = mockServices.filter(service => 
    new Date(service.dueDate).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your CA Firm CRM dashboard.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-crm-blue" />
                Total Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{mockClients.length}</div>
              <p className="text-xs text-muted-foreground">Across various categories</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-crm-blue" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressTasks} in progress
              </p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-crm-blue" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{upcomingDeadlines}</div>
              <p className="text-xs text-muted-foreground">Due within 7 days</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-crm-blue" />
                Active Services
              </CardTitle>
            </CardHeader>
            <CardContent className="py-3">
              <div className="text-3xl font-bold">{mockServices.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockServices.filter(s => s.status === 'in_progress').length} in progress
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="clients" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="clients" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Clients</span>
                </TabsTrigger>
                <TabsTrigger value="tasks" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span>Tasks</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Services</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </span>
              </div>
            </div>
            
            <TabsContent value="clients" className="mt-6">
              <ClientsTable />
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-6">
              <TasksTab />
            </TabsContent>
            
            <TabsContent value="services" className="mt-6">
              <ServicesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

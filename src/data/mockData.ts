
import { Client, Service, Task, Notification, User } from "@/types/crm";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    email: "rajesh@cafirmhubli.com",
    role: "admin",
  },
  {
    id: "user2",
    name: "Priya Sharma",
    email: "priya@cafirmhubli.com",
    role: "manager",
  },
  {
    id: "user3",
    name: "Amit Patel",
    email: "amit@cafirmhubli.com",
    role: "staff",
  },
];

export const mockClients: Client[] = [
  {
    id: "client1",
    name: "Hubli Educational Trust",
    type: "educational",
    pan: "AAATH1234K",
    gstin: "29AAATH1234K1Z5",
    contactPerson: "Dr. Mahesh Patil",
    email: "mahesh@hubliedu.org",
    phone: "9876543210",
    address: "123 Education Lane, Hubli, Karnataka",
    tags: ["high_value", "audit"],
    since: "2020-04-15",
    industry: "Education",
  },
  {
    id: "client2",
    name: "Rajesh Textile Industries",
    type: "corporate",
    pan: "AABCR4567L",
    gstin: "29AABCR4567L1Z8",
    contactPerson: "Suresh Hegde",
    email: "suresh@rajeshtextiles.com",
    phone: "8765432109",
    address: "456 Industrial Area, Hubli, Karnataka",
    tags: ["gst", "annual_audit"],
    since: "2019-08-22",
    industry: "Textile Manufacturing",
  },
  {
    id: "client3",
    name: "Sunil Mehta",
    type: "individual",
    pan: "ABCPM7890J",
    email: "sunilmehta@gmail.com",
    phone: "7654321098",
    address: "789 Residency Road, Hubli, Karnataka",
    tags: ["income_tax", "wealth_management"],
    since: "2022-02-10",
  },
  {
    id: "client4",
    name: "Hubli Health Services",
    type: "partnership",
    pan: "AABHH5678M",
    gstin: "29AABHH5678M1Z3",
    contactPerson: "Dr. Anand Joshi",
    email: "anand@hublihealthservices.com",
    phone: "6543210987",
    address: "321 Hospital Road, Hubli, Karnataka",
    tags: ["compliance", "tax_planning"],
    since: "2021-11-05",
    industry: "Healthcare",
  },
  {
    id: "client5",
    name: "Karnataka Public School",
    type: "educational",
    pan: "AADPK4321R",
    contactPerson: "Smt. Lakshmi Patil",
    email: "lakshmi@karnatakapublicschool.edu",
    phone: "9876543211",
    address: "567 Education Colony, Hubli, Karnataka",
    tags: ["audit", "educational"],
    since: "2018-06-12",
    industry: "Education",
  },
];

export const mockServices: Service[] = [
  {
    id: "service1",
    clientId: "client1",
    type: "audit",
    description: "Annual Financial Audit FY 2023-24",
    status: "in_progress",
    startDate: "2024-04-01",
    dueDate: "2024-07-31",
    assignedTo: "user2",
  },
  {
    id: "service2",
    clientId: "client2",
    type: "gst_filing",
    description: "Monthly GST Return Filing - May 2024",
    status: "pending",
    startDate: "2024-06-01",
    dueDate: "2024-06-20",
    assignedTo: "user3",
  },
  {
    id: "service3",
    clientId: "client3",
    type: "income_tax",
    description: "ITR Filing for AY 2024-25",
    status: "pending",
    startDate: "2024-04-15",
    dueDate: "2024-07-31",
    assignedTo: "user3",
  },
  {
    id: "service4",
    clientId: "client4",
    type: "compliance",
    description: "Partnership Firm Compliance for FY 2023-24",
    status: "review",
    startDate: "2024-03-01",
    dueDate: "2024-06-30",
    assignedTo: "user1",
  },
  {
    id: "service5",
    clientId: "client5",
    type: "audit",
    description: "FCRA Audit for FY 2023-24",
    status: "in_progress",
    startDate: "2024-04-01",
    dueDate: "2024-09-30",
    assignedTo: "user2",
  },
];

export const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Collect bank statements from Hubli Educational Trust",
    description: "Need last 6 months of bank statements for audit preparation",
    clientId: "client1",
    serviceId: "service1",
    status: "pending",
    priority: "high",
    dueDate: "2024-05-25",
    assignedTo: "user3",
  },
  {
    id: "task2",
    title: "Prepare GST reconciliation for Rajesh Textile",
    description: "Reconcile input credits and outward supplies for May 2024",
    clientId: "client2",
    serviceId: "service2",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-06-18",
    assignedTo: "user3",
  },
  {
    id: "task3",
    title: "Schedule meeting with Sunil Mehta",
    description: "Discuss investment options for tax planning",
    clientId: "client3",
    serviceId: "service3",
    status: "completed",
    priority: "low",
    dueDate: "2024-05-10",
    assignedTo: "user1",
  },
  {
    id: "task4",
    title: "File TDS returns for Hubli Health Services",
    description: "Q4 TDS return filing",
    clientId: "client4",
    serviceId: "service4",
    status: "pending",
    priority: "urgent",
    dueDate: "2024-05-31",
    assignedTo: "user2",
  },
  {
    id: "task5",
    title: "Prepare audit checklist for Karnataka Public School",
    description: "Create comprehensive checklist for FCRA audit",
    clientId: "client5",
    serviceId: "service5",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-06-05",
    assignedTo: "user2",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "Approaching Deadline",
    message: "TDS filing deadline for Hubli Health Services is in 3 days",
    type: "warning",
    read: false,
    date: "2024-05-28T09:30:00Z",
    link: "/tasks/task4",
  },
  {
    id: "notif2",
    title: "Document Uploaded",
    message: "Sunil Mehta has uploaded investment proofs",
    type: "info",
    read: true,
    date: "2024-05-27T14:15:00Z",
    link: "/clients/client3",
  },
  {
    id: "notif3",
    title: "Task Completed",
    message: "Meeting with Sunil Mehta has been marked as completed",
    type: "success",
    read: false,
    date: "2024-05-10T16:45:00Z",
    link: "/tasks/task3",
  },
  {
    id: "notif4",
    title: "Service Status Updated",
    message: "Compliance service for Hubli Health Services moved to Review stage",
    type: "info",
    read: false,
    date: "2024-05-26T11:20:00Z",
    link: "/services/service4",
  },
];

// Helper functions to get data
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getServicesByClientId = (clientId: string): Service[] => {
  return mockServices.filter(service => service.clientId === clientId);
};

export const getTasksByClientId = (clientId: string): Task[] => {
  return mockTasks.filter(task => task.clientId === clientId);
};

export const getTasksByServiceId = (serviceId: string): Task[] => {
  return mockTasks.filter(task => task.serviceId === serviceId);
};

export const getServiceById = (serviceId: string): Service | undefined => {
  return mockServices.find(service => service.id === serviceId);
};

export const getTaskById = (taskId: string): Task | undefined => {
  return mockTasks.find(task => task.id === taskId);
};

export const getTasksByAssignee = (userId: string): Task[] => {
  return mockTasks.filter(task => task.assignedTo === userId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getUnreadNotificationsCount = (): number => {
  return mockNotifications.filter(notif => !notif.read).length;
};

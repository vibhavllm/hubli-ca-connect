
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  ClipboardList,
  Calendar,
  FileText,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-crm-blue flex items-center justify-center text-white font-bold">CA</div>
            <h1 className="text-xl font-bold text-crm-blue hidden md:block">CA Firm CRM</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 rounded-full bg-muted/50 focus:outline-none focus:ring-1 focus:ring-primary w-[200px] text-sm"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-sidebar h-[calc(100vh-64px)] transition-all duration-300 flex flex-col border-r border-sidebar-border",
            sidebarOpen ? "w-64" : isMobile ? "w-0" : "w-16"
          )}
        >
          <div className="p-4">
            <div className={cn("mb-6", !sidebarOpen && "flex justify-center")}>
              <span className={cn("text-sidebar-foreground/70 uppercase text-xs font-medium", !sidebarOpen && !isMobile && "hidden")}>
                Main Menu
              </span>
            </div>
            <nav className="space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  cn("sidebar-item", isActive && "active")
                }
                end
              >
                <Users size={18} />
                <span className={cn(!sidebarOpen && !isMobile && "hidden")}>Clients</span>
              </NavLink>
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => 
                  cn("sidebar-item", isActive && "active")
                }
              >
                <ClipboardList size={18} />
                <span className={cn(!sidebarOpen && !isMobile && "hidden")}>Tasks</span>
              </NavLink>
              <NavLink 
                to="/calendar" 
                className={({ isActive }) => 
                  cn("sidebar-item", isActive && "active")
                }
              >
                <Calendar size={18} />
                <span className={cn(!sidebarOpen && !isMobile && "hidden")}>Calendar</span>
              </NavLink>
              <NavLink 
                to="/documents" 
                className={({ isActive }) => 
                  cn("sidebar-item", isActive && "active")
                }
              >
                <FileText size={18} />
                <span className={cn(!sidebarOpen && !isMobile && "hidden")}>Documents</span>
              </NavLink>
            </nav>

            <div className={cn("mt-8 mb-4", !sidebarOpen && "flex justify-center")}>
              <span className={cn("text-sidebar-foreground/70 uppercase text-xs font-medium", !sidebarOpen && !isMobile && "hidden")}>
                Settings
              </span>
            </div>
            <nav className="space-y-1">
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  cn("sidebar-item", isActive && "active")
                }
              >
                <Settings size={18} />
                <span className={cn(!sidebarOpen && !isMobile && "hidden")}>Settings</span>
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

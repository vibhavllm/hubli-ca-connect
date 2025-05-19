
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import { useState } from "react";
import { mockTasks, mockServices } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Convert due dates from tasks and services into event objects
  const events = [
    ...mockTasks.map(task => ({
      id: task.id,
      title: task.title,
      date: new Date(task.dueDate),
      type: 'task',
      priority: task.priority,
      status: task.status,
    })),
    ...mockServices.map(service => ({
      id: service.id,
      title: service.description,
      date: new Date(service.dueDate),
      type: 'service',
      status: service.status,
    }))
  ];

  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );

  const formatDateHeader = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View all due dates and deadlines in one place.</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
            </h2>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  if (date) {
                    const prevMonth = new Date(date);
                    prevMonth.setMonth(prevMonth.getMonth() - 1);
                    setDate(prevMonth);
                  }
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  if (date) {
                    const nextMonth = new Date(date);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setDate(nextMonth);
                  }
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={view === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              <Grid className="h-4 w-4 mr-1" />
              Calendar
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {view === "calendar" ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">{formatDateHeader(date)}</h3>
                {selectedDateEvents.length === 0 ? (
                  <div className="p-6 bg-muted/30 rounded-lg text-center">
                    <p className="text-muted-foreground">No events scheduled for this day.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                      <Card key={event.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`h-2 w-2 rounded-full
                                ${event.type === 'task' ? 'bg-crm-blue' : 'bg-secondary'}`} 
                              />
                              <span className="text-sm text-muted-foreground capitalize">
                                {event.type}
                              </span>
                              {event.type === 'task' && event.priority && (
                                <span className={`text-xs px-2 py-0.5 rounded-full
                                  ${event.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                    event.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                    event.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'}`}
                                >
                                  {event.priority}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-0.5 rounded-full
                              ${event.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                event.status === 'in_progress' || event.status === 'review' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'}`}
                            >
                              {event.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="upcoming">
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="mt-4">
                    <div className="space-y-4">
                      {events
                        .filter(event => event.date >= new Date())
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map(event => (
                          <Card key={event.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className={`h-2 w-2 rounded-full
                                    ${event.type === 'task' ? 'bg-crm-blue' : 'bg-secondary'}`} 
                                  />
                                  <span className="text-sm text-muted-foreground capitalize">
                                    {event.type}
                                  </span>
                                  {event.type === 'task' && event.priority && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full
                                      ${event.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                                        event.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                        event.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'}`}
                                    >
                                      {event.priority}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {event.date.toLocaleDateString()}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full
                                  ${event.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    event.status === 'in_progress' || event.status === 'review' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'}`}
                                >
                                  {event.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="past" className="mt-4">
                    {/* Past events list */}
                  </TabsContent>
                  <TabsContent value="all" className="mt-4">
                    {/* All events list */}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-3 pointer-events-auto"
                classNames={{
                  day_today: "bg-muted",
                  day_selected: "bg-primary text-primary-foreground",
                }}
                // Mark days that have events
                modifiers={{
                  hasEvent: events.map(event => event.date),
                }}
                modifiersStyles={{
                  hasEvent: { 
                    textDecoration: "underline",
                    textDecorationColor: "var(--crm-blue)",
                    textDecorationThickness: "2px"
                  }
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;

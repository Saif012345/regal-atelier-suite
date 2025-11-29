import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Package, FileText, Calendar, ShoppingCart, Image, Users, LayoutDashboard, Settings, DollarSign } from "lucide-react";
const sidebarItems = [{
  title: "Dashboard",
  icon: LayoutDashboard,
  value: "dashboard"
}, {
  title: "Inquiries",
  icon: FileText,
  value: "inquiries"
}, {
  title: "Products",
  icon: Package,
  value: "products"
}, {
  title: "Bookings",
  icon: Calendar,
  value: "bookings"
}, {
  title: "Orders",
  icon: ShoppingCart,
  value: "orders"
}, {
  title: "Gallery",
  icon: Image,
  value: "gallery"
}, {
  title: "Customers",
  icon: Users,
  value: "customers"
}, {
  title: "Settings",
  icon: Settings,
  value: "settings"
}];
export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-6 border-b">
              <h2 className="font-display text-xl font-semibold">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">Rayyanatu Adamu</p>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map(item => <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton onClick={() => setActiveTab(item.value)} isActive={activeTab === item.value} className="w-full">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              <h1 className="font-display text-2xl font-semibold">
                {sidebarItems.find(item => item.value === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="p-8">
            {activeTab === "dashboard" && <>
                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231</div>
                      <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                      <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+12 this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground">8 in production</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-xs text-muted-foreground">Next 7 days</p>
                    </CardContent>
                  </Card>
                </div>
              </>}

            {activeTab === "inquiries" && <Card>
                <CardHeader>
                  <CardTitle>Custom Inquiries</CardTitle>
                  <CardDescription>Manage customer design requests and inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Sarah Johnson - Bridal Inquiry</p>
                          <p className="text-sm text-muted-foreground">Budget: $3,000-$4,000 • Need by: June 15, 2025</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">New</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="gold" size="sm">Respond</Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "products" && <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>Add and manage your product catalog</CardDescription>
                  </div>
                  <Button variant="gold">Add Product</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <div className="h-16 w-16 bg-muted rounded" />
                        <div className="flex-1">
                          <p className="font-medium">Celestial Ballgown</p>
                          <p className="text-sm text-muted-foreground">Prom • $1,899</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "bookings" && <Card>
                <CardHeader>
                  <CardTitle>Consultation Bookings</CardTitle>
                  <CardDescription>Manage upcoming consultations and appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">Video Consultation - Emma Davis</p>
                          <p className="text-sm text-muted-foreground">Jan 25, 2025 at 2:00 PM • Zoom</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="gold" size="sm">Join Call</Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "orders" && <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">Order #ORD-{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">Customer: Jane Smith • Total: $2,899</p>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded mt-2 inline-block">
                            In Production
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="gold" size="sm">Update Status</Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "gallery" && <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gallery Management</CardTitle>
                    <CardDescription>Upload and manage showcase images</CardDescription>
                  </div>
                  <Button variant="gold">Upload Images</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg" />
                        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {activeTab === "customers" && <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage customer information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Customer management features coming soon...</p>
                </CardContent>
              </Card>}

            {activeTab === "settings" && <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your store settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings configuration coming soon...</p>
                </CardContent>
              </Card>}
          </div>
        </main>
      </div>
    </SidebarProvider>;
}
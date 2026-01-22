import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Package, FileText, Calendar, ShoppingCart, Image, Users, LayoutDashboard, Settings, DollarSign, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdminProductManager } from "@/components/admin/AdminProductManager";
import { AdminGalleryManager } from "@/components/admin/AdminGalleryManager";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, value: "dashboard" },
  { title: "Products", icon: Package, value: "products" },
  { title: "Gallery", icon: Image, value: "gallery" },
  { title: "Inquiries", icon: FileText, value: "inquiries" },
  { title: "Bookings", icon: Calendar, value: "bookings" },
  { title: "Orders", icon: ShoppingCart, value: "orders" },
  { title: "Customers", icon: Users, value: "customers" },
  { title: "Settings", icon: Settings, value: "settings" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r">
          <SidebarContent>
            <div className="p-6 border-b">
              <h2 className="font-display text-xl font-semibold">Admin Panel</h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              {!isAdmin && (
                <p className="text-xs text-amber-600 mt-1">Limited access - Contact admin for full permissions</p>
              )}
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.value)}
                        isActive={activeTab === item.value}
                        className="w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t">
              <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex h-16 items-center px-8 gap-4">
              <SidebarTrigger />
              <h1 className="font-display text-2xl font-semibold">
                {sidebarItems.find((item) => item.value === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="p-8">
            {activeTab === "dashboard" && (
              <>
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

                {/* Brand Overview */}
                <div className="grid gap-4 md:grid-cols-2 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Azixa Rahman Label</CardTitle>
                      <CardDescription>Prom, Bridal & Occasion Wear</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gallery Images</span>
                          <span className="font-medium">10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Inquiries</span>
                          <span className="font-medium">8</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Simply Azixa</CardTitle>
                      <CardDescription>Modest Elegance Collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Products</span>
                          <span className="font-medium">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gallery Images</span>
                          <span className="font-medium">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Orders</span>
                          <span className="font-medium">6</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "products" && <AdminProductManager />}

            {activeTab === "gallery" && <AdminGalleryManager />}

            {activeTab === "inquiries" && (
              <Card>
                <CardHeader>
                  <CardTitle>Custom Inquiries</CardTitle>
                  <CardDescription>Manage customer design requests and inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">Sarah Johnson - Bridal Inquiry</p>
                          <p className="text-sm text-muted-foreground">
                            Budget: $3,000-$4,000 • Need by: June 15, 2025
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">New</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="gold" size="sm">Respond</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "bookings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Bookings</CardTitle>
                  <CardDescription>Manage upcoming consultations and appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">Video Consultation - Emma Davis</p>
                          <p className="text-sm text-muted-foreground">Jan 25, 2025 at 2:00 PM • Zoom</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button variant="gold" size="sm">Join Call</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "customers" && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>View and manage customer information</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Customer management features coming soon...</p>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Configure your store settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings configuration coming soon...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

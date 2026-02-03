import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Package, FileText, Calendar, ShoppingCart, Image, Users, LayoutDashboard, Settings, LogOut, ImageIcon, Loader2, FolderOpen, Palette } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdminProductManager } from "@/components/admin/AdminProductManager";
import { AdminGalleryManager } from "@/components/admin/AdminGalleryManager";
import { AdminSiteImagesManager } from "@/components/admin/AdminSiteImagesManager";
import { AdminFabricManager } from "@/components/admin/AdminFabricManager";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  azixaProducts: number;
  simplyAzixaProducts: number;
  azixaGallery: number;
  simplyAzixaGallery: number;
  totalProducts: number;
  totalGallery: number;
  totalFabrics: number;
}

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, value: "dashboard" },
  { title: "Products", icon: Package, value: "products" },
  { title: "Fabrics", icon: Palette, value: "fabrics" },
  { title: "Site Images", icon: ImageIcon, value: "site-images" },
  { title: "Gallery", icon: Image, value: "gallery" },
  { title: "Inquiries", icon: FileText, value: "inquiries" },
  { title: "Bookings", icon: Calendar, value: "bookings" },
  { title: "Orders", icon: ShoppingCart, value: "orders" },
  { title: "Customers", icon: Users, value: "customers" },
  { title: "Settings", icon: Settings, value: "settings" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchStats() {
      setLoadingStats(true);
      try {
        // Fetch product counts by brand
        const [azixaProductsRes, simplyProductsRes, azixaGalleryRes, simplyGalleryRes, fabricsRes] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact', head: true }).eq('brand', 'azixa'),
          supabase.from('products').select('id', { count: 'exact', head: true }).eq('brand', 'simply-azixa'),
          supabase.from('gallery_images').select('id', { count: 'exact', head: true }).eq('brand', 'azixa'),
          supabase.from('gallery_images').select('id', { count: 'exact', head: true }).eq('brand', 'simply-azixa'),
          supabase.from('fabric_swatches').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          azixaProducts: azixaProductsRes.count || 0,
          simplyAzixaProducts: simplyProductsRes.count || 0,
          azixaGallery: azixaGalleryRes.count || 0,
          simplyAzixaGallery: simplyGalleryRes.count || 0,
          totalProducts: (azixaProductsRes.count || 0) + (simplyProductsRes.count || 0),
          totalGallery: (azixaGalleryRes.count || 0) + (simplyGalleryRes.count || 0),
          totalFabrics: fabricsRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoadingStats(false);
      }
    }

    if (user) {
      fetchStats();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            <div className="flex h-16 items-center px-4 sm:px-8 gap-4">
              <SidebarTrigger />
              <h1 className="font-display text-xl sm:text-2xl font-semibold">
                {sidebarItems.find((item) => item.value === activeTab)?.title || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {activeTab === "dashboard" && (
              <>
                {/* Overview Stats */}
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                      <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      {loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
                          <p className="text-xs text-muted-foreground">Across both brands</p>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Fabric Swatches</CardTitle>
                      <Palette className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      {loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">{stats?.totalFabrics || 0}</div>
                          <p className="text-xs text-muted-foreground">Available fabrics</p>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
                      <Image className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      {loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <div className="text-2xl font-bold">{stats?.totalGallery || 0}</div>
                          <p className="text-xs text-muted-foreground">In showcase gallery</p>
                        </>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <p className="text-xs text-muted-foreground">Coming soon</p>
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
                      {loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Products</span>
                            <span className="font-medium">{stats?.azixaProducts || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Gallery Images</span>
                            <span className="font-medium">{stats?.azixaGallery || 0}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Simply Azixa</CardTitle>
                      <CardDescription>Modest Elegance Collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loadingStats ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Products</span>
                            <span className="font-medium">{stats?.simplyAzixaProducts || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Gallery Images</span>
                            <span className="font-medium">{stats?.simplyAzixaGallery || 0}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump to commonly used features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => setActiveTab("products")}>
                        <Package className="h-4 w-4 mr-2" />
                        Manage Products
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("gallery")}>
                        <Image className="h-4 w-4 mr-2" />
                        Manage Gallery
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("site-images")}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Update Site Images
                      </Button>
                      <Button variant="outline" onClick={() => setActiveTab("fabrics")}>
                        <Palette className="h-4 w-4 mr-2" />
                        Manage Fabrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "products" && <AdminProductManager />}

            {activeTab === "site-images" && <AdminSiteImagesManager />}

            {activeTab === "fabrics" && <AdminFabricManager />}

            {activeTab === "gallery" && <AdminGalleryManager />}

            {activeTab === "inquiries" && (
              <Card>
                <CardHeader>
                  <CardTitle>Custom Inquiries</CardTitle>
                  <CardDescription>Manage customer design requests and inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">No Inquiries Yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Customer inquiries submitted through the contact form will appear here. 
                      This feature will be available once the inquiry system is set up.
                    </p>
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
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">No Bookings Yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Consultation bookings will appear here once customers start scheduling appointments.
                      This feature will be available once the booking system is integrated.
                    </p>
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
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">No Orders Yet</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Customer orders will appear here once the checkout system is fully integrated.
                      Currently, orders are managed through direct communication.
                    </p>
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
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Customer Directory</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Customer profiles and purchase history will be available here once customer accounts are enabled.
                    </p>
                  </div>
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
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">Store Settings</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Store configuration options including business hours, shipping settings, 
                      and notification preferences will be available here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Layout } from "@/components/layout/Layout";

/* PUBLIC PAGES - Lazy loaded for better performance */
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Achievements = lazy(() => import("./pages/Achievements"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* ADMIN PAGES - Lazy loaded */
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddProduct = lazy(() => import("./pages/admin/AddProduct"));
const EditProduct = lazy(() => import("./pages/admin/EditProduct"));
const AdminProtectedRoute = lazy(() => import("./pages/admin/AdminProtectedRoute"));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ================= PUBLIC WEBSITE ================= */}
            <Route
              path="/"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />

            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />

            <Route
              path="/products"
              element={
                <Layout>
                  <Products />
                </Layout>
              }
            />

            <Route
              path="/services"
              element={
                <Layout>
                  <Services />
                </Layout>
              }
            />

          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          <Route
            path="/achievements"
            element={
              <Layout>
                <Achievements />
              </Layout>
            }
          />

          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/edit-product/:id"
            element={
              <AdminProtectedRoute>
                <EditProduct />
              </AdminProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

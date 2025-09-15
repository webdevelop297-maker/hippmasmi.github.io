// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProgramAdmin from "@/pages/ProgramAdmin";
import News from "@/pages/News";
import ArticleDetail from "@/pages/ArticleDetail";

// Pages
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import Struktur from "./pages/Struktur";
import Sejarah from "./pages/Sejarah";
import Program from "./pages/Program";
import DatabaseKader from "./pages/DatabaseKader";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

// 🔒 Komponen proteksi (bisa dipakai banyak route)
function PrivateRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setIsAdmin(parsed.role === "admin"); // hanya admin
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return <p className="p-6 text-center">Loading...</p>;
  if (!isAdmin) return <Navigate to="/" replace />; // redirect kalau bukan admin

  return children;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/struktur" element={<Struktur />} />
          <Route path="/sejarah" element={<Sejarah />} />
          <Route path="/program" element={<Program />} />
          <Route path="/database-kader" element={<DatabaseKader />} />
          <Route path="/news" element={<News />} />
          <Route path="/artikel/:id" element={<ArticleDetail />} />

          {/* 🔒 Admin-only routes */}
          <Route
            path="/program-admin"
            element={
              <PrivateRoute>
                <ProgramAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/berita"
            element={
              <PrivateRoute>
                <News />
              </PrivateRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

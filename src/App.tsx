// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";

// Pages (public)
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import Struktur from "./pages/Struktur";
import Sejarah from "./pages/Sejarah";
import Program from "./pages/Program";
import DatabaseKader from "./pages/DatabaseKader";
import NotFound from "./pages/NotFound";

// News (public)
import NewsAll from "@/pages/NewsAll";
import ArticleDetail from "@/pages/ArticleDetail";

// Admin
import ProgramAdmin from "@/pages/ProgramAdmin";
import NewsAdmin from "@/pages/NewsAdmin";

// 🔒 Komponen proteksi (khusus admin)
function PrivateRoute({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setIsAdmin(parsed.role === "admin");
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return <p className="p-6 text-center">Loading...</p>;
  if (!isAdmin) return <Navigate to="/" replace />;

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

          {/* Berita publik */}
          <Route path="/news" element={<NewsAll />} />
          <Route path="/berita/:id" element={<ArticleDetail />} />

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
                <NewsAdmin />
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

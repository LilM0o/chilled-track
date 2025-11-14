import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tracabilite from "./pages/Tracabilite";
import Temperatures from "./pages/Temperatures";
import Nettoyage from "./pages/Nettoyage";
import Reception from "./pages/Reception";
import Historique from "./pages/Historique";
import Parametres from "./pages/Parametres";
import Notifications from "./pages/Notifications";


import TemperatureSettings from "./pages/TemperatureSettings";
import PersonnelSettings from "./pages/PersonnelSettings";
import EquipementsSettings from "./pages/EquipementsSettings";
import NettoyageSettings from "./pages/NettoyageSettings";
import ExportSettings from "./pages/ExportSettings";
import FournisseursSettings from "./pages/FournisseursSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tracabilite" element={<Tracabilite />} />
          <Route path="/temperatures" element={<Temperatures />} />
          <Route path="/nettoyage" element={<Nettoyage />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/parametres" element={<Parametres />} />
          
          <Route path="/parametres/temperatures" element={<TemperatureSettings />} />
          <Route path="/parametres/personnel" element={<PersonnelSettings />} />
          <Route path="/parametres/equipements" element={<EquipementsSettings />} />
          <Route path="/parametres/nettoyage" element={<NettoyageSettings />} />
          <Route path="/parametres/export" element={<ExportSettings />} />
          <Route path="/parametres/fournisseurs" element={<FournisseursSettings />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

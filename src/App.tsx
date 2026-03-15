import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";

import useFluidCursor from "./hooks/useFluidCursor";


import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useFluidCursor();
  return(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      <BackgroundVideo />
      
      <div className="relative z-10">
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

    </TooltipProvider>
  </QueryClientProvider>
);
};


export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/Patients";
import AppointmentsPage from "./pages/Appointments";
import NewAppointment from "./pages/Appointments/NewAppointment";
import DoctorsPage from "./pages/Doctors";
import BillingPage from "./pages/Billing";
import MedicalRecordsPage from "./pages/Records";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/appointments/new" element={<NewAppointment />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/records" element={<MedicalRecordsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            {/* Add routes for detailed views and new item creation */}
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

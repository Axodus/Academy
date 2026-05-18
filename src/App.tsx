import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AcademyRoutes } from "./modules/academy/AcademyRoutes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AcademyRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

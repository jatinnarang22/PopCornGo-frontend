import React from "react";
import AppRoutes from "./routes/AppRoutes.tsx";
import Header from "./layouts/Header.tsx";
import Footer from "./layouts/Footer.tsx";

const App: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Header />
    <main className="flex-1">
      <AppRoutes />
    </main>
    <Footer />
  </div>
);

export default App;

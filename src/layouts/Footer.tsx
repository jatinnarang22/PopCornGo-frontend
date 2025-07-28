// layouts/Footer.tsx
import React from "react";
const Footer: React.FC = () => (
  <footer className="bg-gray-100 text-center py-4 dark:bg-gray-800 dark:text-gray-300">
    © {new Date().getFullYear()} PopcornGo. All rights reserved.
  </footer>
);
export default Footer;

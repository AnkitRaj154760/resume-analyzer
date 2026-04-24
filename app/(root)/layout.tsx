import { Navbar } from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/next"
import React from "react";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layout;

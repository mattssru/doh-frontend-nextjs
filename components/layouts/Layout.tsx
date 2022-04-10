import React from "react";
import dynamic from "next/dynamic";

const Header = dynamic(import("./Header"));
const Footer = dynamic(import("./Footer"));

const Layout = (props: any) => {
  const { children } = props;
  return (
    <>
      <Header />
      <article>{children}</article>
      <Footer />
    </>
  );
};

export default Layout;

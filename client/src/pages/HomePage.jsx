import React from "react";
import {
  About,
  Header,
  Navbar,
  TopPicks,
  BrandsComponent,
} from "../components";

const HomePage = () => {
  return (
    <main className="section-center">
      <Navbar />
      <Header />
      <TopPicks />
      <BrandsComponent />
      <About />
    </main>
  );
};

export default HomePage;

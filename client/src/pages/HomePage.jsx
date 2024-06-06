import React from 'react';
import { About, Header, Navbar } from '../components';

const HomePage = () => {
  return (
    <main className='section-center'>
      <Navbar />
      <Header />
      <About />
    </main>
  );
};

export default HomePage;

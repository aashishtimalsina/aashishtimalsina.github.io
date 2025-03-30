
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
};

export default Index;

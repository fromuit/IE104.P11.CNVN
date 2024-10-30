import React from 'react';
import Section from './Section/Section';
import Aside from './Aside/Aside';
import './Main.css';

const Main = () => {
  return (
    <main className="main-container">
      <Section />
      <Aside />
    </main>
  );
};

export default Main;
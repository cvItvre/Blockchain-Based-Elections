import React from 'react';

import Header from './components/header';
import Footer from './components/footer';
import SideBar from './components/sidebar';
// import Page1 from './components/pages/page1';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './styles.css';

const App = () => (
  <div className="App">
    <SideBar />
    <Footer />

    <Header />
  </div>
);

export default App;

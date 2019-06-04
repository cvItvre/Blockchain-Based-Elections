import React from 'react';

import Header from './components/header';
import Footer from './components/footer';
import SideBar from './components/sidebar';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './styles.css';

const App = () => (
  <div className="App">
    <Header />

    <SideBar />
    <Footer />
  </div>
);

export default App;

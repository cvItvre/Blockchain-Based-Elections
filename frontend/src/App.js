import React from 'react';

import Header from './pages/header';
import Footer from './pages/footer';
import SideBar from './pages/sidebar';

import './styles.css';

const App = () => (
        <div className="App">
            <Header />

            <SideBar />
            <Footer />
        </div>
);

export default App;

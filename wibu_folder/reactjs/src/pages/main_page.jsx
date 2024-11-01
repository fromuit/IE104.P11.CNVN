import React from 'react';
import Header from './components/Main-page/Header/Header';
import Main from './components/Main-page/Main/Main';
import Footer from './components/Main-page/Footer/Footer';

const MainPage = () => {
    return (
        <div className='app'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default MainPage;

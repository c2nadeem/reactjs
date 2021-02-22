import React, {Component} from 'react';
//import {Card, Container, Button} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Routes from "../Routes";

class MainPage extends Component{

    render() {
        return (
            <React.Fragment>

                <Header/>
                <Routes/>
                <Footer/>

            </React.Fragment>
        );
    }
}

export default MainPage;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Button, Container, Grid} from 'semantic-ui-react';
import Header from "./header/Header";
import Content from "./content/front/FrontContent";
 class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Content/>
            </React.Fragment>
        );
    }
}
export default Index;
if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}

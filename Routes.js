import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import {ROUTE_PATH} from '../helper';
import  About from './pages/About';
import  Home from './pages/Home';
import BloodRequest from "./pages/BloodRequest";
import BloodDonors from "./pages/BloodDonors";
import Blog from "./pages/Blog";
import BloodRequestDetail from "./pages/BloodRequestDetail";
import BloodDonorDetail from "./pages/BloodDonorDetail";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
//import jQueryHelper from "../jQuery/jQueryHelper";
//import FUNC_LIST from "../jQuery/constants";




//import isAuthenticated from './Authorization';

class Routes extends Component {

    // componentDidUpdate(prevProps) {
    //     if (this.props.location !== prevProps.location) {
    //         jQueryHelper.run(FUNC_LIST.hideSidebarMenu);
    //     }
    // }
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path={ROUTE_PATH.HOME} component={Home}/>
                    <Route path={ROUTE_PATH.ABOUT} component={About}/>
                    <Route path={ROUTE_PATH.BloodRequest} component={BloodRequest}/>
                    <Route path={ROUTE_PATH.ParamBloodDonorsFilter} component={BloodDonors}/>
                    <Route path={ROUTE_PATH.ParamBloodDonorsPaginate} component={BloodDonors}/>
                    <Route path={ROUTE_PATH.Blog} component={Blog}/>
                    <Route path={ROUTE_PATH.Login} component={Login}/>
                    <Route path={ROUTE_PATH.ContactUs} component={About}/>
                    <Route path={ROUTE_PATH.MyAccount} component={MyAccount}/>
                    <Route path={ROUTE_PATH.BloodRequestDetail} component={BloodRequestDetail}/>
                    <Route path={ROUTE_PATH.BloodDonorDetail} component={BloodDonorDetail}/>
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(Routes);
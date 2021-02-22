import React, {Component} from 'react';
//import {Card, Container, Button} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react';
import { Placeholder } from 'semantic-ui-react';
import {fetchBloodRequest} from "../../store/users/actions";
import {connect} from "react-redux";
import BloodRequestCard from "../misc/BloodRequestCard";
class BloodRequestDetail extends Component{
    componentDidMount() {
        let request_id = this.props.match.params.request_id;
        this.props.fetchBloodRequest(request_id);
    }
    renderRequest(){
        if(!this.props.blood_req_fetching) {
            let blood_request = this.props.blood_request;
            if(blood_request !== undefined) {
                let request = blood_request.request;
                console.log('request.message');
                console.log(request.message);

                return <BloodRequestCard request={request} full_page={true} color={"red"}/>
            }
        }
    }
    render() {

        return (
            <Container>
                <h2>Blood Request for </h2>
                {this.renderRequest()}
            </Container>
        );
    }
}
const mapStatesToProps = (state) =>{
    return {
        blood_request: state.users.FETCH_BLOOD_REQUEST,
        blood_req_fetching: state.users.blood_req_fetching,

    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        fetchBloodRequest: function(request_id){
            dispatch(fetchBloodRequest(request_id))
        }
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(BloodRequestDetail);
import React, {Component} from 'react';
//import {Card, Container, Button} from 'semantic-ui-react';
import {Container} from 'semantic-ui-react';
import { Placeholder } from 'semantic-ui-react';
import {fetchBloodDonor} from "../../store/users/actions";
import {connect} from "react-redux";
import BloodDonorCard from "../misc/BloodDonorCard";
class BloodDonorDetail extends Component{
    componentDidMount() {
        let request_id = this.props.match.params.slug_or_id;
        this.props.fetchBloodDonor(request_id);
    }
    renderDonor(){
        if(!this.props.fetching) {
            let blood_donor = this.props.blood_donor;
            if(blood_donor !== undefined) {
                let donor = blood_donor.donor;

                return <BloodDonorCard donor={donor} full_page={true} color={"red"}/>
            }
        }
    }
    render() {

        return (
            <Container>
                <h2>Blood Donor </h2>
                {this.renderDonor()}
            </Container>
        );
    }
}
const mapStatesToProps = (state) =>{
    return {
        blood_donor: state.users.FETCH_BLOOD_DONOR,
        fetching: state.users.fetching,

    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        fetchBloodDonor: function(slug_or_id){
            dispatch(fetchBloodDonor(slug_or_id))
        }
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(BloodDonorDetail);
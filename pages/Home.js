import React, {Component} from 'react';
import {Card, Container, Grid, Segment} from 'semantic-ui-react';
import ShowLoader from '../misc/ShowLoader'
import {connect} from "react-redux";
import {fetchBloodRequests, fetchDonors} from "../../store/users/actions";
import Placeholder from '../misc/Placeholder'
import BloodRequestCard from "../misc/BloodRequestCard";
import BloodDonorCard from "../misc/BloodDonorCard";
class Home extends Component{
    componentWillMount(){
        this.props.fetchDonors();
        this.props.fetchBloodRequests();
    }
    componentDidMount(){

    }
    renderDonors() {
        let donors_list;
        if(!this.props.donor_fetching) {
            let donors = this.props.donors_list;
            if(donors !== undefined) {
                let blood_donors = donors.donors;
                donors_list = blood_donors.map(donor => (
                    <BloodDonorCard donor={donor} full_page={false} />

                ));
            }
        }
        return donors_list;
    }
    renderBloodRequests() {
        let blood_requests_list;
        if(!this.props.blood_req_fetching) {
            let blood_requests = this.props.blood_requests;
            if(blood_requests !== undefined) {
                blood_requests = blood_requests.blood_requests
                console.log(blood_requests);
                blood_requests_list = blood_requests.map(request => (

                    <BloodRequestCard request={request} full_page={false}/>



                ));
            }
        }
        return blood_requests_list;
    }

    render() {
        //console.log(this.props.donors_list);

        return (
            <Container>
                <Grid >
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={11}>
                            <Placeholder if_show={this.props.blood_req_fetching} count={3}/>
                            <Card.Group itemsPerRow={2}>

                                {this.renderBloodRequests()}
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={5}>
                            <Placeholder if_show={this.props.donor_fetching} count={2}/>
                            <Card.Group itemsPerRow={1}>
                                {this.renderDonors()}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        donors_list: state.users.FETCH_DONORS,
        blood_requests: state.users.FETCH_BLOOD_REQUESTS,
        donor_fetching: state.users.donor_fetching,
        blood_req_fetching: state.users.blood_req_fetching,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDonors:function(){
            dispatch(fetchDonors())
        },
        fetchBloodRequests: function(){
            dispatch(fetchBloodRequests())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
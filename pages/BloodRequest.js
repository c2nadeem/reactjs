import React, {Component} from 'react';
import {Card, Pagination} from 'semantic-ui-react';
import {Container, Grid} from 'semantic-ui-react';
import BloodRequestCard from "../misc/BloodRequestCard";
import {fetchBloodRequests} from "../../store/users/actions";
import {connect} from "react-redux";
import Placeholder from "../misc/Placeholder";
import {ROUTE_PATH} from "../../helper";
class BloodRequest extends Component{
    total;
    constructor(props) {
        super(props)
        this.state = {
            defaultPage: 1
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    componentWillMount() {
        let page = this.props.match.params.id ? this.props.match.params.id : 1;
        this.props.fetchBloodRequests({'per_page': 12, 'page': page})
    }
    renderBloodRequests() {
        let blood_requests_list;
        if(!this.props.blood_req_fetching) {
            let blood_requests = this.props.blood_requests;
            if(blood_requests !== undefined) {
                this.total = blood_requests.total;
                blood_requests  = blood_requests.blood_requests;
                blood_requests_list = blood_requests.map(request => (
                    <BloodRequestCard request={request} full_page={false}/>
                ));
            }
        }
        return blood_requests_list;
    }
    handlePaginationChange (e, activep) {
        let activePage = activep.activePage;
        this.setState({
            defaultPage:activep.activePage
        });
        let post = {'per_page': 12, 'page': activePage};
        let url = ROUTE_PATH.BloodRequest+activePage;
        this.props.fetchBloodRequests(post).then((response) => {
            this.props.history.push(url);
        });
    }
    render() {
        const defaultPage = this.state.defaultPage;
        return (
            <Container>
                <Grid >
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={16}>
                            <Placeholder if_show={this.props.blood_req_fetching} count={3}/>
                            <Card.Group itemsPerRow={3}>
                                {this.renderBloodRequests()}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column textAlign={"center"}>
                            <Pagination
                                defaultActivePage={defaultPage}
                                totalPages={this.total ? this.total : 1}
                                onPageChange={this.handlePaginationChange}
                            />

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        blood_requests: state.users.FETCH_BLOOD_REQUESTS,
        blood_req_fetching: state.users.blood_req_fetching,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBloodRequests: function(data){
            dispatch(fetchBloodRequests(data))
        }
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(BloodRequest);

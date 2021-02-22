import React, {Component} from 'react';
import {Card, Container, Dropdown, Form, Grid, Pagination} from 'semantic-ui-react';
import ShowLoader from '../misc/ShowLoader'
import {connect} from "react-redux";
import {fetchDonors} from "../../store/users/actions";


import BloodDonorCard from "../misc/BloodDonorCard";
import {Redirect, withRouter} from "react-router-dom";
import {ROUTE_PATH} from "../../helper";
import Placeholder from "../misc/Placeholder";
class BloodDonors extends Component{
    total;
    constructor(props) {
        super(props)
        this.state = {
            defaultPage: 1,
            city: '',
            blood_group: '',
            total_rec: 2
        }
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
        this.searchDonors = this.searchDonors.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount(){
        let page = this.props.match.params.id ? this.props.match.params.id : 1;
        let city = this.props.match.params.city ? this.props.match.params.city : '';
        let blood_group = this.props.match.params.group ? this.props.match.params.group : '';
        this.setState({
            defaultPage: page,
            city: city,
            blood_group: blood_group
        });
        this.props.fetchDonors(page, {'city': city, 'blood_group': blood_group});

    }

    renderDonors() {
        let donors_list;
        if(!this.props.donor_fetching) {
            let donors = this.props.donors_list;
            if(donors !== undefined) {

                let blood_donors = donors.donors;
                this.total = donors.total;
                donors_list = blood_donors.map(donor => (
                    <BloodDonorCard donor={donor} full_page={false} small_desc={true}/>

                ));

            }
        }
        return donors_list;
    }

    showLoader(fetching){
        let loader;
        if(fetching) {
            loader = <ShowLoader />;
        }
        return loader;
    }
    handlePaginationChange (e, activep) {
        let activePage = activep.activePage;
        this.setState({
            defaultPage:activep.activePage
        });
        let city = this.state.city ? this.state.city : 'any';
        let blood_group = this.state.blood_group ? this.state.blood_group : 'any';
        let post = {};
        let url = ROUTE_PATH.BloodDonors+activePage;
        if(city != 'any' || blood_group != 'any') {
            post = {'city': city, 'blood_group': blood_group, 'page': activePage}
            url = ROUTE_PATH.BloodDonors + city + '/' + blood_group + '/' + activePage;
        }
         this.props.fetchDonors(activePage, post).then((response) => {
             this.props.history.push(url);
         });
    }
    //= (e, { activePage }) => this.setState({ activePage })
    searchDonors(e, data){
        this.setState({data})
        let city = this.state.city ? this.state.city : 'any';
        let blood_group = this.state.blood_group ? this.state.blood_group : 'any';
        if(city != 'any' || blood_group !='any') {
            let post = {'city': city, 'blood_group':blood_group}
            this.props.fetchDonors(1, post).then((response) => {
                this.props.history.push(ROUTE_PATH.BloodDonors+city+'/'+blood_group);
            });
        }
    }
    handleChange(e, {name, value}){
        this.setState({
            [name]: value
        })

    }

    render() {

        //console.log(this.props.donors_list);
        const defaultPage = this.state.defaultPage;
        const city= this.state.city;
        const blood_group = this.state.blood_group;
        const total = this.state.total_rec;

        const cities = [ { key: 'islamabad', value: 'islamabad', text: 'Islamabad'}, {key: 'rawalpindi', value: 'rawalpindi', text: 'Rawalpindi'}, {key: 'lahore', value: 'lahore', text: 'Lahore' } ]
        const blood_groups = [ { key: 'A+', value: 'A+', text: 'A+' }, {key: 'B+', value: 'B+', text: 'B+'}, {key: 'AB+', value: 'AB+', text: 'AB+'} ]

        return (
            <Container>
                <Grid >
                    <Grid.Row key="1">
                        <Grid.Column width={16}>
                            <Form onSubmit={this.searchDonors}>
                                <Form.Group widths='equal'>
                                    <Form.Select
                                        name="city"
                                        fluid  search
                                        options={cities}
                                        placeholder='City'
                                        onChange = {this.handleChange}
                                        defaultValue={city}
                                    />
                                    <Form.Select
                                        name="blood_group"
                                        fluid  search
                                        options={blood_groups}
                                        placeholder='Blood Group'
                                        onChange = {this.handleChange}
                                        defaultValue={blood_group}
                                    />
                                    <Form.Button>Submit</Form.Button>
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row key="2">
                        <Grid.Column width={16}>
                            <Placeholder if_show={this.props.donor_fetching}/>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Card.Group itemsPerRow={3}>

                                {this.renderDonors()}
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered column={2}>
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
        donors_list: state.users.FETCH_DONORS,
        donor_fetching: state.users.donor_fetching,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDonors:function(page=1, data = {}){
            return dispatch(fetchDonors(page, data))
        }
    }
}
BloodDonors = connect(mapStateToProps, mapDispatchToProps)(BloodDonors);
BloodDonors = withRouter(BloodDonors);
export default BloodDonors;
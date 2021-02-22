import React, {Component} from 'react';
import {Button, Checkbox, Container, Form, Grid, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {authenticateUser} from "../../store/auth/actions";
import {Redirect} from "react-router-dom";
import {ROUTE_PATH} from "../../helper";
import {UpdateMyAccount} from "../../store/users/actions";

class MyAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            phone: '',
            gender: '',
            city: '',
            blood_group: '',
            password: '',
            cpassword: '',
            im_available: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.SubmitHandler = this.SubmitHandler.bind(this);
    }
    componentWillMount(){
        //this.props.DO_LOGIN();


    }
    handleChange(e, {name, value}){
        this.setState({
            [name]: value
        })
    }
    SubmitHandler(){
        let data = {
            email: this.state.phone,
            password: this.state.password,
            remember_me: this.state.remember_me

        }
        this.props.UpdateMyAccount(data).then((response) => {
            console.log(response)
        });
    }

    render() {
        if(this.props.auth.authenticated !== true) {
            return <Redirect to={ROUTE_PATH.HOME} />;
        }
        const blood_groups = [ { key: 'A+', value: 'A+', text: 'A+' }, {key: 'B+', value: 'B+', text: 'B+'}, {key: 'AB+', value: 'AB+', text: 'AB+'} ]
        return(
            <React.Fragment>

                <Container>
                    <Grid >
                        <Grid.Row key="1">
                            <Grid.Column width={16}>
                                <h2>My Account</h2>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row key="2">
                            <Grid.Column width={16}>
                                <Form onSubmit={this.SubmitHandler}>

                                    <Form.Field
                                        control={Input}
                                        label='First Name'
                                        name = "first_name"
                                        placeholder='First Name'
                                        onChange = {this.handleChange}
                                    />
                                    <Form.Field
                                        control={Input}
                                        label='Last Name'
                                        name = "last_name"
                                        placeholder='Last Name'
                                        onChange = {this.handleChange}
                                    />
                                    <Form.Field
                                        control={Input}
                                        label='Phone'
                                        name = "phone"
                                        placeholder='Phone'
                                        onChange = {this.handleChange}
                                    />
                                    <Form.Select
                                        label='Gender'
                                        name = "gender"
                                        placeholder='Gender'
                                        options={ [{key: 'male', value: 'Male', text: 'Male' }, {key:'female', value: 'Female', text: 'Female'}]  }
                                        onChange = {this.handleChange}
                                    />

                                    <Form.Field
                                        control={Checkbox}
                                        label='I am Available for donation.'
                                        name = "im_avaialable"
                                        value={"true"}
                                        onChange = {this.handleChange}
                                    />

                                    <Button type='submit'>Submit</Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        form_posting: state.users.form_posting,
        auth: state.auth,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UpdateMyAccount: function(data){
            return dispatch(UpdateMyAccount(data))
        }
    }
}

export  default  connect(mapStateToProps, mapDispatchToProps)(MyAccount);
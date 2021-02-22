import React, {Component} from 'react';
import {Button, Checkbox, Container, Form, Grid, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {authenticateUser} from "../../store/auth/actions";
import {Redirect} from "react-router-dom";
import {ROUTE_PATH} from "../../helper";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            password: '',
            remember_me: false
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
        this.props.DO_LOGIN(data).then((response) => {
            console.log(response)
        });
    }

    render() {
        if(this.props.auth.authenticated === true) {
            console.log('loggedinn');
            console.log(this.props.auth);
            //return <Redirect to={ROUTE_PATH.HOME} />;
        }
        const blood_groups = [ { key: 'A+', value: 'A+', text: 'A+' }, {key: 'B+', value: 'B+', text: 'B+'}, {key: 'AB+', value: 'AB+', text: 'AB+'} ]
        return(
            <React.Fragment>

                <Container>
                    <Grid celled>
                        <Grid.Row key="1">
                            <Grid.Column width={16}>
                                <h2>Login page</h2>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row key="2">
                            <Grid.Column width={16}>
                                <Form onSubmit={this.SubmitHandler}>

                                    <Form.Field
                                        control={Input}
                                        label='Phone'
                                        name = "phone"
                                        placeholder='Phone'
                                        onChange = {this.handleChange}
                                    />
                                    <Form.Field
                                        control={Input}
                                        type="password"
                                        label='Password'
                                        name = "password"
                                        placeholder='Password'
                                        onChange = {this.handleChange}
                                    />
                                    <Form.Field
                                        control={Checkbox}
                                        label='Remember me'
                                        name = "remember_me"
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
        do_login: state.users.DO_LOGIN,
        form_posting: state.users.form_posting,
        auth: state.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        DO_LOGIN: function(data){
            return dispatch(authenticateUser(data))
        }
    }
}

export  default  connect(mapStateToProps, mapDispatchToProps)(Login);
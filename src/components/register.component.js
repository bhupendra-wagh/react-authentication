import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";
import FlashMessage from 'react-flash-message';
import validator from 'validator';
import Login from "./login.component";
import {  Link } from "react-router-dom";


const required = value => {
    if (!value) {
        return (
            <div className="error" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return <div className="error" role="alert">
                Email is not valid!
            </div>
    }
};


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            fullname: "",
            loading: false,
            message: "",
            showMessage: false
        };
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFullname = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }

    getComponent(event) {
        return <Login />;
    }


    handleRegister = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(this.state.fullname, this.state.email, this.state.password).then(
                () => {
                    this.setState({ showMessage: true, loading: false });


                },
                error => {
                    const resError =
                        (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()

                    this.setState({
                        loading: false,
                        message: resError
                    })
                }
            )
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="main">
                <h1 className="heading-createaccount">Create an Account</h1>

                <Form
                    onSubmit={this.handleRegister}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    {
                        this.state.showMessage &&
                        <div>
                            <FlashMessage duration={5000}>
                                <div class="alert alert-success" role="alert">
                                    Registration done successfully!!!
                            </div>
                            </FlashMessage>
                        </div>
                    }

                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="fullname"
                            value={this.state.fullname}
                            onChange={this.onChangeFullname}
                            validations={[required]}
                        />
                    </div>


                    <div>
                        <label htmlFor="email">Email Address</label>
                        <Input
                            type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validations={[required, email]}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div>
                        <button
                            className="submitbtn"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign Up</span>
                        </button>
                    </div>

                    <div>



                        <p className="login-text">Already a user?
                        <Link to="/login"  > Log In</Link>
                        </p>


                    </div>




                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}


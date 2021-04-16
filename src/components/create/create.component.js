import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FlashMessage from 'react-flash-message';
import AuthService from '../../services/auth-service';
import createUser from './../../Redux/actions/createAction';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";


const CreateSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required!'),
    department: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required!'),
    email: Yup.string().email('Invalid email').required('This field is required!'),
});

const Create = (props) => {
    let history = useHistory(); 
    const [attributes, setAttributes] = useState({
        showMessage: false
    });
    return (
        <div>
            <h1>Create User</h1>

            <Formik
                initialValues={{
                    firstname: '',
                    email: '',
                    department: ''
                }}
                validationSchema={CreateSchema}
                onSubmit={(values, { resetForm }) => {
                    
                    AuthService.createUser(values.firstname, values.email,values.department).then(
                        (res) => {
                            props.handleSubmit(values);
                            resetForm();
                            console.log(props.data);
                            history.push("/profile");
                        },
                        error => {
                            const resError =
                                (error.response && error.response.data && error.response.data.message)
                                || error.message || error.toString()
                            
                                
                        }
                    )

                }}
            >
                {({ errors, touched }) => (
                    <div className="main">
                        <Form>
                            {
                                attributes.showMessage &&
                                <div>
                                    <FlashMessage duration={5000}>
                                        <div className="alert alert-success" role="alert">
                                            User created successfully!!!
                                        </div>
                                    </FlashMessage>
                                </div>
                            }

                            <div>
                                <label htmlFor="firstname">First Name</label>
                                <Field name="firstname" className="input" />
                            </div>
                            {errors.firstname && touched.firstname ? (
                                <div className="error">{errors.firstname}</div>
                            ) : null}
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <Field type="email" name="email" className="input" />

                            </div>
                            {errors.email && touched.email ? (
                                <div className="error">{errors.email}</div>
                            ) : null}
                            <div>
                                <label htmlFor="department">Department</label>
                                <Field name="department" type="text" className="input" />
                            </div>
                            {errors.department && touched.department ? <div className="error">{errors.department}</div> : null}
                            <button className="submitbtn" type="submit">Submit</button>
                        </Form>

                        
                    </div>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = state => {
    
    return {
        data: state.createReducer
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit : (data) => {
            dispatch(createUser(data));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps, 
    )(Create)

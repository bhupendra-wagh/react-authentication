import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth-service';
import FlashMessage from 'react-flash-message';
import {  Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  email: Yup.string().email('Invalid email').required('This field is required!'),
});

const Registers = () => {
    const [attributes, setAttributes] = useState({
        showMessage: false
    });

  return <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        fullname: '',
        password: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        // same shape as initial values
        
            AuthService.register(values.fullname, values.email, values.password).then(
                () => 
                {
                    console.log(AuthService.getCurrentUser());
                    setAttributes({
                        showMessage : true
                    });
                    resetForm();
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
                                    Registration done successfully!!!
                            </div>
                            </FlashMessage>
                        </div>
                    }

                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <Field name="fullname" className="input"/>
                </div>
                {errors.fullname && touched.fullname ? (
                    <div className="error">{errors.fullname}</div>
                ) : null}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <Field type="email" name="email" className="input"/>
                    
                </div>
                {errors.email && touched.email ? (
                    <div className="error">{errors.email}</div>
                ) : null}
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className="input"/>
                </div>
                {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                <button className="submitbtn" type="submit">Submit</button>
            </Form>

            <div>
                <p className="login-text">Already a user?
                    <Link to="/login"  > Log In</Link>
                </p>
            </div>
        </div> 
      )}
    </Formik>
  </div>
};

export default Registers;
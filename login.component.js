import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth-service';
import FlashMessage from 'react-flash-message';
import {  Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  email: Yup.string().email('Invalid email').required('This field is required!'),
});

const Login = () => {
  let history = useHistory(); 
  return <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { resetForm }) => {
        // same shape as initial values
        
            AuthService.login(values.email, values.password).then(
                () => 
                {
                    console.log(123);
                    
                    history.push("/profile");
                },
                error => {
                    
                    
                }
            )
      }}
    >
      {({ errors, touched }) => (
        <div className="main"> 
            <Form>
                
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
                <p className="login-text">Not have an Account?
                    <Link to="/register"  > Sign Up</Link>
                </p>
            </div>
        </div> 
      )}
    </Formik>
  </div>
};

export default Login;
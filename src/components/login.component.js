import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth-service';
import FlashMessage from 'react-flash-message';
import {  Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import setProfileInfo from '../Redux/reducers/setProfileInfoReducer';
import { connect } from 'react-redux';
import profileAction from '../Redux/actions/profileAction';

const SignupSchema = Yup.object().shape({
  
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('This field is required!'),
  email: Yup.string().email('Invalid email').required('This field is required!'),
});

const Login = (props) => {
  let history = useHistory(); 
  const onSuccess = (res) => {
    
      props.setProfile(res);
      // console.log(20)
      //dispatch(setProfileDetail.setProfileInfo(response.data.userData));

      history.push("/profile-detail");
    
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Login Failed.'
    );
  }

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
                (response) => 
                {
                    console.log(response);
                    
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

    <div className="googleBtn">             
      <GoogleLogin
        clientId="189839431423-bdevdvui20emjufbka7ja87re8id65kr.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div> 

  </div>
};

const mapDispatchToProps = (dispatch) => {
  return  {
      setProfile : (res) => {
          dispatch(profileAction(res));
      }
  }
}

export default connect(null, mapDispatchToProps)(Login);
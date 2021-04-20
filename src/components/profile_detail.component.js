import { connect } from 'react-redux';
import React from 'react';

const ProfileDetail = (props) => {
    console.log(props.userInfo);

    return (
        (props.userInfo!== null)?
             <div className="card">
                <image src={props.userInfo.imageUrl} alt={props.userInfo.name} />
                <h1>{props.userInfo.name}</h1>
                <p className="title">{props.userInfo.email}</p>
                <p>Google Id : {props.userInfo.googleId}</p>
                <p><button>Contact</button></p>
            </div>:<div>No Info found!</div>
    )
    
}

const mapStateToProps = state => {
    console.log(state);
    return {
        userInfo : (state.setProfileInfo)?state.setProfileInfo.userInfo:''
    };
};


export default connect(mapStateToProps, null)(ProfileDetail);
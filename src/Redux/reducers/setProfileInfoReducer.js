import { actions } from "react-table";
import { PROFILE_DETAIL } from "../actions/types";

const setProfileInfo = (state = null , action) => {
    switch(action.type){
        case PROFILE_DETAIL: 
            return {
                userInfo : action.payload
            }
        default : {
            return state;
        }
    }

}

export default setProfileInfo;
import { PROFILE_DETAIL } from "./types"

const setProfileDetail = (data)  => {
    
    return {
        type: PROFILE_DETAIL,
        payload:data.profileObj
    }
}

export default setProfileDetail;
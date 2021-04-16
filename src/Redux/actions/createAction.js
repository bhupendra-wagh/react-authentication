import { CREATE_USER } from "./types"

const createUser = (data) => {
    return {
        type: CREATE_USER,
        payload: data
    }
}

export default createUser
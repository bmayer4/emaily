import { FETCH_USER } from '../actions/types';

const authReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_USER:
        console.log(action.payload);
        return action.payload || false;   //axios will return empty string if logged out
        default: 
          return state;
    }
};

export default authReducer;
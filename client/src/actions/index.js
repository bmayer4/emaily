import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, REMOVE_SURVEY } from './types';


export const fetchUser = () => 
    async (dispatch, getState) => {
        const res = await axios.get('/api/current_user/');
            dispatch({
                type: FETCH_USER,
                payload: res.data
            });
    };

// export const fetchUser = () => {
//     return (dispatch, getState) => {
//         axios.get('/api/current_user/').then((res) => {
//             dispatch({
//                 type: FETCH_USER,
//                 payload: res
//             })
//         }).catch((e) => {
//             console.log('Error fetching user: ', e);
//         });
//     };
// };

export const handleToken = (token) => 
async (dispatch, getState) => {
    console.log('from action: ', token);
    const res = await axios.post('/api/stripe', token);
        dispatch({   //shortcut, since user model with credit amount is returned to anything that uses the state
            type: FETCH_USER,
            payload: res.data
        });
};


export const submitSurvey = (values) => 
    async (dispatch, getState) => {
        console.log('values: ', values);
        const res = await axios.post('/api/surveys', values);  //returns user
            dispatch({  
                type: FETCH_USER,
                payload: res.data
        });
};

export const fetchSurveys = () => 
    async (dispatch, getState) => {
        const res = await axios.get('/api/surveys');
        dispatch({
            type: FETCH_SURVEYS,
            payload: res.data
        });
};

export const removeSurvey = (id) => 
async (dispatch, getState) => {
    const res = await axios.delete(`/api/surveys/${id}`);
    dispatch({
        type: REMOVE_SURVEY,
        payload: res.data
    });
};
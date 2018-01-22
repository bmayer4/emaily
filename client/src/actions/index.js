import axios from 'axios';
import { FETCH_USER } from './types';


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
    const res = await axios.post('/api/stripe/', token);
        dispatch({   //shortcut, since user model with credit amount is returned to anything that uses the state
            type: FETCH_USER,
            payload: res.data
        });
};

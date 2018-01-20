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
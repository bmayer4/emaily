import { FETCH_SURVEYS, REMOVE_SURVEY } from '../actions/types';

const surveysReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      console.log('Surveys fetched: ', action.payload.surveys);
      return action.payload.surveys;
    case REMOVE_SURVEY:
      return state.filter(({_id}) => _id !== action.payload.survey._id )
    default:
      return state;
  }
};

export default surveysReducer;

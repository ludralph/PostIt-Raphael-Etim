import {combineReducers} from 'redux';
import signUp from './signUpReducer';

const rootReducer = combineReducers({
    signUp  //short hand property name
});

export default rootReducer;
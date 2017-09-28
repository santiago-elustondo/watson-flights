import {combineReducers} from 'redux';
import conversationReducer from './conversationReducer';

const RootReducer = combineReducers({
  conversation: conversationReducer
});

export default RootReducer;

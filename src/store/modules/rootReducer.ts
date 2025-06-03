import { combineReducers } from 'redux';

import User from './User/index'
import Users from './Users/index'
import Modals from './Modals/index'


export default combineReducers({
  User,
  Users,
  Modals
  
});

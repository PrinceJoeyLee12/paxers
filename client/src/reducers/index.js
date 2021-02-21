import { combineReducers } from 'redux';
import auth from './auth';
import event from './event';
import activity from './activity';
import menuItems from './menuItems';
import alert from './alert';
import form from './form';
import registrantsInfo from './registrantsInfo';
import utils from './utils';

export default combineReducers({
  auth,
  event,
  activity,
  menuItems,
  alert,
  form,
  registrantsInfo,
  utils,
});

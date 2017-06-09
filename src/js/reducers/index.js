import {combineReducers} from "redux";

import calendar from "./calendar";
import eventsCalendar from './events';
import trainers from './trainers';

export default combineReducers({calendar, eventsCalendar, trainers});

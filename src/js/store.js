import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { dataLoadingMiddleware } from './request'

import reducer from "./reducers/index";

const middleware = applyMiddleware(promise(), thunk, logger(), dataLoadingMiddleware);
export default createStore(reducer, middleware);

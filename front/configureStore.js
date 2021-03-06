import {createWrapper} from "next-redux-wrapper"
import {createStore,compose,applyMiddleware} from "redux"
import reducer from "../reducers/index"
import {composeWithDevTools} from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = ({dispatch,getState})=> (next)=>(action)=>{
    console.log(action);
    return next(action);
}

const configureStore = () =>{
    const middlewares = [thunkMiddleware,loggerMiddleware];
    const enhancer = process.env.NODE_ENV === "production"?
    compose(applyMiddleware(...middlewares))
    :composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer,enhancer);
    return store;
}

const wrapper = createWrapper(configureStore,{
    debug:process.env.NODE_ENV === "development"
});

export default wrapper;
import {produce} from "immer"
import shortId from "shortid"
export const initialState = {
    logInLoading:false,
    logInDone:false,
    logInError:false,

    logOutLoading:false,
    logOutDone:false,
    logOutError:null,

    signUpLoading:false,
    signUpDone:false,
    signUpFailure:null,

    changeNicknameLoading:false,
    changeNicknameDone:false,
    changeNicknameFailure:null,

    followLoading:false,
    followDone:false,
    followFailure:null,

    unfollowLoading:false,
    unfollowDone:false,
    unfollowFailure:null,

    me:null,
    signUpData:{},
    loginData:{},

}

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";


export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";


const dummyUser = (data)=>({
    ...data,
    nickname:"foxboxr",
    id:1,
    Posts:[],
    Followings:[],
    Followers:[],
})

export const loginRequestAction = (data)=>{
    return {
        type:LOG_IN_REQUEST,
        data,
    }
}
export const logoutRequestAction = ()=>{
    return {type:LOG_OUT_REQUEST};
}
export const loginAction = (data)=>({
    type:"LOG_IN",
    data
})
export const logoutAction = (dta)=>({
    type:"LOG_OUT",
})

const reducer = (state=initialState,action)=> produce(state,(draft)=>{
    switch(action.type){
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInDone = true;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutDone = false;
                draft.logOutLoading = true;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutDone = true;
                draft.logOutLoading = false;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpDone = false;
                draft.signUpLoading = true;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpDone = true;
                draft.signUpLoading = false;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpLoading = action.error;
                break; 
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameDone = false;
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameDone = true;
                draft.changeNicknamLoading = false;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case ADD_POST_TO_ME://{data:id}
            console.log(action.data);
                draft.me.Posts.unshift({id:action.data}); 
                break;
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter(post=>post.id !== action.data);
                break;
            case FOLLOW_REQUEST:
                draft.followDone = false;
                draft.followLoading = true;
                draft.followError = null;
                break;
            case FOLLOW_SUCCESS:
                draft.followDone = true;
                draft.followLoading = false;
                draft.me.Followings.push({id:action.data});
                break;
            case FOLLOW_FAILURE:
                console.log(action.error);
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowDone = false;
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowDone = true;
                draft.unfollowLoading = false;
                draft.me.Followings = draft.me.Followings.filter(v=>v.id !== action.data);
                break;
            case UNFOLLOW_FAILURE:
                console.log(action.error);
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;
        default :
             break;
    }
})

export default reducer;
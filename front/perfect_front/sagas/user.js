import {all,fork,call, take,takeEvery,takeLatest, put,throttle,delay} from "redux-saga/effects"
import {
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
    LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
    FOLLOW_REQUEST,FOLLOW_SUCCESS,FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,UNFOLLOW_SUCCESS,UNFOLLOW_FAILURE,
    
} from "../reducers/user"


function logInApi(data,extra){
    return axios.post("/api/login",data);
}

function* logIn(action){//{email,pw}
    try{
        // const result  = yield call(logInApi,action.data,"extra");//<= 1번째 인자 함수에 인자를 넣을려면 두번째,세번째..에 추가 한다.
        delay(4000);
        yield put({
            type:LOG_IN_SUCCESS,
            data:{...action.data,nickname:"nickname_sua"}
        });
    } catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            data:err.response.data
        })
    }
}

function logOutApi(){
    return axios.post("api/logout");
}

function* logOut(){
    try{
        // const result  = yield call(logOutApi);
        delay(1000);
        yield put({
            type:LOG_OUT_SUCCESS,
        });
    } catch(err){
        yield put({
            type:LOG_OUT_FAILURE,
            error:err
        })
    }
}

function signUpApi(data){
    return axios.post("/api/signup",data);
}

function* signUp(action){
    try{
        delay(4000);
        yield put({
            type:SIGN_UP_SUCCESS,
            data:{...action.data,nickname:"nickname_sua"}
        });
    } catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            error:err
        })
    }
}

function followApi(data){
    return axios.post("/api/follow",data);
}

function* follow(action){
    try{
        delay(4000);
        yield put({
            type:FOLLOW_SUCCESS,
            data:action.data
        });
    } catch(err){
        yield put({
            type:FOLLOW_FAILURE,
            error:err
        })
    }
}

function unfollowApi(data){
    return axios.post("/api/follow",data);
}

function* unfollow(action){
    try{
        delay(4000);
        yield put({
            type:UNFOLLOW_SUCCESS,
           data:action.data
        });
    } catch(err){
        yield put({
            type:UNFOLLOW_FAILURE,
            error:err
        })
    }
}

function* watchLogIn(){//이벤트 리스너 같은 역할을 수행 , 무한while을 사용하여 while이 없을 때는 한번만 이벤트리슨이 되고 사라지지만 , 계속 사용할수있음
    yield takeLatest(LOG_IN_REQUEST,logIn);
}

function* watchLogOut(){//무한 while 대신 tekeEvery 를 사용할수있음
    yield takeLatest(LOG_OUT_REQUEST,logOut);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signUp);
}

function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST,follow);
}

function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST,unfollow);
}

export default function* userSaga(){
    yield all([
        call(watchLogIn),
        call(watchLogOut),
        call(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}
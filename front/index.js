import {all,fork,call, take,takeEvery,takeLatest, put,throttle,delay} from "redux-saga/effects"
import axios from "axios"
//  규칙 : effcts 앞에는 yield란는 예약어가 들어감 (동작이 잘되는지 보장받기 위해) generator 함수 특성상 yield에서 멈추니깐 순간순간을 확인할수있다.

function logInApi(data,extra){
    console.log(extra);
    return axios.post("/api/login",data);
}

function* logIn(action){
    try{
        // const result  = yield call(logInApi,action.data,"extra");//<= 1번째 인자 함수에 인자를 넣을려면 두번째,세번째..에 추가 한다.
        delay(1000);
        yield put({
            type:"LOG_IN_SUCCESS",
            data:result.data
        });
    } catch(err){
        yield put({
            type:"LOG_IN_FAILURE",
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
            type:"LOG_OUT_SUCCESS",
            data:result.data
        });
    } catch(err){
        yield put({
            type:"LOG_OUT_FAILURE",
            data:err.response.data
        })
    }
}

function addPostApi(data){
    return axios.post("api/post",data);
}

function* addPost(action){
    try{
        // const result  = yield call(addPostApi,action.data);
        delay(1000);
        yield put({
            type:"ADD_POST_SUCCESS",
            data:result.data
        });
    } catch(err){
        yield put({
            type:"ADD_POST_FAILURE",
            data:err.response.data
        })
    }
}


function* watchLogin(){//이벤트 리스너 같은 역할을 수행 , 무한while을 사용하여 while이 없을 때는 한번만 이벤트리슨이 되고 사라지지만 , 계속 사용할수있음
    while(true) yield take("LOG_IN_REQUEST",logIn);
}

function* watchLogOut(){//무한 while 대신 tekeEvery 를 사용할수있음
    yield takeEvery("LOG_OUT_REQUEST",logOut);
}

function* watchAddPost(){
    yield takeLatest("ADD_POST_REQUEST",addPost,2000);
}
//put === dispatch
// take : take(action.type,function) take 첫번째 인자인 타입이 실행되면 두번째 인자인 함수가 실행 된다.
//  take가 들어감 함수는 all 이라는 함수의 인자로 들어가 등록을 한다.
//takeEvery : take 함수는 1번만 yield 하면 끝나지만 takeEvery 는 끝나지 않고 계속 사용할수있다.
//takeLatest : takeLatest함수는 제일 마지막 클릭 이벤트만 처리한다. 서버에는 요청을 클릭횟수대로 하지만 응답을 마직막것만 받는다.
//throttle : throttle(type,func,time); 요청을 하면 쿨타임이 생김
//all : all([]) all 인자로 들어가는 배열의 값들을 실행시킨다. 
//fork,call : fork(f) call(f) 인자로 들어가는 f함수를 실행시킨다.
// fork : 비동기 다음코드 넘김 , call : 동기 결과를 기다림

export default function* rootsaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}
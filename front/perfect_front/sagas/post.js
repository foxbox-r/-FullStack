import {all,fork,call, take,takeEvery,takeLatest, put,throttle,delay} from "redux-saga/effects"

import {
    ADD_POST_SUCCESS,ADD_POST_REQUEST,ADD_POST_FAILURE,
    ADD_COMMENT_SUCCESS,ADD_COMMENT_REQUEST,ADD_COMMENT_FAILURE,
    REMOVE_POST_SUCCESS,REMOVE_POST_REQUEST,REMOVE_POST_FAILURE,
    LOAD_POST_SUCCESS,LOAD_POST_REQUEST,LOAD_POST_FAILURE,
    generateDummyPost,
} from "../reducers/post"

import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user"

import shortId, { generate } from "shortid"


function addPostApi(data){
    return axios.post("api/post",data);
}


function* addPost(action){//{data:text}
    try{
        delay(1000);
        const id = shortId.generate();
        yield put({
            type:ADD_POST_SUCCESS,
            id,
            data:action.data
        });
        yield put({
            type:ADD_POST_TO_ME,
            data:id
        });
    } catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            error:err
        })
    }
}

function addCommentApi(data){
    return axios.Comment("api/Comment",data);
}


function* addComment(action){// content,postId,userId
    try{
        // const result  = yield call(addCommentApi,action.data);
        delay(1000);
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:action.data
        });
    } catch(err){
        yield put({
            type:ADD_COMMENT_FAILURE,
            data:err.response.data
        })
    }
}


function removePostApi(data){
    return axios.post("api/post",data);
}


function* removePost(action){//{data:id}
    try{
        delay(1000);

        yield put({
            type:REMOVE_POST_SUCCESS,
            data:action.data
        });
        yield put({
            type:REMOVE_POST_OF_ME,
            data:action.data
        });
    } catch(err){
        yield put({
            type:REMOVE_POST_FAILURE,
            error:err
        })
    }
}


function loadPostsApi(data){
    return axios.post("api/posts",data);
}


function* loadPosts(action){//{}
    const data = generateDummyPost(10);
    try{
        delay(1000);

        yield put({
            type:LOAD_POST_SUCCESS,
            data,
        });
    } catch(err){
        console.log(err);
        yield put({
            type:LOAD_POST_FAILURE,
            error:err
        })
    }
}


function* watchAddComment(){// content,postId,userId
    yield takeLatest(ADD_COMMENT_REQUEST,addComment)
}

function* watchRemovePost(){
    console.log("remove watching");
    yield takeLatest(REMOVE_POST_REQUEST,removePost)
}

function* watchAddPost(){//{data:content}
    yield takeLatest(ADD_POST_REQUEST,addPost);
}

function* watchLoadPosts(){//{data:content}
    yield throttle(3000,LOAD_POST_REQUEST,loadPosts);
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPosts),
    ])
}
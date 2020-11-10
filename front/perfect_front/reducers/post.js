import shortId from "shortid"
import {produce} from "immer"
import faker from "faker"

export const initialState = {
    mainPosts:[],
    imagePaths:[],
    postAdded:false,

    addPostLoadig:false,
    addPostDone:false,
    addPostError:null,

    addCommentLoadig:false,
    addCommentDone:false,
    addCommentError:null,

    removeCommentLoadig:false,
    removeCommentDone:false,
    removeCommentError:null,

    loadPostLoading:false,
    loadPostDone:false,
    loadPostFailure:null,
    hasMorePosts : true,
}

function getRandomImageSrc(){
    const length = Math.ceil(Math.random()*3)
    let arr = [];
    for(let i=0;i<length;i++)arr.push({src:faker.image.image()});
    console.log(arr);
    return arr;
}

export const generateDummyPost = number => Array(number).fill().map((v,i)=>({
    id:shortId.generate(),
    User:{
        id:shortId.generate(),
        nickname:faker.name.findName()
    },
    content:faker.lorem.paragraph(),
    Images:getRandomImageSrc(),
    Comments:[{
        User:{
            id:shortId.generate(),
            nickname:faker.name.findName(),
        },
        content:faker.lorem.sentence(),
    }]
}))

export const  ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const  ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const  ADD_POST_FAILURE = "ADD_POST_FAILURE"

export const  REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST"
export const  REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS"
export const  REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE"

export const  ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const  ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const  ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"

export const  LOAD_POST_REQUEST = "LOAD_POST_REQUEST"
export const  LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS"
export const  LOAD_POST_FAILURE = "LOAD_POST_FAILURE"

export const addPost = data =>{//{text:text}
    return {
        type:ADD_POST_REQUEST,
        data
    }
}

export const addComment =data => ({
    type:ADD_COMMENT_REQUEST,
    data
})



const dummyPost = (action)=>({//{id:id,data:content}
    id:action.id,
    User:{
        id:1,
        nickname:"foxboxr",
    },
    content:action.data,
    Images:getRandomImageSrc(),
    Comments:[]
});


const dummyComment = (data)=>({
    id:shortId.generate(),
    content:data,
    User:{
        id:1,
        nickname:"rsua"
    }
});

const reducer = (state=initialState,action)=> produce(state,(draft)=>{
    switch(action.type){
        case ADD_POST_REQUEST:
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS://{id:id,data:content}
            draft.mainPosts.unshift(dummyPost(action));
            draft.addPostLoading = false;
            draft.addPostDone = true;
            break;
        case ADD_POST_FAILURE:
            console.log(action.error);
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;
        case REMOVE_POST_SUCCESS:
            draft.mainPosts = draft.mainPosts.filter(post=>post.id !== action.data);
            draft.removePostLoading = false;
            draft.removePostDone = true;
            break;
        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;
         case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS:
            const post = draft.mainPosts.find(post=>post.id === action.data.postId);
            post.Comments.unshift(dummyComment(action.data.content));
            draft.addCommentLoading=false;
            draft.addCommentDone = true;
            break;
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addComentError = action.error;
            break;
        case LOAD_POST_REQUEST:
            draft.loadPostDone = false;
            draft.loadPostLoading = true;
            draft.loadPostError = null;
            break;
        case LOAD_POST_SUCCESS:
            console.dir(action.data);
            draft.loadPostDone = true;
            draft.loadPostLoading = false;
            draft.mainPosts = action.data.concat(draft.mainPosts);
            draft.hasMorePosts = draft.mainPosts.length<50;
            break;
        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;
        default :
            break;
    }
});

export default reducer;
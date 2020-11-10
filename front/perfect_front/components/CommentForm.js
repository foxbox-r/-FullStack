import React,{useCallback,useEffect,useState} from 'react';
import {Form,Input,Button} from "antd";
import useInput from "../hooks/useInput";
import {useSelector,useDispatch} from "react-redux";
import {ADD_COMMENT_REQUEST} from "../reducers/post"

function CommentForm({post}){
    const dispatch = useDispatch();

    const id = useSelector(state=>state.user.me?.id);
    const {addCommentDone} = useSelector(state=>state.post);

    const [commentText,onChangeCommentText,setCommentText] = useInput();
    
    useEffect(()=>{
        if(addCommentDone){
            setCommentText("");
        }
    },[addCommentDone])

    const onSubmitComment = useCallback(()=>{
        console.log(post.id,commentText);

        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                content:commentText,
                postId:post.id,
                userId:id
            }
        })

    },[commentText,id])

    return (
        <div>
            <Form onFinish={onSubmitComment}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button type="primary" htmlType="submit">삐약</Button>
            </Form>
        </div>
    )
}

export default CommentForm;
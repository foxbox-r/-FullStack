import React,{useCallback,useState} from 'react';
import {Form,Input,Button} from "antd";
import useInput from "../hooks/useInput";
import {useSelector} from "react-redux";

function CommentForm({post}){
    const id = useSelector(state=>state.user.me?.id);
    const [commentText,onChangeCommentText] = useInput();
    const onSubmitComment = useCallback(()=>{
        console.log(post.id,commentText);
    },[commentText])

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
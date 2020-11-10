import React,{useState,useCallback,useRef, useEffect} from 'react';
import {Form, Input,Button} from "antd"
import {useSelector,useDispatch} from "react-redux"
import {addPost} from "../reducers/post"
import useInput from "../hooks/useInput"

function PostForm(){
    const dispatch = useDispatch();
    const {imagePaths,addPostDone} = useSelector(state=>state.post);
    const {me} = useSelector(state=>state.user);
    const [text,onChangeText,setText] = useInput();
    
    useEffect(()=>{
        if(addPostDone){
            setText("");
        }
    },[addPostDone]);

    const onSubmit = useCallback(()=>{
        dispatch(addPost(text));
    },[text])

    const imageInput = useRef();

    const onClickImageUpload = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);

    return (
        <Form style={{margin:"10px 0 20 px"}} onFinish={onSubmit}>
            <Input.TextArea 
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="insert."
            />
            <div>
                <input type="file" ref={imageInput}  multiple hidden />
                <Button onClick={onClickImageUpload}>upload img</Button>
                <Button type="primary" style={{float:"right"}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v,i)=>(
                    <div key={v+i} style={{display:"inline-block"}}>
                        <img src={v} style={{width:"200px"}} alt={v} />
                        <div>
                            <Button>
                                remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )
}

export default PostForm;
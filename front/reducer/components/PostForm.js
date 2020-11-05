import React,{useState,useCallback,useRef} from 'react';
import {Form, Input,Button} from "antd"
import {useSelector,useDispatch} from "react-redux"
import {addPost} from "../reducers/post"

function PostForm(){
    const dispatch = useDispatch();
    const {imagePaths} = useSelector(state=>state.post);
    const [text,setText] = useState("");
    const onChangeText = e =>{
        setText(e.target.value);
    }
    const onSubmit = useCallback(()=>{
        dispatch(addPost);
        setText("");
    },[])

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
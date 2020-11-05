import React,{useState,useRef,useMemo,useCallback} from 'react';
import {Form,Button} from "antd"
import Link from "next/Link"
import styled from "styled-components"
import {useDispatch} from "react-redux"
import {loginAction} from "../reducers/user"

const ButtonWrapper = styled.div`
    margin-top:20px;
`

const useInput = ()=>{
    const [value,setValue] = useState("");
    const onChange = e=>setValue(e.target.value);
    const ref = useRef();
    return {value,onChange,ref};
}

function LogginForm({setIsLoggedIn}){
    const dispatch = useDispatch();
    const FormStyle = useMemo(()=>({marginTop:10,padding:14}),[])

    const idInput = useInput();
    const pwInput = useInput();

    const onSubmitForm = useCallback(()=>{
        dispatch(loginAction({id:4}));
        console.log(idInput.value,pwInput.value);
    },[idInput.value,pwInput.value])

    return (
        <Form onFinish={onSubmitForm} style={FormStyle}>
            <div>
                <label htmlFor="user-id">아이디</label><br/>
                <input name="user-id" type="text" {...idInput} required/>
            </div>
            
            <div>
                <label htmlFor="user-pw">비밀번호</label><br/>
                <input name="user-pw" type="password" {...pwInput} required/>
            </div>

            <ButtonWrapper>
                <Button htmlType="submit" type="primary">login</Button>
                <Link href="/Signup">
                    <a>
                        <Button>signup</Button>
                    </a>
                </Link>
            </ButtonWrapper>

        </Form>
    )
}

export default LogginForm;
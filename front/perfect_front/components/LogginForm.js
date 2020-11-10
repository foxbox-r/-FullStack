import React,{useState,useRef,useMemo,useCallback} from 'react';
import {Form,Button} from "antd"
import Link from "next/Link"
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import {loginRequestAction} from "../reducers/user"

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
    const {logInLoading} = useSelector(state=>state.user);

    const FormStyle = useMemo(()=>({marginTop:10,padding:14}),[])

    const emailInput = useInput();
    const pwInput = useInput();

    const onSubmitForm = useCallback(()=>{
        const email = emailInput.value;
        const pw = pwInput.value;
        dispatch(loginRequestAction({email,pw}));
    },[emailInput.value,pwInput.value])

    return (
        <Form onFinish={onSubmitForm} style={FormStyle}>
            <div>
                <label htmlFor="user-email">이메일</label><br/>
                <br/>
                <input name="user-email" type="email" {...emailInput} required/>
            </div>
            
            <div>
                <label htmlFor="user-pw">비밀번호</label><br/>
                <input name="user-pw" type="password" {...pwInput} required/>
            </div>

            <ButtonWrapper>
                <Button htmlType="submit" loading={logInLoading} type="primary">login</Button>
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
import React,{useCallback,useState} from 'react';
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import {Form,Input,Button,Checkbox} from "antd"
import styled from "styled-components"

const ErrorMsg = styled.p`
    margin-top:3px;
    color:red;
    font-size:10px;
`
const SuccessMsg = styled.p`
    margin-top:3px;
    color:#55ff55;
    font-size:10px;
`

const useInput = ()=> {
    const [value,setValue] = useState("");
    const onChange = useCallback((e)=>{
        setValue(e.target.value);
    },[]);

    return {value,onChange};
}

function signup(){

    const [pwError,setPwError] = useState(false);
    const [agree,setAgree] = useState(false);

    const nickNameInput = useInput();
    const idInput = useInput();
    const pwInput = useInput();
    const checkPwInput = useInput();

    const onCheckPw = useCallback((e)=>{
        const insertedData = e.target.value;
        console.log(pwInput.value , insertedData)
        checkPwInput.onChange(e);
        if(pwInput.value === insertedData){
             setPwError(false);
            }
        else{
            setPwError(true);    
        } 
    },[pwInput.value,checkPwInput.value]);

    const onSubmitForm = useCallback(()=>{
        console.log(nickNameInput,idInput,pwInput);
    },[nickNameInput.value,idInput.value,pwInput.value])

    return (
        <>
        <Head>
            <title>sigup | ndoeBird</title>
        </Head>
        <AppLayout>
            <Form onFinish={onSubmitForm}>
                <div>
                    <label htmlFor="user-nickname">닉네임</label><br/>
                    <Input required {...nickNameInput}/>
                </div>
                <div>
                    <label htmlFor="user-id">아이디</label><br/>
                    <Input required {...idInput}/>
                </div>
                <div>
                    <label htmlFor="user-pw">비밀번호</label><br/>
                    <Input required {...pwInput}/>
                </div>    
                <div>
                    <label htmlFor="user-pw-check">비밀번호 확인</label><br/>
                    <Input required onChange={onCheckPw} value={checkPwInput.value}/>
                    {pwError&&<ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
                </div>              

                <div>
                    <Checkbox checked={agree} onChange={()=>setAgree(!agree)}>
                        모든 약관 동의
                    </Checkbox>
                    {!agree && <ErrorMsg>회원가입을 할려면 동의해야 합니다.</ErrorMsg>}
                </div>

                <div>
                    <Button type="primary" htmlType="submit">sign up</Button>
                </div>

            </Form>
        </AppLayout>
        </>
    )
}

export default signup;
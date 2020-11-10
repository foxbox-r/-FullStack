import React,{useCallback,useState} from 'react';
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import {Form,Input,Button,Checkbox} from "antd"
import styled from "styled-components"
import { SIGN_UP_REQUEST } from '../reducers/user';
import {useDispatch,useSelector} from "react-redux"

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
    const dispatch = useDispatch();
    const {signUpLoading} = useSelector(state=>state.user);

    const [pwError,setPwError] = useState(false);
    const [agree,setAgree] = useState(false);

    const nickNameInput = useInput();
    const emailInput = useInput();
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
        const email = emailInput.value;
        const nickname = nickNameInput.value;
        const pw = pwInput.value;
        console.log("state",agree,pwError);
        if(agree && !pwError){
            console.log("good",nickNameInput,emailInput,pwInput);
            dispatch({
                type:SIGN_UP_REQUEST,
                data:{ email,nickname,pw }
            });
        } else console.log("check again");
    },[nickNameInput.value,emailInput.value,pwInput.value,agree,pwError])

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
                    <label htmlFor="user-id">이메일</label><br/>
                    <Input type="email" required {...emailInput}/>
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
                    <Button loading={signUpLoading} type="primary" htmlType="submit">sign up</Button>
                </div>

            </Form>
        </AppLayout>
        </>
    )
}

export default signup;
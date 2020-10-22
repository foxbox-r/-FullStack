import React,{useCallback,useState} from "react"
import AppLayout from "../components/AppLayout"
import Head from "next/head"
import {Form,Input,Button,Checkbox} from "antd"
import useInput from "../hooks/useInput"
import styled from "styled-components"

const ErrorMsg = styled.div`
    color:red;
`


const Signup = ()=>{
    const [id,onChangeId] = useInput();
    const [nickname,onChangeNickname] = useInput();
    const [pw,onChangePw] = useInput();

    const [pwCheck,setPwCheck] = useState("");
    const [pwCheckError,setPwCheckError] = useState(false);

    const onChangePwCheck = useCallback((e)=>{
        const value = e.target.value;
        setPwCheck(value);
        console.log(pw,value,"=>",pw!==value);
        setPwCheckError(value !== pw);
    },[pw,pwCheck]);
    
    const [term,setTerm] = useState(false);
    const [termError,setTermError] = useState(false);

    const onChangeTerm = useCallback((e)=>{
        setTerm(e.target.checked);
        console.log(e.target.checked);
        setTermError(false);
    },[])

    const onSubmit = useCallback(()=>{
        if(pw !== pwCheck){
            return setPwCheckError(true);
        }
        if(!term){
            console.log("=>",term);
            return setTermError(true);
        }
        console.log("onSubmit",id,nickname,pw);
    },[pw,id,pwCheck,term]);

    return (
    <>
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br/>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input type="password" name="user-password" value={pw} required onChange={onChangePw} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br/>
                    <Input type="password" name="user-password-check" value={pwCheck} required onChange={onChangePwCheck} />
                    {pwCheckError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>foxboxr 의 말을 잘 들을 것에 동의합니다.</Checkbox>
                    {termError && <ErrorMsg>약관에 동의해라</ErrorMsg>}
                </div>
                <div style={{marginTop:10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    </>
    )
}

export default Signup;
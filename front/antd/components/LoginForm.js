import React,{useState,useCallback,useMemo} from 'react';
import Link from "next/Link"
import {Form,Input,Button} from "antd"
import styled from "styled-components"
import useInput from "../hooks/useInput"

const ButtonWrapper = styled.div`
    margin-top:10px;
`

const FormWrapper = styled(Form)`
    padding:10px;   
`

// hooks 함수형 컴포넌트는 값이 바뀌면 함수가 다시 실행된다.
//단 useCallback(함수 재정의),useMemo(함수 재실행) 를 사용하여 depecndences 에 해당이 안되면 
//그 부분은 무시됨
//렌더링 되는 부분은 useCallback,useMemo를 안쓴 값,함수들과
//리턴 부분에서 값이 전의 컴포넌트와 비교했을 때 다른 부분을 리렌더링 됨
//css 리렌더링 방지 스타일드컴포넌트사용 또는 useMemo 사용

function LoginForm({setIsLoggedIn}){
    const [idValue,onChangeId] = useInput();
    const [pwValue,onChangePw] = useInput(); 
    const style = useMemo(()=>({marginTop:10}),[])
    const onSubmitForm = useCallback(()=>{
        setIsLoggedIn(true);
    },[idValue,pwValue]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <input name="user-id" value={idValue} onChange={onChangeId} required/>
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
                <br />
                <input 
                    type="password" 
                    name="user-password" 
                    value={pwValue} 
                    onChange={onChangePw} 
                    required
                />
            </div>
            {/* <div style={style}> */}
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/Signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginForm;
import React,{useMemo} from 'react';
import {Form,Input} from "antd"

function NicknameEditForm(){
    const style = useMemo(()=>({
        border:"1px solid black",
    }));
    return (
        <Form style={style}>
            <Input.Search addonBefore="닉네임" enterButton="수정"/>
        </Form>
    )
}

export default NicknameEditForm;
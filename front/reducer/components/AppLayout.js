import React,{useCallback,useMemo,useState} from 'react';
import Link from "next/Link"
import {Menu,Input,Row,Col} from "antd"
import {MailOutlined} from "@ant-design/icons"
const {SubMenu}  = Menu;
const {Search} = Input;
import UserProfile from "../components/UserProfile"
import LogginForm from "../components/LogginForm"
import {useSelector} from "react-redux"

function AppLayout({children}){
    const {isLoggedIn}  = useSelector(state=>state.user);
    const inputStyle = useMemo(()=>{
        return {verticalAlign:"middle"};
    },[]);

    return (
        <div>
            <Menu
                mode="horizontal"
            >
                <Menu.Item key="1">
                    <Link href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/Profile"><a>Profile</a></Link>
                </Menu.Item >
                <Menu.Item key="4">
                    <Search style={inputStyle} placeholder="input search text" enterButton />
                </Menu.Item >
                <Menu.Item key="3">
                    <Link href="/Signup"><a>Signup</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter="4">
                <Col xs={24} md={6}>
                    {isLoggedIn?<UserProfile />:<LogginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/foxbox-r" target="_blank">foxboxr</a>
                </Col>
            </Row>
        </div>
    )
}

export default AppLayout;
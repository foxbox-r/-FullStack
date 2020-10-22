import React,{useState} from "react"
import PropTypes from "prop-types"
import Link from "next/Link"
import {Menu,Input,Row,Col} from "antd"
import styled from "styled-components"

import UserProfile from "./UserProfile"
import LoginForm from "./LoginForm"

const SearchInput = styled(Input.Search)`
    vertical-align:middle;
`

const AppLayout = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    return (
        <>
            <div>일부 공토 메뉴</div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>node bird</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/Profile"><a>profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                {/* <Input.Search style={{verticalAlign:"middle"}} placeholder="input search text" enterButton />
                 style객체를 넣으면 {} === {} => false 기때문에 Input.Search 컴포넌트가 리렌더링 됨
                 컴포넌트에 객체를 넣으면 안됨*/}
                    <SearchInput />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/Signup"><a>signup</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} />:<LoginForm setIsLoggedIn={setIsLoggedIn}/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/foxbox-r" target="_blank" >foxboxr</a>
                </Col>
            </Row>
        </>
    )
}

AppLayout.propTypes = {
    children:PropTypes.node.isRequired,
}

export default AppLayout;
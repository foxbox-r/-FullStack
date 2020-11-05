import React,{useCallback} from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux"
import {logoutAction} from "../reducers/user"
const { Meta } = Card;

function UserProfile({setIsLoggedIn}){
    const dispatch = useDispatch();
    const onLogout = useCallback(()=>{
        dispatch(logoutAction());
    },[]);

    return (
        <Card
        style={{ width: 300 }}
        // cover={
        //   <img
        //     alt="example"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        //   />
        // }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <LogoutOutlined onClick={onLogout} key="logout" />,
        ]}
      >
        <Meta
          avatar={<Avatar>fox</Avatar>}
          title="foxbox r"
          description="hi i'm sua. "
        />
      </Card>
    )
}

export default UserProfile;
import React,{useCallback} from 'react';
import { Card, Avatar,Button } from 'antd';
import { EditOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux"
import {logoutRequestAction} from "../reducers/user"
import {useSelector} from "react-redux"
const { Meta } = Card;

function UserProfile(){
    const dispatch = useDispatch();

    const {me,logOutLoading} = useSelector(state=>state.user);

    const onLogOut = useCallback(()=>{
        dispatch(logoutRequestAction());
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
        <div key="twit">찍짹<br />{me.Posts.length}</div>,
        <div key="followings">팔로잉<br />{me.Followings.length}</div>,
        <div key="followings">팔로워<br />{me.Followers.length}</div>,
        ]}
      >
        <Meta
          avatar={<Avatar>fox</Avatar>}
          title="foxbox r"
          description="hi i'm sua. "
        />
        <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
      </Card>
    )
}

export default UserProfile;
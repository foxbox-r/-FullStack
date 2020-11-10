import React,{useEffect} from 'react';
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import NicknameEditForm from "../components/NicknameEditForm"
import FollowList  from "../components/FollowList"
import {useSelector} from "react-redux"
import Router from "next/router"
import { AreaChartOutlined } from '@ant-design/icons';

function mkInfo(title,description){
    this.title = title;
    this.description = description;
}

const followers = [new mkInfo("sua","i'm sua"),new mkInfo("rrr","i'm Rrua"),new mkInfo("foxboxr","i'm foxbox"),]
const followings = [new mkInfo("f1","good"),new mkInfo("f2","wtf"),new mkInfo("f3r","omg"),]

function profile(){

    const {me} = useSelector(state=>state.user);

    useEffect(()=>{
        if(!me) {
            Router.push("/");
        }
    },[me])

    if(!me) return null;

    return (
        <>
            <Head>
                <title>profile | nodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워"  data={me.Followers} />
            </AppLayout>
        </>
    )
}

export default profile;
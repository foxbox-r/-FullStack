import React from "react"
import AppLayout from "../components/AppLayout"
import Head from "next/head"
import NicknameEditForm from "../components/NicknameEditForm"
import FollowList from "../components/FollowList";

function mkInfo(nick){
    this.nickname = nick;
}

const Profile = ()=>{
    const followerList = [
        new mkInfo("foxboxr"),
        new mkInfo("rrr"),
        new mkInfo("rsua"),
        new mkInfo("rr_sua"),
    ];

    const followingList = [
        new mkInfo("foxboxr"),
        new mkInfo("rrr"),
        new mkInfo("rsua"),
        new mkInfo("rr_sua"),
    ] 

    return(  
    <>
        <Head>
            <title>내 프로필 | NodeBird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm />
            <FollowList header="팔로잉 목록" data={followingList} />
            <FollowList header="팔로워 목록 " data={followerList} />
        </AppLayout>
    </>
    )
}

export default  Profile;
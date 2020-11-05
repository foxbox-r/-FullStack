import React from 'react';
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import NicknameEditForm from "../components/NicknameEditForm"
import FollowList  from "../components/FollowList"

function mkInfo(title,description){
    this.title = title;
    this.description = description;
}

const followers = [new mkInfo("sua","i'm sua"),new mkInfo("rrr","i'm Rrua"),new mkInfo("foxboxr","i'm foxbox"),]
const followings = [new mkInfo("f1","good"),new mkInfo("f2","wtf"),new mkInfo("f3r","omg"),]

function profile(){

    return (
        <>
            <Head>
                <title>profile | nodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="following list" data={followings} />
                <FollowList header="follower list"  data={followers} />
            </AppLayout>
        </>
    )
}

export default profile;
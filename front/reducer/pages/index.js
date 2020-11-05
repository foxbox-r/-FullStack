import React from "react"
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import {useSelector} from "react-redux"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"

const Home = ()=> {
    const {isLoggedIn} = useSelector(state=>state.user);
    const {mainPosts} = useSelector(state=>state.post);
    return (
    <>
        <Head>
            <title>Home | nodeBird</title>
        </Head>
        <AppLayout>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post,index)=><PostCard key={post.id} post={post} />)}
        </AppLayout>
    </>
    );
}

export default Home;
import React,{useEffect} from "react"
import AppLayout from "../components/AppLayout"
import Head from "next/Head"
import {useSelector,useDispatch} from "react-redux"
import PostForm from "../components/PostForm"
import PostCard from "../components/PostCard"
import {LOAD_POST_REQUEST} from "../reducers/post"

const Home = ()=> {
    const dispatch = useDispatch();
    const {me} = useSelector(state=>state.user);
    const {mainPosts,hasMorePosts,loadPostLoading} = useSelector(state=>state.post);
    
    useEffect(()=>{
        dispatch({
            type:LOAD_POST_REQUEST,
        })
    },[]);

    useEffect(()=>{
        function onScroll(e){
            // console.log(window.scrollY,document.documentElement.clientHeight,document.documentElement.scrollHeight)
            const result = Math.floor(window.scrollY+document.documentElement.clientHeight)>=document.documentElement.scrollHeight-300;
            // console.log(Math.floor(window.scrollY+document.documentElement.clientHeight),document.documentElement.scrollHeight-300)
            // console.log(result);
            if(result && hasMorePosts && !loadPostLoading){
                dispatch({
                    type:LOAD_POST_REQUEST
                })
            }
        }
        window.addEventListener("scroll",onScroll);
        return ()=>{
            window.removeEventListener("scroll",onScroll);
        }
    },[hasMorePosts,loadPostLoading])

    return (
    <>
        <Head>
            <title>Home | nodeBird</title>
        </Head>
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post,index)=><PostCard key={post.id} post={post} />)}
        </AppLayout>
    </>
    );
}

export default Home;
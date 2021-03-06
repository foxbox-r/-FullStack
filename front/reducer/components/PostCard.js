import React,{useState,useCallback} from 'react';
import {Card,Popover,Button,Avatar,List,Comment} from "antd"
import {RetweetOutlined,HeartOutlined,MessageOutlined, EllipsisOutlined,HeartTwoTone} from "@ant-design/icons"
import {useSelector} from "react-redux"
import PostImages from "./PostImages"
import CommentForm from "./CommentForm"
import PostCardContent from "./PostCardContent"

function PostCard({post}){
    const {me} = useSelector(state=>state.user);
    const id = me?.id;

    const [linked,setLinked] = useState(false);
    const [commentFormOpened,setCommentFormOpened] = useState(false);
    // const onToggle
    console.log(post);
    const onToggleLike = useCallback(()=>{
        setLinked(prev=>!prev);
    },[])
    const onToggleComment = useCallback(()=>{
        setCommentFormOpened(prev=>!prev);
    },[])
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    linked
                    ?<HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}  />
                    :<HeartOutlined key="heart" onClick={onToggleLike}/>,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ?
                            <>
                                <Button>수정</Button>
                                <Button type="danger">삭제</Button>
                            </>:<Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List 
                        header={`${post.Comments.length} 개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item)=>(
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    )
}

export default PostCard;
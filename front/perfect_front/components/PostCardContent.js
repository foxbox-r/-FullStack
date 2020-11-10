import React from 'react';
import Link from "next/link"

function PostCardContent({postData}){
    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v,i)=>{
                if(v.match(/(#[^\s#]+)/)){
                    return <Link key={i} href={`/hashtag/${v.slice(1)}`}><a>{v}</a></Link>
                }
                
                return v;
            })}
        </div>
    )
}

export default PostCardContent;
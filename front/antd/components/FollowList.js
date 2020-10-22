import React from 'react';
import {Card, List,Button} from "antd"
import {StopOutlined} from "@ant-design/icons"

function FollowList({header,data}){

    return (
        <List 
            style={{marginBottom:20}}
            grid={{gutter:4,xs:2,md:3}}
            size="small"
            loadMore={
                <div style={{textAlign:"center"}}>
                    <Button>더 보기</Button>
                </div>
            }
            bordered
            dataSource={data}
            header={<div>{header}</div>}
            renderItem={(item)=>(
                <List.Item style={{marginTop:20}}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    )

}

export default FollowList;
import React from 'react';
import {List,Card} from "antd"

function FollowList({header,data}){

    return (
        <List
            header={header}
            grid={{gutter:16,column:3}}
            dataSource={data}
            bordered
            renderItem={item=>(
                <List.Item>
                    <Card title={item.title}>{item.description}</Card>
                </List.Item>
            )}
        >

        </List>
    )
}

export default FollowList;
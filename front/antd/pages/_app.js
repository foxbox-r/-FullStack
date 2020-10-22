import React from "react"
import "antd/dist/antd.css"
import PropTypes from "prop-types"
import Head from "next/head"

const NodeBird = ({Component})=>{
    return (
        <>
            <Head>
                <meta charset="utf-8"/>
                <title>NodeBird</title>
            </Head>
            <div>완전 공동 메뉴</div>
            <Component />
        </>
    )
}

NodeBird.propTypes = {
    Component:PropTypes.elementType.isRequired,
}

export default NodeBird;
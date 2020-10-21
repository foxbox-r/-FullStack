import React from "react"
import PropTypes from "prop-types"
import Link from "next/Link"

const AppLayout = ({children})=>{
    return (
        <div>
            <div>
                <Link href="/"><a>node bird</a></Link>
                <Link href="/Profile"><a>profile</a></Link>
                <Link href="/Signup"><a>signup</a></Link>
            </div>
            {children}
        </div>
    )
}

AppLayout.propTypes = {
    children:PropTypes.node.isRequired,
}

export default AppLayout;

import "antd/dist/antd.css"
import Head from "next/head"

import wrapper from "../store/configureStore"

const NodeBird = ({Component}) =>{
    return(
    <> 
        <Head>
            <meta charset="utf-8" />
            <title>noddBird</title>
        </Head> 
        <Component />
    </>
    );
}
export default wrapper.withRedux(NodeBird);
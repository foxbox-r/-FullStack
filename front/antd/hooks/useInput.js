import {useState,useCallback} from "react"

export default ()=>{
    const [value,setValue] = useState("");
    const onChange = useCallback((e)=>{
        setValue(e.target.value);
    },[]);
    return [value,onChange];
}
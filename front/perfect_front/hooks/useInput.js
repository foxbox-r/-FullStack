import React,{useState} from "react"
function useInput(init=""){
    const [value,setValue] = useState();
    const onChange = e=>setValue(e.target.value);

    return [value,onChange,setValue];
}

export default useInput;
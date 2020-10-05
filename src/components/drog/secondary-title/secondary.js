import React, { useState, useEffect, createRef } from 'react';
import './css.scss';


function Secondary (props) {
    const [titleValue, setTitle] = useState("二級标题");
    const [show, setShow] = useState(true);
    const inputRef = createRef();
    const inFrom = props.inFrom;

    useEffect(() => {
        if (!show) {
            inputRef.current.focus();
        }
    }, [show])
    
    return (
        <div className = "titleSec draging">
            <span className = "titleSec-left-wall"></span>
            <span className = "titleSec-edit" >
                
                {show ? 
                    <span onClick = {() => {
                        if (!inFrom) return;

                        setShow(false)
                    }}>{titleValue}</span>
                    :
                    <input 
                        ref = { inputRef }
                        value = { titleValue } 
                        placeholder = "请输入标题" 
                        className = "titleSec-input"
                        onChange = {(e) => setTitle(e.target.value)}
                        onBlur = {() => setShow(true)}></input>
                }
                
            </span>
        </div>
    );
}

export default Secondary;
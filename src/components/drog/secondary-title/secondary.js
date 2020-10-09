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
    }, [show]);

    useEffect(() => {
        if (props.inPage) {
            setTitle(props.inValue)
            return;
        }
        handlerFromValue();
    }, [inFrom])

    const confirmData = () => {
        setShow(true);
        handlerFromValue()
    }

    const handlerFromValue = (e) => {
        props.sendData({
            type: 'titleS',
            identification: props.identification,
            value: titleValue
        });
    }
    
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
                        onBlur = {() => confirmData()}></input>
                }
                
            </span>
        </div>
    );
}

export default Secondary;
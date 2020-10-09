import React, { useState, useEffect, createRef } from 'react';
import './css.scss';


function FristLevelTitle (props) {
    const [titleValue, setTitle] = useState("一級标题");
    const [show, setShow] = useState(true);
    const inputRef = createRef();
    const inFrom = props.inFrom;

    useEffect(() => {
        if (!show) {
            inputRef.current.focus();
        }
    }, [show])

    useEffect(() => {
        if (props.inPage) {
            setTitle(props.inValue)
            return;
        }
        handlerFromValue();
    }, [inFrom])

    const confirmData = (e) => {
        setShow(true);
        handlerFromValue();
    }

    const handlerFromValue = (e) => {
        props.sendData({
            type: 'titleF',
            identification: props.identification,
            value: titleValue
        });
    }
    
    return (
        <div className = "titleWrap draging">
            <span className = "titleWrap-left-wall"></span>
            <span className = "titleWrap-edit" >
                
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
                        className = "titleWrap-input"
                        onChange = {(e) => setTitle(e.target.value)}
                        onBlur = {(e) => confirmData(e)}></input>
                }
                
            </span>
        </div>
    );
}

export default FristLevelTitle;
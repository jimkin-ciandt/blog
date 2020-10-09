import React, { useState, useEffect, createRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import './css.scss';


function CodeFrom(props) {
    const inputRef = createRef();
    const inFrom = props.inFrom;

    useEffect(() => {
        if (props.inPage) {
            console.log(props)
            inputRef.current.children[0].innerText = props.inValue;
        }
        document.querySelectorAll("pre code").forEach(block => {
            try { hljs.highlightBlock(block); }
            catch (e) { console.log(e); }
        });
        if (inFrom) {
            handlerFromValue();
        }

    }, [inFrom])

    const lightCode = (e) => {
        document.querySelectorAll("pre code").forEach(block => {
            try { hljs.highlightBlock(block); }
            catch (e) { console.log(e); }
        });
        handlerFromValue();
    }

    const handlerFromValue = (e) => {
        props.sendData({
            type: 'code',
            identification: props.identification,
            value: inputRef.current.children[0].innerText
        });

    }

    return (
        <div className="code-from draging">
            <div className="code-from-wrapper">
                <pre ref={inputRef} className="code-from-textarea">
                    <code className="code-from-code" contentEditable={inFrom} onBlur={e => lightCode(e)}>
                        //code from
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default CodeFrom;
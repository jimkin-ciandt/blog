import React, {useState, useEffect, createRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import './css.scss';


function CodeFrom (props) {
    const [titleValue, setTitle] = useState("一級标题");
    const [show, setShow] = useState(true);
    const inputRef = createRef();
    const inFrom = props.inFrom;

    useEffect(() => {
        document.querySelectorAll("pre code").forEach(block => {
            try{hljs.highlightBlock(block);}
            catch(e){console.log(e);}
        });
    }, [show])

    const lightCode = (e) => {
        document.querySelectorAll("pre code").forEach(block => {
            try{hljs.highlightBlock(block);}
            catch(e){console.log(e);}
        });

        handlerFromValue();
    }

    const handlerFromValue = (e) => {
        props.sendData({
            type: 'code',
            value: inputRef.current.innerHTML
        });
    }

    return (
        <div className = "code-from draging">
            <div className = "code-from-wrapper">
                <pre ref = {inputRef} className="code-from-textarea">
                    <code className = "code-from-code"  contentEditable = {inFrom} onBlur = {e => lightCode(e)}>

                    </code>
                </pre>
            </div>
        </div>
    )
}

export default CodeFrom;
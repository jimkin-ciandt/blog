import React, { useState, useEffect, createRef } from 'react';
import FristLevelTitle from './frist-level/frist-level-title';
import Secondary from './secondary-title/secondary';
import CodeFrom from './code-from/code-from';
import PictureUpload from './pic-upload/pic-upload';
import './css.scss';

const componentList = [
    <FristLevelTitle inFrom = {false} sendData = {handlerFromValue} />,
    <Secondary inFrom = {false} sendData = {handlerFromValue} />,
    <CodeFrom inFrom = {false} sendData = {handlerFromValue} />,
    <PictureUpload inFrom = {false} sendData = {handlerFromValue} />
]

let fromValueList = [];

let insertIndex, sortKey, eleKey;
let fristInsert = false;

function _getIndex (li) {
    let i = 0;

    while (li && (li = li.previousElementSibling)) {i ++;}
    return i;
}

function _animate (target) {
    const currentIndex = Number(target.id);
    const targetRect = target.getBoundingClientRect();

    if (fristInsert) {
        let moveEle = currentIndex < insertIndex ? target.nextElementSibling : target;
        while (moveEle) {
            _css(moveEle, 50);
            moveEle = moveEle.nextElementSibling;
        }
        fristInsert = false;
        return;
    }

    currentIndex < insertIndex ? 
    _diraction(target.previousElementSibling, 0, 'bottom', targetRect.top, target) :
    _diraction(target.nextElementSibling, 50, 'top', targetRect.bottom, target);
}

function _diraction (ele, ditances, type, targetDir, target) {
    if (!ele) {
        _css(target, ditances);
        return;
    }

    const elementRect = ele.getBoundingClientRect();

    if (elementRect[type] !== targetDir) {
        _css(target, ditances);
    }

}

function _css (target, ditances) {
    target.style.transition = "transform, 300ms";
    target.style.transform = `translate3d(0, ${ditances}px, 0)`;
}

function getTargetId (node) {
    let id = node.id;
    if (!id) {
        id = getTargetId(node.parentNode);
    }
    return id;
}

function handlerFromValue (data) {
    const type = fromValueList.find(x => x.type === data.type);
    if (!type) {
        fromValueList.push(data);
        return;
    }
    type.value = data.value;
    console.log(fromValueList)
}

function DragWrapper () {
    const [fromEleList, setFromList] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const ulRef = createRef();
    let dragingEle;

    const selectComp = (e, sort) => {
        fristInsert = true;
        e.dataTransfer.setData("te", e.target.innerText);

        
        const listKey = getTargetId(e.target)
        const list = sort ? fromEleList : componentList;

        dragingEle = React.cloneElement(sort ? list[listKey].ele : list[listKey], { inFrom: true });
        
        sortKey = sort ? listKey : null;
        eleKey = sort ? list[listKey].key : null;
    }
    
    const confirmDrag = (e) => {
        e.preventDefault();
        
        const elementMach = {
            ele: dragingEle,
            key: eleKey ? eleKey : Math.floor(Date.now() * Math.random())
        }
        const list = [...fromEleList];
        if (sortKey) {
            list.splice(sortKey, 1);
            sortKey = null;
            eleKey = null;
        }
        if (insertIndex >= 0) {
            list.splice(insertIndex, 0, elementMach);
        }
        else {
            list.push(elementMach);
        }
        insertIndex = undefined;

        setFromList(list);
        setDragOver(false)
    }

    const dragToFrom = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.className.indexOf("draging") !== -1)
        {
            let li = target.parentNode;
            const targetRect = li.getBoundingClientRect();

            let pointY = e.clientY;
            let targetY = targetRect.top + targetRect.height / 2;

            insertIndex  = pointY > targetY ? _getIndex(li) + 1 : _getIndex(li);

            _animate(li);
        }
    }

    useEffect(() => {
        const children = ulRef.current.children;
        if (children.length) {
            for(let i = 0; i < children.length; i ++) {
                children[i].style.transform = "";
                children[i].style.opacity = '1';
            }
        }

    }, [fromEleList])

    return (
        <div className = "drag-element">
            <div className = "drag-element-component">
                <ul onDragStart = {(e) => selectComp(e)}>
                    {componentList.map((comp, i) => {
                        return (
                            <li id = {i} key = {i} draggable = {true}>
                                {comp}
                            </li>)
                    })}
                </ul>
            </div>

            <div className = "drag-element-from" style = { dragOver ? {borderColor: '#0099CC'} : null}>
                <ul ref = {ulRef}
                    
                    onDragOver = { e => dragToFrom(e) }
                    onDrop = { e => confirmDrag(e) }
                    onDragStart = {(e) => selectComp(e, true)}
                    // onDragLeave = { () => setDragOver(false)}
                    // onMouseLeave = { () => setDragOver(false)}
                    >
                    {
                        fromEleList.map((el, i) => {
                            if (!React.isValidElement(el.ele)) 
                                return <div key = {el.key}>Invalid Element</div>
                            return <li 
                                onDoubleClick = {(e) => {
                                    const list = [...fromEleList];
                                    list.splice(i, 1);
                                    setFromList(list)
                                }} 
                                id = {i} 
                                draggable = {true} 
                                key = {el.key}>
                                        {el.ele}
                                    </li>;
                        })
                    }
                </ul>
            </div>
            
            {/* <div>
                <button onClick = {(e) => s()}>保存数据</button>
            </div> */}
        
        </div>
    );
}

export default DragWrapper;
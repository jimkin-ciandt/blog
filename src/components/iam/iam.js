import React, { useEffect, useState } from 'react';
import Services from '../services';
import github from '../../assets/images/github.png'
import './css.scss';

const styleList = ['', 'yellow', 'red', 'purp'];

function IAM(props) {
    const [pageList, setPageList] = useState([]);

    useEffect(() => {
        try {
            const getListData = async () => {
                const result = await Services.get(`http://localhost:8000/list?pageIndex=0`)
    
                setPageList(JSON.parse(result.data));
            }
            getListData();
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="iam-wrapper">
            <div className="iam-wrapper-content">

                <div className="iam-wrapper-content-bar">
                    <div className="iam-wrapper-content-bar-user">
                        <div className="iam-wrapper-content-bar-user-title">
                            Blogger Info
                        </div>
                        <div className="iam-wrapper-content-bar-user-content">
                            <ul>
                                <li>
                                    <span className="value-type">UserName: </span>
                                    <span>金昱霖</span>
                                </li>
                                <li>
                                    <span className="value-type">Job: </span>
                                    <span>僞全棧開發工程師</span>
                                </li>
                                <li>
                                    <span className="value-type">Email: </span>
                                    <span>1328963172@qq.com</span>
                                </li>
                                <li>
                                    <span className="value-type">Age For Work: </span>
                                    <span>{new Date().getFullYear() - 2018}年啦！</span>
                                </li>
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="iam-wrapper-content-bar-stack">
                        <div className="iam-wrapper-content-bar-user-title">
                            Technology stack
                        </div>
                        <div className="iam-wrapper-content-bar-stack-tag">
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                            <p>Docker</p>
                        </div>
                    </div>
                </div>

                <div className="iam-wrapper-content-menu">
                    {
                        pageList.map((component) => {
                            return (
                                <div className="iam-wrapper-content-menu-list" key = { component.id }>
                                    <h3 onClick = {() => props.history.push({pathname: '/info', state: { component: component }})}>{component.bg_title}</h3>
                                    
                                    <div className="iam-wrapper-content-menu-list-info">
                                        <span>作者: {component.bg_author}</span>
                                        <span>发表于: {component.create_dt}</span>
                                        <span>分类: {}</span>
                                        <span>阅读量: {}</span>
                                        <span>评论数: {}</span>
                                    </div>
                                    
                                    <div className="iam-wrapper-content-menu-list-content">
                                        {component.bg_content}
                                    </div>
                                    
                                    <div className="iam-wrapper-content-menu-list-tag">
                                        {
                                            component.tag.split(',').map(x => x ? <span className = {styleList[parseInt(3*Math.random())+1]}>{x}</span> : null)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    );
}

export default IAM;
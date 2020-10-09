import React, { Fragment, useEffect, useState } from 'react';
import Services from '../services';
import FristLevelTitle from '../drog/frist-level/frist-level-title';
import Secondary from '../drog/secondary-title/secondary';
import CodeFrom from '../drog/code-from/code-from';
import PictureUpload from '../drog/pic-upload/pic-upload';
import './css.scss';

const componentList = {
    file: <PictureUpload inPage={true} />,
    titleF: <FristLevelTitle inPage={true} />,
    titleS: <Secondary inPage={true} />,
    code: <CodeFrom inPage={true} />
}

function findComponent(type, value) {
    const componentList = {
        file: <PictureUpload inPage={true} inValue={value} />,
        titleF: <FristLevelTitle inPage={true} inValue={value} />,
        titleS: <Secondary inPage={true} inValue={value} />,
        code: <CodeFrom inPage={true} inValue={value} />
    }

    return componentList[type];
}


function BlogInfo(props) {
    const [pageList, setPageList] = useState([]);
    const pageInfo = props.location.state.component;

    if (!pageInfo) {
        props.history.push('/')
    }
    useEffect(() => {
        try {
            const getListData = async () => {
                const result = await Services.get(`http://localhost:8000/info?id=${pageInfo.id}`)
                setPageList(JSON.parse(result.data));
                console.log(JSON.parse(result.data))
            }
            getListData();
        } catch (error) {
            console.log(error)
        }
    }, [])


    return (
        <div className="blog-info-wrapper">
            <h3>{pageInfo.bg_title}</h3>
            <div className="blog-info-wrapper-info">
                <span>作者: {pageInfo.bg_author}</span>
                <span>发表于: {pageInfo.create_dt}</span>
                <span>分类: {}</span>
                <span>阅读量: {}</span>
                <span>评论数: {}</span>
            </div>
            <div>
                {
                    pageList.map(comp => {
                        return (
                            <Fragment key={comp.id}>
                                {findComponent(comp.type, comp.value)}
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default BlogInfo;
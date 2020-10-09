import React, { createRef, useState, Fragment } from 'react';
import './css.scss';



function PictureUpload(props) {
    const imgRef = createRef();
    const [show, setShow] = useState(true);
    const inFrom = props.inFrom;

    const confirmUpload = (e) => {
        const reads = new FileReader();
        const file = e.target.files[0];
        reads.readAsDataURL(file);
        const target = imgRef.current;

        reads.onload = (event) => {

            handlerFromValue(file);
            target.src = event.currentTarget.result;
        }
        setShow(false);
        
    }

    const handlerFromValue = (file) => {
        // const fromData = new FormData();

        // fromData.append(file.name, file);

        props.sendData({
            type: 'file',
            identification: props.identification,
            value: file
        });
    }

    return (
        <div className="pic-upload draging">
            <div style={{ display: show ? "block" : "none" }} className="pic-upload-drop-area">
                {
                    inFrom
                        ?
                        <Fragment>
                            <input className = "upload" type="file" id="file" accept="image/jpg,image/jpeg,image/png,image/PNG" onChange={e => confirmUpload(e)} />
                            <div className="text">+ 将文件拖到此处，即可上传</div>
                        </Fragment>
                        :
                        <div className="text">
                            + 将文件拖到此处，即可上传
                        </div>
                }
            </div>
            <div style={{ display: show ? "none" : "block" }} className="pic-upload-img-area">
                <img onDoubleClick={e => setShow(true)} style={{ width: "100%", height: "100%" }} ref={imgRef} />
            </div>
        </div>
    );
}


export default PictureUpload;

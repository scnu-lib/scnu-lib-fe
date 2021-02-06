import React, { useState, useEffect } from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import * as photoStorage from '../photoStorage/photoStorage';
const UpLoadPhoto = (props: object) => {
  const [state, setState] = useState({ key: '-1', loading: false });
  useEffect(() => {
    console.log(props);
    setState({ key: props.photoKey, loading: false });
  }, []);
  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function beforeUpload(file: object) {
    const isPhoto = file.type.match(/^image/); //匹配image开头的文件
    if (!isPhoto) {
      message.error('目前只能上传图片');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('请上传小于10M的图片');
    }
    return isPhoto && isLt10M;
  }

  const handleChange = (info: object) => {
    if (info.file.status === 'uploading') {
      setState({ key: state.key, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  };
  const handleUpLoad = ({ file }) => {
    setState({ key: state.key, loading: true });
    console.log(file);
    new Promise((resolve, reject) => {
      photoStorage.postPhoto(file, state.key, resolve, reject);
    })
      .then(res => {
        const img = document.querySelector('#upLoadImg');
        img &&
          img.setAttribute(
            'src',
            `${photoStorage.getPhoto(state.key)}?dummy=${new Date().getTime()}`,
          ); //to disable browser cache use a unrepeatable query params to renew the src            setState({key:state.key,loading:false})
        setState({ key: state.key, loading: false });
        message.success('成功上传图片');
      })
      .catch(err => {
        setState({ key: state.key, loading: false });
        message.error('上传失败，请重试');
      });
  };
  return (
    <ImgCrop grid aspect={2.35}>
      <Upload
        name="key"
        listType="picture-card"
        className="actsrc-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleUpLoad}
      >
        {state.key && !state.loading ? (
          <div id="outSideUpLoadImg">
            <img
              id="upLoadImg"
              style={{ width: '100px', height: '60px' }}
              src={`${photoStorage.getPhoto(
                state.key,
              )}?dummy=${new Date().getTime()}`}
              alt={`${state.key}photo`}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  );
};

export default UpLoadPhoto;

import React, { useState, useEffect } from 'react';
import { message, Upload, Progress } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import * as photoStorage from '../photoStorage/photoStorage';
const UpLoadPhoto = (props: {
  photoKey: string;
  type: 'avatar' | 'actPoster';
  recordUrl: Function;
}) => {
  interface IState {
    key: string;
    loading: boolean | number;
    isNull: boolean;
  }
  const [state, setState] = useState<IState>({
    key: '-1',
    loading: false,
    isNull: false,
  });
  //改变进度状态（进度条）
  const changeLoading = (loading: number | false) => {
    setState({
      ...state,
      loading,
    });
  };
  useEffect(() => {
    console.log(props);
    setState({
      key: props.photoKey,
      loading: false,
      isNull: props.photoKey === undefined ? true : false,
    });
  }, []);
  const uploadButton = (
    <div>
      {state.loading !== false ? (
        <Progress
          width={60}
          type="circle"
          percent={Math.floor((state.loading as number) * 100)}
        />
      ) : (
        <>
          <PlusOutlined /> <div style={{ marginTop: 8 }}>Upload</div>
        </>
      )}
    </div>
  );
  //为不同的type提供预设，大了可以封装成函数
  let photoShowSize = { width: '100px', height: '100px' };
  let photoPercentage = 2.35;
  if (props.type === 'avatar') {
    photoShowSize = { width: '100px', height: '100px' };
    photoPercentage = 1;
  } else if (props.type === 'actPoster') {
    photoShowSize = { width: '100px', height: '60px' };
    photoPercentage = 2.35;
  }
  function beforeUpload(file: object) {
    const isPhoto = file.type.match(/^image/); // 匹配image开头的文件
    if (!isPhoto) {
      message.error('目前只能上传图片');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('请上传小于10M的图片');
    }
    return isPhoto && isLt10M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, key: state.key });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  };
  const handleUpLoad = ({ file }) => {
    //进度条从0开始
    changeLoading(0);
    new Promise((resolve, reject) => {
      photoStorage.postPhoto(
        file,
        state.key,
        resolve,
        reject,
        changeLoading,
        props.type,
      );
    })
      .then(res => {
        const img = document.querySelector('#upLoadImg');
        img &&
          img.setAttribute(
            'src',
            `${photoStorage.getPhoto(
              state.key,
              props.type,
            )}?dummy=${new Date().getTime()}`,
          ); // to disable browser cache use a unrepeatable query params to renew the src            setState({key:state.key,loading:false})
        setState({ ...state, loading: false, isNull: false });
        props.recordUrl(photoStorage.getPhoto(state.key, props.type));
        message.success('成功上传图片');
      })
      .catch(err => {
        setState({ ...state, loading: false, isNull: true });
        message.error('上传失败，请重试');
      });
  };
  return (
    <ImgCrop grid aspect={photoPercentage}>
      <Upload
        name="key"
        listType="picture-card"
        className="actsrc-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={handleUpLoad}
      >
        {!state.isNull && state.key && !state.loading ? (
          <div id="outSideUpLoadImg">
            <img
              id="upLoadImg"
              style={photoShowSize}
              src={`${photoStorage.getPhoto(
                state.key,
                props.type,
              )}?dummy=${new Date().getTime()}`}
              onError={(ev: any) => setState({ ...state, isNull: true })}
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

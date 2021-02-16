import COS, { UploadBody } from 'cos-js-sdk-v5';
let cos = new COS({
  SecretId: 'AKIDnOnkT5D7MRadQAT0CsRsGMLECkNtiW5X',
  SecretKey: 'g96saAg2BHLKEzkkdNvGYq14oTbbTDnH',
});

export const postPhoto = (
  photo: UploadBody,
  Key: string,
  resolve: Function,
  reject: Function,
) => {
  cos.putObject(
    {
      Bucket: 'pages-1304363322' /* 必须 */,
      Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
      Key: 'photo/' + Key /* 必须 */,
      StorageClass: 'STANDARD',
      Body: photo, // 上传文件对象
      onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
      },
    },
    function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
      console.log(err || data);
    },
  );
};

export const getPhoto = (Key: string) => {
  const src =
    'https://pages-1304363322.cos.ap-guangzhou.myqcloud.com/photo/' + Key;

  return src;
};

export const delPhoto = (Key: string) => {
  cos.deleteObject(
    {
      Bucket: 'pages-1304363322' /* 必须 */,
      Region: 'ap-guangzhou' /* 存储桶所在地域，必须字段 */,
      Key: 'photo/' + Key /* 必须 */,
    },
    function(err, data) {
      console.log(err || data);
    },
  );
};

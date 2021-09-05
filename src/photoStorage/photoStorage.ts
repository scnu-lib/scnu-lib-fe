import COS, { UploadBody } from 'cos-js-sdk-v5';
const cos = new COS({
  SecretId: 'AKIDaz92f16vVpsfBRQ8ZkeIfmcASTEWYJn0',
  SecretKey: 'xd4E7j49xb1EDyVpvmPyKRKyPcaO1QbV',
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
      onProgress(progressData) {
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
  if (Key === '-1')
    return 'https://pages-1304363322.cos.ap-guangzhou.myqcloud.com/photo/%E4%B8%8B%E8%BD%BD.png';
  // 返回默认上传图片
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

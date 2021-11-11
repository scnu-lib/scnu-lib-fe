import UpLoadPhoto from '@/components/UpLoadPhoto';
import { useState } from 'react';
import React from 'react';

export default function ChangeAvatar({ id }: any) {
  console.log(id);
  const [imgUrl, setImgUrl] = useState('');
  return (
    <UpLoadPhoto
      photoKey={`avatarPhoto${id}`}
      type={'avatar'}
      recordUrl={setImgUrl}
    />
  );
}

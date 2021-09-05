import UpLoadPhoto from '@/components/UpLoadPhoto';
import React from 'react';

export default function ChangeAvatar({ id }: any) {
  console.log(id);
  return (
    <UpLoadPhoto
      photoKey={`avatarPhoto${id}`}
      photoPercentage={1}
      photoShowSize={{ width: '100px', height: '100px' }}
    />
  );
}

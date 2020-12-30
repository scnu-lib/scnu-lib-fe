import React from 'react';
import { Empty, Button } from 'antd';
import { getRole, isLogined } from '@/Utils/auth';
import { role } from '@/Utils/config';
//封装一个空状态，传入标题还有创建逻辑，创建逻辑需要登录和管理员才能看到
interface IEmptyState {
  createTitle: string;
  createDescription: string;
  createFunc: Function;
}
export default function EmptyState({
  createTitle,
  createDescription,
  createFunc,
}: IEmptyState) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: '90px',
      }}
    >
      <Empty description={createDescription} />
      {isLogined() &&
        (getRole() === role.admin || getRole() === role.librarian) && (
          <Button
            type="primary"
            onClick={() => {
              createFunc();
            }}
          >
            {createTitle}
          </Button>
        )}
    </div>
  );
}

import React, { useState } from 'react';
import { Button } from 'antd';
import Pie from './components/Pie';
import TotalCount from './components/TotalCount';
import Histogram from './components/Histogram';

function UserRecord() {
  const [count, setCount] = useState(666);
  const addCount = () => setCount(count + 1);
  return (
    <div>
      <TotalCount count={count} />
      <Button type="primary" onClick={addCount}>
        add
      </Button>
      <Pie />
      <Histogram number={count} />
    </div>
  );
}

export default UserRecord;

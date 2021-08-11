import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';

const DemoBar: React.FC = props => {
  const data = [
    {
      type: '用户',
      sales: props.number,
    },
    {
      type: 'test1',
      sales: 100,
    },
    {
      type: 'test2',
      sales: 61,
    },
    {
      type: 'test3',
      sales: 51,
    },
    {
      type: 'test4',
      sales: 48,
    },
    {
      type: 'test5',
      sales: 38,
    },
    {
      type: 'test6',
      sales: 38,
    },
    {
      type: 'test7',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'sales',
    yField: 'type',
    legend: { position: 'top-left' },
    barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
  };
  return <Bar {...config} />;
};

export default DemoBar;

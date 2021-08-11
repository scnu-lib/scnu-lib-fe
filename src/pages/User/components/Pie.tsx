import React from 'react';
import { Pie as DefaultPie } from '@ant-design/charts'; //这里Pie必须用 as改名否则跟我们的组件名冲突
const data = [
  {
    type: '阅读书籍',
    value: 27,
  },
  {
    type: '阅读马拉松',
    value: 25,
  },
  {
    type: '图书分享会',
    value: 18,
  },
  {
    type: '阅读笔记分享',
    value: 15,
  },
  {
    type: '志愿活动',
    value: 10,
  },
  {
    type: '其他',
    value: 5,
  },
];
const config = {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  innerRadius: 0.4,
  title: 'test',
  label: {
    type: 'inner',
    offset: '-30%',
    title: 'test',
    content: function content(_ref) {
      const percent = _ref.percent;
      return ''.concat((percent * 100).toFixed(0), '%');
    },
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
};
export default function Pie() {
  return (
    <div>
      <h1 align="center">积分来源</h1>
      <DefaultPie {...config} />
    </div>
  );
}

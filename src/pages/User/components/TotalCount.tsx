import React from 'react';
import { Card } from 'antd';
const Icon = () => (
  <svg
    t="1628089486290"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2317"
    width="25"
    height="25"
  >
    <path
      d="M124.2 512c0 214.2 173.6 387.8 387.8 387.8S899.8 726.1 899.8 512 726.2 124.2 512 124.2 124.2 297.8 124.2 512z"
      fill="#FFD96B"
      p-id="2318"
    ></path>
    <path
      d="M786.3 237.9L237.9 786.4c151.5 151.3 396.9 151.3 548.3-0.1 151.4-151.5 151.5-396.9 0.1-548.4z"
      fill="#FDC223"
      p-id="2319"
    ></path>
    <path
      d="M230.1 512c0 155.7 126.2 281.9 281.9 282 155.7 0 281.9-126.2 282-281.9v-0.1c0-155.7-126.2-281.9-281.9-282s-282 126.2-282 282c0-0.1 0-0.1 0 0z"
      fill="#F9AB10"
      p-id="2320"
    ></path>
    <path
      d="M705.3 307.2c-110.4-104.3-284.4-102.7-392.6 5.5-108.1 108.2-109.8 282.2-5.5 392.6 0-0.1 398.1-398.1 398.1-398.1z"
      fill="#F9B721"
      p-id="2321"
    ></path>
    <path
      d="M487.8 591.7h-69.4v-41.4h69.4v-22.4h-69.4v-41.4h48.8L409 368.4h57.6l37.4 79.7c4.8 10 8.1 18.8 10.1 26.4 2.3-8.2 5.7-17.1 10.1-26.4l38.2-79.7H620l-58.9 118.1h49.6v41.4h-70.4v22.4h70.4v41.4h-70.4v87.6h-52.5v-87.6z"
      fill="#D3830D"
      p-id="2322"
    ></path>
    <path
      d="M564.5 479.7l-112 112h35.2v87.6h52.6v-87.6h70.4v-41.4h-70.4v-22.4h70.4v-41.4h-49.6l3.4-6.8z"
      fill="#BF790A"
      p-id="2323"
    ></path>
  </svg>
);
export default function TotalCount({ count = 0 }: { count: number }) {
  return (
    <Card
      style={{ width: 200 }}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      总积分：{count}
      <Icon />
    </Card>
  );
}

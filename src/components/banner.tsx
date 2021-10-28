import cn from 'classnames';
import React from 'react';
import './cssModule.css';

type BannerProps = {
  title: string;
  subTitle?: string;
};
const Banner = (props: BannerProps) => {
  return (
    <div className={cn('bg')}>
      <div className="contect-container"></div>
      <div className="imgBg"></div>
    </div>
  );
};

export default Banner;

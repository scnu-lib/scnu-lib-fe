import cn from 'classnames';
import React from 'react';
import './cssModule.css';

type BannerProps = {
  title: string;
  subTitle?: string;
};
const Banner = (props: BannerProps) => {
  return (
    <div className={cn('banner-bg', 'banner-bg-mobile', 'banner-bg-media')}>
      <div className={cn('contect-container', 'contect-container-media')}>
        <div className={cn('contect-zone', 'contect-zone-media')}>
          <div className="welcome-contect">欢迎</div>
          <div className="title-contect">{props.title}</div>
          <div className="subtitle-contect">{props.subTitle}</div>
        </div>
        <div className="bg-images"></div>
      </div>
    </div>
  );
};

export default Banner;

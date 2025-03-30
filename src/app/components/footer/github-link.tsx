import React, { FC } from 'react';
import GithubSvg from '../svg/github-svg';

const GithubLink: FC<{ url: string; name: string }> = ({ url, name }) => {
  return (
    <a href={url} target={'_blank'} rel="noreferrer" className="flex items-center gap-1">
      <GithubSvg color="#3d3d3d" />
      <span>{name}</span>
    </a>
  );
};

export default GithubLink;

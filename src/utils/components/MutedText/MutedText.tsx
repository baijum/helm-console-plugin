import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

type MutedTextProps = { content: ReactNode | string; isSpan?: boolean };

const MutedText: FC<MutedTextProps> = ({ content, isSpan }) => {
  return (
    <div className={classNames({ 'muted-text__is-span': isSpan }, 'text-muted')}>{content}</div>
  );
};

export default MutedText;

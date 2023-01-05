import React from 'react';
import { ResultsScoreBlockProps } from './results-score-block.types';
import Styled from 'styled-components';

const IconContainer = Styled.div`
  height: 50px;
  width: 50px;
  border-radius: 4px;
  box-shadow: 0px 1px 4px 1px #ddd;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const Score = Styled.span`
 font-size: 30px;
 display: block;
 line-height: 25px;
`;

const ScoreText = Styled.span`
 font-size: 14px;
`;

export const ResultScoreBlock = ({
  icon,
  score,
  scoreText,
  color,
  bgColor,
  borderColor,
  className,
  imageBaseUrl,
  ...rest
}: ResultsScoreBlockProps) => {
  return (
    <React.Fragment>
      <div
        className={`${
          className ? className : ''
        } d-flex align-items-start wrap`}
        {...rest}
      >
        <IconContainer
          className="icon"
          style={{ backgroundColor: bgColor, borderColor: borderColor }}
        >
          <img alt="Correct" src={`${imageBaseUrl}${icon}`} />
        </IconContainer>

        <div>
          <Score style={{ color: color }}>{score}</Score>

          <ScoreText style={{ color: color }}>{scoreText}</ScoreText>
        </div>
      </div>
    </React.Fragment>
  );
};

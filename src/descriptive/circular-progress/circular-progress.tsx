import React from 'react';
import Styled from 'styled-components';
import { CircularProgressProps } from './circular-progress-types';
import { CircularProgressbar } from 'react-circular-progressbar';

const ProgressContainer = Styled.div`
  width: 164px;
  height: 164px;
`;

const Title = Styled.div`
  font-size: 24px;
  margin-top: 4px;
  text-align: center;
`;

const ProgressText = Styled.span`
  font-size: 36px;
`;

const TotalProgressText = Styled.span`
  font-size: 20px;
`;

const ProgressTextContainer = Styled.span`
position: absolute;
top: 56px;
width: 100%;
text-align: center;
`;

export const CircularProgress = ({
  progressValue,
  totalProgress,
  primaryColor,
  title,
  className,
  ...rest
}: CircularProgressProps) => {
  return (
    <React.Fragment>
      <div className="position-relative">
        <ProgressContainer className={className ? className : ''} {...rest}>
          <CircularProgressbar
            counterClockwise={true}
            strokeWidth={11}
            maxValue = {totalProgress}
            styles={{
              path: {
                stroke: primaryColor,
              },
              trail: {
                stroke: '#d6d6d6',
              },
            }}
            value={progressValue}
            // text={`${progressValue}/${totalProgress ? totalProgress : 100}`}
          />
        </ProgressContainer>

        <ProgressTextContainer>
          <ProgressText style={{ color: primaryColor }}>
            {progressValue}
          </ProgressText>
          /
          <TotalProgressText>
            {totalProgress ? totalProgress : 100}
          </TotalProgressText>
        </ProgressTextContainer>

        {title ? <Title style={{ color: primaryColor }}>{title}</Title> : null}
      </div>
    </React.Fragment>
  );
};

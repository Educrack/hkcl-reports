import React from 'react';

import { CircularProgress } from '../../components/circular-progress/circular-progress';
import { PrimaryButton } from '../../components/primary-button/primary-button';

export const ResultsReport = ({
  userName,
  testName,
  resultMsg,
  achievedScore,
  totalMarks,
  rankScored,
  rankTotal,
  percentile,
  accuracy,
  timeSpent,
  ...rest
}: any) => {
  return (
    <div className="test-result--header" {...rest}>
      <div className="result">
        <p>Result: {testName}</p>
        <span>{resultMsg}</span>
      </div>

      <div className="progress-wrap">
        <div className="mr-md-5 mb-3 mb-md-0">
          <CircularProgress
            title="Total Score"
            progressValue={achievedScore ? achievedScore.toFixed(2) : 0 }
            totalProgress={totalMarks}
            primaryColor="#50B167"
          />
        </div>

        <CircularProgress
          progressValue={rankScored}
          totalProgress={rankTotal}
          primaryColor="#FFA901"
          title="Rank"
        />
      </div>

      <div className="percentage-info">
          <ul>
            <li>Percentile</li>
            <li>{percentile ? percentile + '%' : "0%"}</li>
          </ul>

          <ul>
            <li>Accuracy</li>
            <li>{accuracy ? accuracy + '%' : "0%"}</li>
          </ul>

        <ul>
          <li>Time Spent</li>
          <li>{timeSpent ? timeSpent : "0min"}</li>
        </ul>

        <PrimaryButton className="w-100 mt-2 d-none" onClick={() => {}}>
          View Details
        </PrimaryButton>
      </div>
    </div>
  );
};

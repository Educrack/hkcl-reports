// import { PrimaryButton } from '../../components/primary-button/primary-button';
import React from 'react';
import { ResultScoreBlock } from '../results-score-block/results-score-block';
// import { PrimaryButton } from '../../components/primary-button/primary-button';


export const ResultsScores = ({
  totalCorrectAnswer,
  totalWrongAnswer,
  totalSkippedAnswer,
  imageBaseUrl,
  ...rest
}: any) => {
// Disable browser's back button
  const _window = window as any;
  _window.history.pushState(null, null, location.href);
  _window.onpopstate = function () {
      history.go(1);
  };

  return (
    <div className="test-score" {...rest}>
      <ResultScoreBlock
        icon={'correct-answer-icon.png'}
        color="#50B167"
        score={totalCorrectAnswer}
        scoreText="Correct Answered"
        bgColor="#E8FDF5"
        borderColor="#a6dbb6"
        imageBaseUrl={imageBaseUrl}
      />

      <ResultScoreBlock
        icon={'wrong-answer-icon.png'}
        score={totalWrongAnswer}
        scoreText="Wrong Attempt"
        color="#EE6A7A"
        bgColor="#FFF2F2"
        borderColor="#f1a6ae"
        imageBaseUrl={imageBaseUrl}
      />

      <ResultScoreBlock
        icon={'skip-answer-icon.png'}
        score={totalSkippedAnswer}
        scoreText="Skipped Question"
        color="#7B7B7B"
        bgColor="#E5E5E5"
        borderColor="#a9a9a9"
        imageBaseUrl={imageBaseUrl}
      />

        {/* <div className=" d-flex align-items-start wrap">
          <PrimaryButton className="w-100 " onClick={() => {
            const _window = window as any;
            _window.close();
          }}>
          Close
        </PrimaryButton>
        </div> */}
        {/* <div className=" d-flex align-items-start wrap">
          <PrimaryButton className="w-100 " onClick={()=>{}}>
          Re-attempt
        </PrimaryButton>
        </div> */}

    </div>
  );
};

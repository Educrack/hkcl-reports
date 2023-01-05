import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Tab, Tabs } from "@lipihipi/ec-ui";
// Components
import { ResultsReport } from '../../../components/results-report/results-report';
import { ResultsScores } from '../../../components/results-scores/results-scores';
import Question from "./question/question";
import Subject from "./subject/subject";
import Difficulty from "./difficulty/difficulty";
export const TestResults = ({
  attemptId,
  getTestAttempt,
  imageBaseUrl,
  onTestInProgress,
  onNoTestResultReady,
}: {
  attemptId: string;
  getTestAttempt: any;
  imageBaseUrl: string;
  onTestInProgress: (testId: string) => void;
  onNoTestResultReady: () => void;
}) => {

  const [state, setState] = useState("Question");
  const [attempt, setAttempt] = useState<any>({});

  useEffect(() => {
    async function init() {
      try {
        if (attemptId) {
          const { data } = await getTestAttempt(attemptId,{populate:true});
          setAttempt(data);
          checkTestResultStatus(data);
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: 'No Result',
          text: 'This test has no result for you, plese start a test!',
          icon: 'warning',
          showConfirmButton: true,
          showCancelButton: false,
        }).then(onNoTestResultReady);
      }
    }
    init();
  }, []);


  const { test, rank, rankTotal }: any = attempt;
  const userName = 'User Name';
  const testName = test?.name;
  const resultMsg = 'Try harder!';
  const totalMarks = test?.totalMarks;

  const rankScored = rank || 0;
  const rankTotalCount = rankTotal;
  let timeSpent = '';

  if (attempt?.startedAt && attempt?.finishedAt) {
    // start time and end time
    var startTime = moment(attempt.startedAt);
    var endTime = moment(attempt.finishedAt);

    // calculate total duration
    var duration = moment.duration(endTime.diff(startTime));

    // duration in hours
    var hours = parseInt(duration.asHours().toString());

    // duration in minutes
    var minutes = parseInt(duration.asMinutes().toString()) % 60;

    console.log(hours + ' hour,  ' + minutes + ' minutes.');
    timeSpent = hours ? hours + ' h,  ' + minutes + ' min.' : minutes + ' min.';
  }

  const checkTestResultStatus = (test: any) => {
    if (test?.status === 'IN PROGRESS') {
      Swal.fire({
        title: 'Test in Progress!',
        text: 'Your test is IN-PPROGRESS, plese continue on that!',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: false,
      }).then(() => onTestInProgress(test?.test?._id));
    } else if (test?.status !== 'FINISHED') {
      Swal.fire({
        title: 'No Result',
        text: 'This test has no result for you, plese start a test!',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: false,
      }).then(onNoTestResultReady);
    }
  };

  return (
    <React.Fragment>
      {/* <Header showRightContent /> */}

      <div className="p-3 p-md-4">
        <div className="test-result">
          <ResultsReport
            userName={userName}
            testName={testName}
            resultMsg={resultMsg}
            achievedScore={attempt.achievedScore}
            totalMarks={totalMarks}
            rankScored={rankScored}
            rankTotal={rankTotalCount}
            percentile={attempt.percentile}
            accuracy={attempt.accuracy}
            timeSpent={timeSpent}
          />
          <ResultsScores
            totalCorrectAnswer={attempt.totalCorrectAnswer}
            totalWrongAnswer={attempt.totalWrongAnswer}
            totalSkippedAnswer={attempt.totalSkippedAnswer}
            imageBaseUrl={imageBaseUrl}
          />
        </div>


        <div className="explanation-tabs" style={{marginTop:40}}>
        <Tabs active={state} onClick={setState}>
          <Tab id={"Question"} title={"Question By Question"}>
           <Question quesList={attempt} imageBaseUrl={imageBaseUrl} />
          </Tab>

          <Tab id={"Subject"} title={"Subject Wise"}>
           <Subject quesList ={attempt} imageBaseUrl={imageBaseUrl} />
          </Tab>

          <Tab id={"Test"} title={"Difficulty Wise"}>
          <Difficulty quesList ={attempt} imageBaseUrl={imageBaseUrl}/>
          </Tab>

          {/* <Tab id={"Resources"} title={"Time Analysis"}>

          </Tab> */}
        </Tabs>
      </div>
      </div>
    </React.Fragment>
  );
};

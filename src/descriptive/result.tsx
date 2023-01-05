import React, { useState } from 'react';
import { IDescriptiveTestResult } from './descriptive.types';
import { CircularProgress } from './circular-progress/circular-progress';
import moment from 'moment';
import { SmartText } from './textBlock';

const DescriptiveResult = ({
  userTest,
  testAttemptId,
  getAssetUrl,
}: IDescriptiveTestResult) => {
  const [testData, setTestData] = useState<any>();

  React.useEffect(() => {
    userTest(testAttemptId).then(({ data }: any) => {
      setTestData(data);
    });
  }, []);
  if (!testData) {
    return <></>;
  }
  return (
    <div className="p-3">
      <section className="descriptive">
        <div className="descriptive__header">
          <h3>{testData?.user?.name}</h3>
          <p>{testData?.test?.name}</p>
        </div>
        <div className="descriptive__progress">
          <div className="row d-md-flex align-items-center">
            <div className="col-md-6">
              <div className="progress-wrap d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div className="mr-md-5 mb-3 mb-md-0">
                  <CircularProgress
                    title="Total Score"
                    progressValue={Math.ceil(testData?.achievedScore)}
                    totalProgress={testData?.test?.totalMarks}
                    primaryColor="#50B167"
                  />
                </div>
                <CircularProgress
                  title="Rank"
                  progressValue={testData?.rank}
                  totalProgress={testData?.rankTotal}
                  primaryColor="#FFA901"
                />
              </div>
            </div>
            <div className="col-md-6">
              <ul>
                <li>
                  <span>Percentile -</span>
                  <strong>{testData?.percentile}%</strong>
                </li>
                <li>
                  <span>Accuracy -</span>
                  <strong>{testData?.accuracy}%</strong>
                </li>
                <li>
                  <span>Time Spent -</span>
                  <strong>
                    {moment(testData?.finishedAt).diff(
                      moment(testData.startedAt),
                      'minutes'
                    )}{' '}
                    minute
                  </strong>
                </li>
              </ul>
              {/* <button type="button" className="btn btn-primary">Review Test</button> */}
            </div>
          </div>
        </div>
        {testData?.test?.questions?.map((question: any, index: number) => (
          <div className="descriptive__body">
            <div className="wrap">
              <div className="wrap__header">
                <span>Q{index + 1}</span>
                <em>Marks - {question.points}</em>
                <p>
                  <strong>Directions:</strong> Give yourself 3 minutes to read
                  the passage.
                </p>
                <p>
                  <strong>Reading Time:</strong> 3 minutes
                </p>
              </div>
              <SmartText
                text={question?.parentQuestion?.commonData}
                length={400}
              />
              <div
                dangerouslySetInnerHTML={{ __html: question.subQuestion.text }}
              />
              <div className="row answer-block">
                <div className="col-md-6">
                  <div className="answer-by-student">
                    <p>
                      <strong>Answer submission by Student </strong>
                      <a>(1280 characters)</a>
                    </p>
                    <p>{question?.typedAnswers}</p>
                  </div>
                  {question?.answerImages?.length ? (
                    <ul>
                      {question?.answerImages?.map((answerImages: any) => (
                        <li>
                          <img src={getAssetUrl(answerImages)}></img>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
                <div className="col-md-6">
                  <div className="feedback-by-educator">
                    <p>
                      <strong>Feedback by Educator</strong>
                    </p>

                    <p>{question?.comment}</p>
                    {question?.feedbackImages?.length ? (
                      <ul>
                        {question?.feedbackImages?.map(
                          (feedbackImages: any) => (
                            <li>
                              <img src={getAssetUrl(feedbackImages)}></img>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DescriptiveResult;

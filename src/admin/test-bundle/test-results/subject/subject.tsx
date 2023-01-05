import React, { useEffect, useState } from 'react';
import Explanation from '../explanation';
const Subject = ({ quesList, imageBaseUrl }: any) => {
  const [sortedSubjectList, setSortedSubjectList] = useState<any>([]);
  const [modal, setModal] = React.useState<any>({
    visible: false,
    questionData: '',
  });
  const handleClose = () => {
    setModal({ visible: false });
  };

  useEffect(() => {
    const questions = quesList?.test?.questions;
    var sortedMap = new Map();

    questions?.map((test: any) => {
      const filterTest = questions?.filter(
        (item: any) => item?.subject?._id === test?.subject?._id
      );

      if (filterTest?.length > 0) {
        var questionValue = {
          subject: test?.subject?.name,
          data: filterTest,
        };

        sortedMap.set(test?.subject?._id, questionValue);
      }
    });

    const sortedList: any = [];

    sortedMap.forEach(key => {
      sortedList.push(key['data']);
    });

    setSortedSubjectList(sortedList);
  }, []);
  return (
    <>
      <div className="secondary-table">
        <div className="secondary-table--header">
          <div className="secondary-table--row">
            <div className="secondary-table--col">Q.No</div>
            <div className="secondary-table--col">Question</div>
            <div className="secondary-table--col">Difficulty Level</div>
            <div className="secondary-table--col">Marks</div>
            {/* <div className="secondary-table--col">Time Taken</div> */}
            <div className="secondary-table--col">Status</div>
          </div>
        </div>

        <div className="secondary-table--body">
          <div className="secondary-table--row">
            {sortedSubjectList?.map((questionData: any) => {
              return (
                <div>
                  {' '}
                  <h3>{questionData[0]?.subject?.name}</h3>
                  {questionData?.length ? (
                    questionData?.map((ques: any, i: any) => {
                      return (
                        <div className="wrap" key={i}>
                          <div className="secondary-table--col">{i + 1}</div>
                          <div className="secondary-table--col">
                            <p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: ques?.subQuestion?.text,
                                }}
                              ></div>
                            </p>
                          </div>
                          <div className="secondary-table--col">
                            {ques?.parentQuestion?.difficulty || ''}
                          </div>
                          <div className="secondary-table--col">
                            +{ques?.points || '0'}/-
                            {quesList?.test?.negativeMarking?.isEnabled
                              ? quesList?.test?.negativeMarking?.value
                              : '0'}
                          </div>
                          {/* <div className="secondary-table--col">0min 30sec</div> */}
                          <div className="secondary-table--col">
                            {ques?.status === 'ANSWERED' && ques.isCorrect && (
                              <span>
                                <img
                                  src={`${imageBaseUrl}correct-answer-icon.png`}
                                  alt=""
                                />
                              </span>
                            )}
                            {ques?.status === 'ANSWERED' && !ques.isCorrect && (
                              <span>
                                <img
                                  src={`${imageBaseUrl}wrong-answer-icon.png`}
                                  alt=""
                                />
                              </span>
                            )}

                            {ques?.status === 'NOT VISITED' && (
                              <span>
                                <img
                                  src={`${imageBaseUrl}skip-answer-icon.png`}
                                  alt=""
                                />
                              </span>
                            )}

                            {ques?.status === 'VISITED' && (
                              <span>
                                <img
                                  src={`${imageBaseUrl}skip-answer-icon.png`}
                                  alt=""
                                />
                              </span>
                            )}
                            {/* { ques?.status ===  "ANSWERED" ?   <span><img src={`${imageBaseUrl}correct-answer-icon.png`}  alt="" /></span>  :  <span> <img src={`${imageBaseUrl}wrong-answer-icon.png`} alt="" /> </span>} */}
                            <a
                              href="javascript:void(0)"
                              onClick={() =>
                                setModal({
                                  visible: true,
                                  questionData: ques,
                                })
                              }
                            >
                              View Explanation
                            </a>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Explanation
        isOpen={modal.visible}
        questionList={modal.questionData}
        onRequestClose={handleClose}
      />
    </>
  );
};

export default Subject;

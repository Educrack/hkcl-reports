import { Button, Modal } from '@lipihipi/ec-ui';
import React, { useEffect, useState } from 'react';

const Explanation = ({ isOpen, questionList, onRequestClose }: any) => {
  const [answer, setAnswer] = useState<any>([]);
  const [attempt, setAttempt] = useState<any>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    if(!questionList){
      return;
    }
    console.log('question', questionList)
    const Answers: any[] = [];
    setIsCorrect(false);
    questionList?.subQuestion?.options?.map((element: any, index: any) => {
      if(questionList?.subQuestion?.type === 'FIB') {
        Answers.push(element.text);
      }
      if (element?.isAnswer) {

        Answers.push(index + 1);
      }
    });

    setAnswer(Answers);

    setIsCorrect(questionList.isCorrect);
    setAttempt(questionList?.status === 'ANSWERED');
    loadWIRISplugins();
  }, [questionList]);


  const loadWIRISplugins = () => {
    // @ts-ignore
    if (window !== undefined) {
      // @ts-ignore
      const _window = window as any;
      const script = _window.document.getElementById('WIRISplugins') || false;
      if (!!script) {
        script.parentElement.removeChild(script);
      }
      const url =
        'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
      const jsDemoImagesTransform = _window.document.createElement('script');
      jsDemoImagesTransform.type = 'text/javascript';
      jsDemoImagesTransform.id = 'WIRISplugins';
      jsDemoImagesTransform.src = url;
      _window.document.head.appendChild(jsDemoImagesTransform);
    }
  };

  return (
    <Modal isOpen={isOpen} heightDefault={true} onRequestClose={onRequestClose}>
      <div className="primary-page-header mb-3" style={{ width: 900 }}>
        <div className="wrap">
          <h3>{questionList?.subject?.name || ''}</h3>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center">
        <div className="section-info">
          <strong>Section:</strong>
          <span>Marks: +20</span>
        </div>

        <ul className="test-duration-info">
          <li>{questionList?.parentQuestion?.difficulty || ''}</li>
          <li>{questionList?.topic?.name || ''}</li>
        </ul>
      </div>

      <div className="attempted-test-view mb-3">
        {questionList?.parentQuestion?.commonData && (
          <div className="left">
            {/* <div className="audio-view mb-3" style={{border: '1px solid #eee'}}>
            <p>IELTS Final round questiond.mp3</p>
            <div className="wrap">
              <IoPlayCircleOutline />

              <div className="bar">
                <span style={{width: '30%'}}>Fill</span>
              </div>
            </div>
          </div> */}

            {questionList?.parentQuestion?.commonData && (
              <div className="common-data-view">
                <h3>Common Data</h3>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questionList?.parentQuestion?.commonData,
                    }}
                  ></div>
                </p>
              </div>
            )}
          </div>
        )}

        <div className="right">
          <div className="question-result-view">
            <p>
              <div
                dangerouslySetInnerHTML={{
                  __html: questionList?.subQuestion?.text,
                }}
              ></div>
            </p>
          </div>
          <div className="custom-radio-group">
            {questionList?.subQuestion?.type !== 'FIB' ? questionList?.subQuestion?.options?.map((option: any) => {
              return (
                <div
                  className={
                    attempt && questionList?.selectedAnswers.includes(option._id)
                      ? 'radio-button checked'
                      : 'radio-button'
                  }
                >
                  <label>
                    <input type="radio" name="a" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: option?.text,
                      }}
                    ></span>
                  </label>
                </div>
              );
            }):questionList?.typedAnswers?.map((text: any) => {
              return (
                <div>
                  <label>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: text,
                      }}
                    ></span>
                  </label>
                </div>
              );
            })}
          </div>

          <div className="question-result-view my-3">
            <div className="correct-answer d-flex">
              <strong className="mr-1">Correct Answer:</strong>{' '}
              {answer.map((ans: any, index:number) => {
                return (
                  <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ans,
                    }}
                  ></span>
                  {index+1 === answer.length ? '': <span
                    dangerouslySetInnerHTML={{
                      __html: ', &nbsp;',
                    }}
                  ></span>}
                  </>
                );
              })}
            </div>
            {!attempt ? (
              <div className="attempt-info not-attempt" style = {{backgroundColor : "grey"}}>Not Attempt</div>
            ) :  isCorrect ? (
              <div className="attempt-info correct">Correct Attempt</div>
            ) : (
              <div className="attempt-info wrong">Wrong Attempt</div>
            )}
          </div>

          {questionList?.subQuestion?.explanation && (
            <div className="explanation-box common-data-view">
              <h3>Explanation</h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: questionList?.subQuestion?.explanation,
                }}
              ></div>
            </div>
          )}
        </div>
      </div>


        <Button shape="primary" onClick={onRequestClose}>
                  Close
                </Button>

      {/* <div className="row explation-test">
        <div className="col-sm-7">
          <div className="primary-page-header mb-3">
            <div className="wrap">
            <h3>{questionList?.subject?.name || ""}</h3>
          </div>

            {attempt ? <div className="attempt-info correct">Correct Attempt</div> :<div className="attempt-info wrong">Wrong Attempt</div> }
          </div>

          <div className="section-info">
            <strong>Section:</strong> Data Intepretation and Logical Reasonning
          </div>

          <ul className="test-duration-info">
            <li>{questionList?.parentQuestion?.difficulty || ""}</li>
            <li>3min 3sec</li>
            <li>{questionList?.topic?.name || ""}</li>
          </ul>

          <div className="common-data-view">

          </div>

          </div>
        <div className="col-sm-5">
          <div className="question-result-view d-block">

            <h3>
            <strong>Question 3:</strong>
           <div  dangerouslySetInnerHTML={{
              __html: questionList?.subQuestion?.text,
            }}>

           </div>
          </h3>

            <div className="custom-radio-group">
              {questionList?.subQuestion?.options?.map((option:any)=>{
                return(
              <div className={option?.isAnswer === true ? "radio-button checked" : "radio-button"  }>
                <label>
                  <input type="radio" name="a" />
                  <span dangerouslySetInnerHTML={{
              __html: option?.text,
            }}></span>
                </label>
              </div>
                );
              })}

            </div>

            <div style={{display:"inlineFlex"}} className="correct-answer">
              <strong>Correct Answer:</strong> <span dangerouslySetInnerHTML={{
              __html: answer,
            }}></span>
            </div>
          </div>

          <div className="common-data-view">
            <h3>Explanation</h3>
            <p>
            <div  dangerouslySetInnerHTML={{
              __html: questionList?.subQuestion?.explanation,
            }}></div>
            </p>
          </div>
        </div>
      </div> */}
    </Modal>
  );
};

export default Explanation;

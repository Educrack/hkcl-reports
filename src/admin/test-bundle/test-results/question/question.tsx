import React from 'react';
import Explanation from '../explanation';
const Question = ({ quesList, imageBaseUrl }: any) => {
  const [modal, setModal] = React.useState<any>({
    visible: false,
    questionData: '',
  });

  // const handleOpen = () => {
  //   setModal({ visible: true });
  // };

  React.useEffect(() => {
    loadWIRISplugins();
  }, []);

  const handleClose = () => {
    setModal({ visible: false, questionData: '' });
  };

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
            {quesList?.test?.questions?.length ? (
              quesList?.test?.questions?.map((ques: any, i: any) => {
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

export default Question;

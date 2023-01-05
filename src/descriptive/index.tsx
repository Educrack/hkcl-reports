import React from 'react';
import { FileUpload, Form, Input, TextArea } from '@lipihipi/form';
import { Button } from '@lipihipi/ec-ui';
import DescriptiveModal from './modal';
import { IDescriptiveTest } from './descriptive.types';
import { SmartText } from './textBlock';

interface IFeedback {
  score: string;
  comment: string;
  questionId: string;
  feedbackImages: string[]
}
const Descriptive = ({
  userTest,
  testAttemptId,
  submitEvaluatedAnswer,
  finishEvaluationAnswer,
  createAsset,
  getAssetUrl
}:IDescriptiveTest) => {
  const [open, setOpen] = React.useState(false);
  const [testData, setTestData] = React.useState<any>();
  const [modelData, setModelData] = React.useState<IFeedback>({
    score: "",
    comment: "",
    questionId:"",
    feedbackImages: []
  });

  React.useEffect(() => {
    userTest(testAttemptId).then(({ data }: any) => {
      setTestData(data);
    });
  }, []);
  if(!testData){
    return (<></>)
  }

  const handleOpen = (data:any) => {
    setOpen(true);
    setModelData(data)
  };

  const submitFeedback = () => {
    const payload = {
      score: modelData?.score,
      comment: modelData?.comment,
      questionId: modelData?.questionId,
      feedbackImages: modelData?.feedbackImages
    }
    submitEvaluatedAnswer(testData?._id, payload).then((resp:any)=> {
      setTestData(resp.data)
      setOpen(false)
    })

  }

  return (
    <div className="p-3">
      <section className="descriptive">
        <div className="descriptive__header">
          <h3>{testData?.user?.name}</h3>
          <p>{testData?.test?.name}</p>
        </div>
        {testData?.test?.questions?.map((question: any, index:number) => (

        <div className="descriptive__body">
          <div className="wrap">
            <div className="wrap__header">
              <span>Q{index+1}</span>
              <em>Marks - {question.points}</em>
              <p>
                <strong>Directions:</strong> Give yourself 3 minutes to read the
                passage.
              </p>
              <p>
                <strong>Reading Time:</strong> 3 minutes
              </p>
            </div>
            <SmartText text={question?.parentQuestion?.commonData} length={400}/>
            <div dangerouslySetInnerHTML= {{__html: (question.subQuestion.text)}} />
            <div className="row answer-block">
              <div className="col-md-6">
                <div className="answer-by-student">
                  <p>
                    <strong>Answer submission by Student </strong>
                    <a>(1280 characters)</a>
                  </p>
                  <p>{question?.typedAnswers}</p>
                </div>

                  {question?.answerImages?.length ?
                    (
                      <ul>
                      {question?.answerImages?.map((answerImages: any) => (
                        <li><img src={getAssetUrl(answerImages)}></img></li>
                      ))}
                    </ul>
                    ) : ''
                  }

              </div>
              <div className="col-md-6">
                <Form initialValues={{questionId: question._id, feedbackImages: [], ...question }}
                render={({ values }: any) => {
                  return (
                  <>
                    <TextArea
                      name="comment"
                      id="comment"
                      label="Feedback by Educator"
                      rows={10}
                      placeholder="Write your Feedback here"
                    />
                    <Input
                        name="score"
                        label="Enter Marks"
                        className="form-group flex-grow-1"
                        placeholder="Enter Marks"
                      />
                    <div className="form-group">
                      <FileUpload
                        label={'Attach Image'}
                        accept={['image/png', 'image/jpeg', 'application/pdf']}
                        type="multiple"
                        maxSize={'3mb'}
                        name={'feedbackImages'}
                        upload={createAsset}
                      />
                    </div>
                    <Button
                      className={`px-lg-5 d-block mt-3 mt-lg-0 ${question.score ? 'disabled' :''}`}
                      onClick={() => handleOpen(values)}
                      shape="primary"
                    >
                      Submit Feedback
                    </Button>
                  </>
                  )}}
                />
              </div>
            </div>
          </div>
        </div>
          ))}
        <div className="d-flex justify-content-center pt-3 pb-5">
          <Button
            className="px-lg-5 d-block"
            shape="primary"
            onClick={() => finishEvaluationAnswer(testAttemptId)}
          >
            Finish the evaluation
          </Button>
        </div>

        <DescriptiveModal isOpen={open} onRequestClose={() => setOpen(false)} submitFeedback={submitFeedback} />
      </section>
    </div>
  );
};

export default Descriptive;

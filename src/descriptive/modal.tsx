import React, { useState } from 'react';
import { Modal, Button } from '@lipihipi/ec-ui';
import { Form, CheckBox } from '@lipihipi/form';

interface IDescriptiveModal {
  isOpen: boolean;
  onRequestClose: () => void;
  submitFeedback: () => void;

}

export const DescriptiveModal = ({
  isOpen,
  onRequestClose,
  submitFeedback
}: IDescriptiveModal) => {
  const [confirm, setConfirm] = useState(false)
  const initialValue = {
    confirm: false
  }
  return (
    <Modal isOpen={isOpen} heightDefault={true} onRequestClose={onRequestClose}>
      <div className="p-5">
        <header className="text-center mb-3">
          <p>
            Are you sure that you have given all feedback and correct marking
          </p>
        </header>
        <Form initialValues={initialValue}>
          <div className="mb-5 d-flex justify-content-center">
            <CheckBox
              id={'confirm'}
              name={'confirm'}
              onChange={(e:any) => {
                setConfirm(e.target.checked)
              }}
              label={'Click here to Confirm'}
            />
          </div>
          
          <div className="form-group m-0 d-flex justify-content-center">
            <Button shape="secondary" onClick={onRequestClose} type="button">
              Cancel
            </Button>
            <Button className={`px-5 ml-3 ${confirm ? '':'disabled'}`} onClick={() => {
              submitFeedback()
            }}         
             shape="primary" type="button">
              Yes
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DescriptiveModal;

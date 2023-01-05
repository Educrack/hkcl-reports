import { Modal } from '@lipihipi/ec-ui';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const TestModal = (props: any) => {
  return (
    <Modal
      isOpen={props.isOpen}
      heightDefault={true}
      onRequestClose={props.onRequestClose}
    >
      <div style={{ width: 938 }}>
        <div className="batch-accordion test-accordian">
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  Batch1 Name will be shown here
                  <span>Wed May 20 2020 09:00:35 GMT+0530</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px' }}>
                  <ul className="test-list-data">
                    <li>
                      <strong>Percentage 1</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Profit and Loss</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Perajumble</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  Batch1 Name will be shown here
                  <span>Wed May 20 2020 09:00:35 GMT+0530</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px' }}>
                  <ul className="test-list-data">
                    <li>
                      <strong>Percentage 1</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Profit and Loss</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Perajumble</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  Batch1 Name will be shown here
                  <span>Wed May 20 2020 09:00:35 GMT+0530</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px' }}>
                  <ul className="test-list-data">
                    <li>
                      <strong>Percentage 1</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Profit and Loss</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Perajumble</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  Batch1 Name will be shown here
                  <span>Wed May 20 2020 09:00:35 GMT+0530</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px' }}>
                  <ul className="test-list-data">
                    <li>
                      <strong>Percentage 1</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Profit and Loss</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>

                  <ul className="test-list-data">
                    <li>
                      <strong>Perajumble</strong>
                    </li>
                    <li>
                      <span>100 Questions, 100 Marks, Duration: 60 mins</span>
                      <span>11th Oct 2020 at 11:00</span>
                      <a href="javascript:void(0)">Details</a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </Modal>
  );
};

export default TestModal;

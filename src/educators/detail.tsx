import { PageHeader, Pagination, Loader } from '@lipihipi/ec-ui';
import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Form, Input, Select } from '@lipihipi/form';
import { MdSearch } from 'react-icons/md';
import AttendanceModal from './attendance-modal';
import moment from 'moment';
import { IEducatorReportProps } from './types';

export const Avatar = Styled.div<{ url: string }>`
	background-image: url(${({ url }: any) => url});
`;

const EducatorDetail = ({
  _id,
  getAssetUrl,
  getEducatorById,
  getTeacherBatchList,
  breadCrumbs,
  onViewBatchReport,
}: IEducatorReportProps) => {
  const [educator, setEducator] = useState<any>({});
  const [params, setParams] = useState<any>({
    page: 1,
    populate: true,
  });
  const [courseOptions, setCourseOptions] = useState<any>([]);
  const [teacherBatch, setTeacherBatch] = useState<any>({
    totalItems: 0,
    batches: [],
  });
  const [modal, setModal] = useState<{ visible: boolean; _id?: string }>({
    visible: false,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (_id && getEducatorById) {
      getEducatorById(_id, { ...params }).then(({ data }: any) => {
        let courseData = data?.subjectDetail?.course;
        setIsLoading(false);
        setCourseOptions(
          courseData?.map((course: any) => ({
            label: course?.name,
            value: course?._id,
          }))
        );
        setEducator(data);
      });
    }
  }, [params]);

  useEffect(() => {
    if (_id && getTeacherBatchList) {
      getTeacherBatchList(_id, { ...params }).then(({ data }: any) => {
        setIsLoading(false);
        setTeacherBatch(data);
      });
    }
  }, [params]);

  const handleOpen = () => {
    setModal({ visible: true });
  };

  const handleClose = () => {
    setModal({ visible: false });
  };

  const handleSearch = (values: any) => {
    setParams({
      ...values,
      page:1,
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={educator?.name || 'Educator'}
          description={educator?.email || 'email address'}
          breadCrumbs={
            breadCrumbs || [
              { title: 'Reports', link: '/' },
              { title: 'Students Report' },
            ]
          }
          component={
            <Avatar
              className="primary-avtar"
              url={getAssetUrl(educator?.displayPicture)}
            />
          }
        />

        <Form
          initialValues={{ ...params }}
          onSubmit={handleSearch}
          render={({ submitForm }: any) => (
            <div className="row">
              <div className="col-md-6">
                <Input
                  prefix={<MdSearch />}
                  id="searchExam"
                  name="q"
                  placeholder="Enter here to search"
                  label="Search"
                />
              </div>

              <div className="col-md-3">
                <Select
                  id="status"
                  name="status"
                  label="Active Type"
                  placeholder="Select"
                  onChange={submitForm}
                  options={[
                    { label: 'All', value: '' },
                    { label: 'Inactive', value: 'DRAFT' },
                    { label: 'Active', value: 'PUBLISH' },
                  ]}
                />
              </div>

              <div className="col-md-3">
                <Select
                  id="course"
                  name="course"
                  label="Course"
                  placeholder="Select Course"
                  options={[{ label: 'All', value: '' }, ...courseOptions]}
                  onChange={submitForm}
                />
              </div>

              {/* <div className="col-md-4">
                <Select
                  id="exam"
                  name="exam"
                  label="Sort by Date"
                  placeholder="Select"
                  options={[{ label: 'All', value: '' }]}
                />
              </div> */}
              <button type="submit" className="d-none">
                Search
              </button>
            </div>
          )}
        />

        <div className="form-group d-flex align-items-center justify-content-end">
          <span>
            <span
              style={{
                display: 'inline-block',
                width: '11px',
                height: '11px',
                verticalAlign: 'middle',
                borderRadius: '50%',
                backgroundColor: '#00B8BE',
              }}
            ></span>
            <span
              style={{
                margin: '0 20px 0 10px',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              Live
            </span>
          </span>
          <span>
            <span
              style={{
                display: 'inline-block',
                width: '11px',
                height: '11px',
                verticalAlign: 'middle',
                borderRadius: '50%',
                backgroundColor: '#00BE4C',
              }}
            ></span>
            <span
              style={{
                margin: '0 20px 0 10px',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              Recorded
            </span>
          </span>
        </div>

        <div className="batch-accordion test-accordian">
          {teacherBatch?.batches?.map((batch: any) => (
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <p className="d-flex justify-content-between align-items-center pr-4">
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          display: 'inline-block',
                          width: '11px',
                          height: '11px',
                          verticalAlign: 'middle',
                          borderRadius: '50%',
                          marginRight: 12,
                          backgroundColor: '#00BE4C',
                        }}
                      ></span>
                      {batch?.name}
                    </div>
                    <span>{moment(batch?.createdAt).format('D MMM YYYY')}</span>
                  </p>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ padding: '0 17px 17px 40px' }}>
                    <div className="d-flex justify-content-between pr-4">
                      <ul className="simple-table batch-reports">
                        <li>
                          <strong>No of students</strong>
                        </li>
                        <li>
                          <strong>{batch?.students?.length}</strong>
                        </li>
                      </ul>
                      <div className="my-progress--action">
                        <a
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            onViewBatchReport(batch?._id);
                          }}
                        >
                          View Reports
                        </a>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
          {/* <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        display: 'inline-block',
                        width: '11px',
                        height: '11px',
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        marginRight: 12,
                        backgroundColor: '#00B8BE',
                      }}
                    ></span>
                    Batch Name willbe shown at this place for better
                    understanding
                  </div>

                  <div className="primary-progress-bar">
                    <div className="wrap mr-2" style={{ width: '114px' }}>
                      <div className="bar-line" style={{ width: '30%' }}>
                        Line
                      </div>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#000' }}>
                      20% compeled
                    </span>
                  </div>
                  <span>22 Jan 2021 to 22 Jan 2021</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px 40px' }}>
                  <ul className="simple-table batch-reports">
                    <li>
                      <strong>No of students</strong>
                    </li>
                    <li>
                      <strong>2987</strong>
                    </li>
                  </ul>

                  <ul className="simple-table batch-reports">
                    <li>
                      <strong>Remote Classes</strong>
                    </li>
                    <li>
                      <strong>2987</strong>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion> */}

          <Accordion className="d-none">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        display: 'inline-block',
                        width: '11px',
                        height: '11px',
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        marginRight: 12,
                        backgroundColor: '#00B8BE',
                      }}
                    ></span>
                    Batch Name willbe shown at this place for better
                    understanding
                  </div>

                  <div className="primary-progress-bar">
                    <div className="wrap mr-2" style={{ width: '114px' }}>
                      <div className="bar-line" style={{ width: '30%' }}>
                        Line
                      </div>
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#000' }}>
                      20% compeled
                    </span>
                  </div>
                  <span>22 Jan 2021 to 22 Jan 2021</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px 40px' }}>
                  <ul className="simple-table batch-reports">
                    <li>
                      <strong>No of students</strong>
                    </li>
                    <li>
                      <strong>2987</strong>
                    </li>
                  </ul>

                  <ul className="simple-table batch-reports">
                    <li>
                      <strong>Remote Classes</strong>
                    </li>
                    <li>
                      <strong>2987</strong>
                    </li>
                  </ul>

                  <ul className="educator-info-list">
                    <li onClick={handleOpen}>
                      <span>Educator - 1</span>07/24
                    </li>
                    <li onClick={handleOpen}>
                      <span>Educator - 2</span>07/24
                    </li>
                    <li onClick={handleOpen}>
                      <span>Educator - 3</span>07/24
                    </li>
                    <li onClick={handleOpen}>
                      <span>Educator - 4</span>07/24
                    </li>
                    <li onClick={handleOpen}>
                      <span>Educator - 5</span>07/24
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Pagination
            totalItems={teacherBatch?.totalItems}
            currentPage={params.page || 1}
            itemsPerPage={10}
            onPageChange={(page: number) => {
              setParams({ ...params, page });
            }}
          />
        </div>
      </section>

      <AttendanceModal
        _id={modal._id}
        isOpen={modal.visible}
        onRequestClose={handleClose}
      />
    </>
  );
};

export default EducatorDetail;

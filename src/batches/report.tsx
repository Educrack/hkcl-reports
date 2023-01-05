import { PageHeader, PaginatedTable, Loader } from '@lipihipi/ec-ui';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Form, Input } from '@lipihipi/form';
import { MdSearch } from 'react-icons/md';
import Styled from 'styled-components';
import { IBatchReportProps } from './types';
import moment from 'moment';

export const Avatar = Styled.div<{ url: string }>`
	background-image: url(${({ url }: any) => url});
`;

const BatchReport = ({
  getBatchById,
  getBatchStudents,
  title,
  breadCrumbs,
  _id,
  getAssetUrl,
  onStudentClick,
  onEducatorClick,
}: IBatchReportProps) => {
  console.log(onEducatorClick)
  const [batch, setBatch] = React.useState<any>({});

  const [params, setParams] = React.useState<any>({
    populate: true,
    page: 1,
    isRecent: true,
  });

  const [students, setStudents] = React.useState<any>({
    totalItems: 0,
    students: [],
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (_id && getBatchStudents) {
      getBatchStudents(_id, { ...params }).then(({ data }: any) => {
        setIsLoading(false);
        setStudents(data);
      });
    }
  }, [params]);

  React.useEffect(() => {
    if (_id && getBatchById) {
      getBatchById(_id, { ...params }).then(({ data }: any) => {
        setIsLoading(false);
        setBatch(data);
      });
    }
  }, []);

  const handleSearch = (values: any) => {
    setParams({
      ...values,
      page: 1,
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={title || 'Batch Reports '}
          breadCrumbs={
            breadCrumbs || [
              { title: 'Reports', link: '/' },
              { title: 'Batch', link: '/' },
              { title: 'Students Report' },
            ]
          }
        />

        <div className="batch-accordion test-accordian">
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <p className="d-flex justify-content-between align-items-center pr-4">
                  <span className="d-flex align-items-center">
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
                    {batch?.name}
                  </span>

                  <span>{moment(batch?.createdAt).format('D MMM YYYY')}</span>
                </p>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Card.Body style={{ padding: '0 17px 17px 40px' }}>
                  <ul className="simple-table batch-reports">
                    <li>
                      <strong>No of students</strong>
                    </li>
                    <li>
                      <strong>{batch?.studentCount}</strong>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
{/* 
        <div className="primary-page-header mt-5">
          <div className="wrap">
            <h3>Educators</h3>
          </div>
        </div>

        <Table
          data={batch.teacherList}
          columns={[
            {
              dataRenderer: (data: any) => (
                <div className="avtar-with-text">
                  <Avatar
                    className="primary-avtar"
                    url={
                      data?.displayPicture
                        ? getAssetUrl(data?.displayPicture)
                        : ''
                    }
                  />
                  <div className="wrap">
                    <p className="avtar-name m-0">{data.name}</p>
                  </div>
                </div>
              ),
              title: 'Educators Name',
              width: '40%',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">{data.email}</div>
              ),
              title: 'Email Ids',
              width: '40%',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEducatorClick(data?.id)}
                  >
                    View Details
                  </a>
                </div>
              ),
              title: '',
              width: 'calc(100% - (40% + 40%)))',
            },
          ]}
        /> */}

        <div className="primary-page-header mt-5">
          <div className="wrap">
            <h3>Students</h3>
          </div>
        </div>

        <Form initialValues={params} onSubmit={handleSearch}>
          <div className="row mb-3">
            <div className="col-12">
              <Input
                prefix={<MdSearch />}
                id="searchExam"
                name="q"
                placeholder="Enter here to search for Students"
              />
            </div>
            <button type="submit" className="d-none"></button>
          </div>
        </Form>

        <PaginatedTable
          data={students.students}
          columns={[
            {
              dataRenderer: (data: any) => (
                <div className="avtar-with-text">
                  <Avatar
                    className="primary-avtar"
                    url={
                      data?.user?.displayPicture
                        ? getAssetUrl(data?.user?.displayPicture)
                        : ''
                    }
                  />
                  <div className="wrap">
                    <p className="avtar-name m-0">
                      {data?.user?.name ? data?.user?.name : 'Not Available'}
                    </p>
                  </div>
                </div>
              ),
              title: 'Student Name',
              width: '25%',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">{data?.user?.email}</div>
              ),
              title: 'Email Ids',
              width: '25%',
            },
            // {
            //   dataRenderer: (data: any) => (
            //     <div className="primary-text"></div>
            //   ),
            //   title: 'Attendance',
            //   width: '25%',
            // },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {moment(data?.createdAt).format('D MMM YYYY')}
                </div>
              ),
              title: 'Purchased Date',
              width: '25%',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => onStudentClick(data?.user?._id)}
                  >
                    View Details
                  </a>
                </div>
              ),
              title: '',
              width: 'calc(100% - (25% + 25% + 25%))',
            },
          ]}
          totalItems={students.totalItems}
          onPageChange={page => {
            setParams({ ...params, page });
          }}
          itemsPerPage={10}
          currentPage={params.page || 1}
        />
      </section>
    </>
  );
};

export default BatchReport;

import {
  // IconButton,
  PageHeader,
  PaginatedTable,
  Loader,
} from '@lipihipi/ec-ui';
import { DateTime, Form, Input, Select } from '@lipihipi/form';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Styled from 'styled-components';
import ITestReportProps from './test.types';
import { CSVLink } from 'react-csv';
import { MdSearch } from 'react-icons/md';
import { Button } from 'react-bootstrap';

export const Avatar = Styled.div<{ url: string }>`
	background-image: url(${({ url }: any) => url});
`;

// const mapOptions = (values: any[]) => {
//   return values.map(value => ({ label: value.name, value: value._id }));
// };

const TestReports = ({
  getUserTestEnrollment,
  testId,
  getAssetUrl,
  // getCourses,
  breadCrumbs,
  onShowResult,
  onCheckAnswer,
  onDescriptiveResult,
}: ITestReportProps) => {
  const [testReport, setTestReport] = useState<any>({
    totalItems: 0,
    userTestEnrollments: [],
  });
  // const [courses, setCourses] = useState<any>({
  //   totalItems: 0,
  //   courses: [],
  // });
  const [params, setParams] = useState<any>({
    populate: true,
    page: 1,
    isRecent: true,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    getUserTestEnrollment({ ...params, test: testId }).then(({ data }: any) => {
      setIsLoading(false);
      setTestReport(data);
    });
  }, [params]);

  //  useEffect(() => {
  //    getCourses({ populate: true, all: true }).then(({ data }: any) => {
  //      setIsLoading(false);
  //      setCourses(data);
  //    });
  //  }, []);

  const handleSearch = (values: any) => {
    console.log(values);
    setParams({
      ...values,
      isRecent: true,
      page: 1,
    });
  };

  const exportToExcel = () => {
    let testReportData = testReport.userTestEnrollments;
    const excelData: any = [];
    if (testReportData?.length > 0) {
      testReportData.forEach((test: any) => {
        const latestAttempt = test?.attempts[test?.attempts?.length - 1]
          ?.startedAt
          ? moment(
              test?.attempts[test?.attempts?.length - 1]?.startedAt
            ).format('ddd, ll')
          : '-';
        const studentDetails = {
          'Student Name': test?.user?.name,
          'Attempt Date': latestAttempt,
          Score: `${
            Math.ceil(
              test?.attempts[test?.attempts?.length - 1]?.achievedScore
            ) || 0
          } / ${test?.totalMarks || 0}`,
          'Answered Root': test?.assignment?.name
            ? test?.assignment?.name
            : test?.testBundle?.name
            ? test?.testBundle?.name
            : test?.batch?.name
            ? test?.batch?.name
            : 'Not Available',
        };
        excelData.push(studentDetails);
      });
    }
    return excelData;
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={testReport?.userTestEnrollments[0]?.name}
          breadCrumbs={
            breadCrumbs || [
              { title: 'Reports', link: '/' },
              { title: 'Tests', link: '/' },
              { title: 'Test name will come here' },
            ]
          }
          // component={
          //   <IconButton className="primary-outine-button">
          //     <HiDownload />
          //     Download Report
          //   </IconButton>
          // }
        />

        <Form
          initialValues={params}
          onSubmit={handleSearch}
          render={({ submitForm }: any) => (
            <div className="row">
              <div className="col-md-6">
                <Input
                  prefix={<MdSearch />}
                  id="searchExam"
                  name="q"
                  placeholder="Enter here to search"
                />
              </div>
              <div className="col-md-3">
                <DateTime
                  name={`date`}
                  id={`date`}
                  label=""
                  placeholderText="Select Date"
                  dateFormat="MMMM d, yyyy"
                  onChange={submitForm}
                  isClearable
                />
              </div>
              <div className="col-md-3">
                <Select
                  id="answeredRoot"
                  name="answeredRoot"
                  placeholder="Select Answered Root"
                  options={[
                    { label: 'All', value: '' },
                    { label: 'Assignment', value: 'ASSIGNMENT' },
                    { label: 'Batch', value: 'BATCH' },
                    { label: 'Test Bundle', value: 'TESTBUNDLE' },
                  ]}
                  onChange={submitForm}
                />
              </div>
              <Button name="Export" id="Export" onClick={() => exportToExcel()}>
                <CSVLink
                  data={exportToExcel()}
                  filename={`${testReport?.userTestEnrollments[0]?.name} Reports.csv`}
                  target="_blank"
                >
                  <li className="gv-list export-list">Download</li>
                </CSVLink>
              </Button>
              <button type="submit" className="d-none">
                Search
              </button>
            </div>
          )}
        />

        <PaginatedTable
          data={testReport?.userTestEnrollments}
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
                  {data?.user ? (
                    <div className="wrap">
                      <p className="avtar-name">{data?.user?.name}</p>
                      <p className="avtar-email m-0">{data?.user?.email}</p>
                    </div>
                  ) : (
                    <p className="avtar-name">-</p>
                  )}
                </div>
              ),
              title: 'Student Name',
              width: 'calc(100% - (150px + 200px + 100px + 150px))',
            },
            {
              dataRenderer: (data: any) =>
                data?.attempts ? (
                  <div className="primary-text">
                    {data?.attempts[data?.attempts?.length - 1]?.startedAt
                      ? moment(
                          data?.attempts[data?.attempts?.length - 1]?.startedAt
                        ).format('ddd, ll')
                      : '-'}
                  </div>
                ) : (
                  <div className="primary-text">-</div>
                ),
              title: 'Attempt Date',
              width: '150px',
            },
            {
              dataRenderer: (data: any) => {
                return data?.assignment?.name ? (
                  <div className="primary-text">{data?.assignment?.name}</div>
                ) : data?.testBundle?.name ? (
                  <div className="primary-text">{data?.testBundle?.name}</div>
                ) : data?.batch?.name ? (
                  <div className="primary-text">{data?.batch?.name}</div>
                ) : (
                  <div className="primary-text">Not Available</div>
                );
              },
              title: 'Answered Root',
              width: '200px',
            },
            {
              dataRenderer: (data: any) =>
                data?.attempts ? (
                  <div className="primary-text">
                    {Math.ceil(
                      data?.attempts[data?.attempts?.length - 1]?.achievedScore
                    ) || 0}
                    /{data?.totalMarks || 0}
                  </div>
                ) : (
                  <div className="primary-text">-</div>
                ),
              title: 'Score',
              width: '100px',
            },
            {
              dataRenderer: (data: any) => {
                return data?.test?.isDescriptive ? (
                  data?.test?.isDescriptive && !data?.attempts?.evaluated ? (
                    <div className="primary-text">
                      <a
                        onClick={() =>
                          onCheckAnswer(
                            data?.attempts[data?.attempts?.length - 1]
                          )
                        }
                      >
                        Check Answer
                      </a>
                    </div>
                  ) : (
                    <div className="primary-text">
                      <a
                        onClick={() =>
                          onDescriptiveResult(
                            data?.attempts[data?.attempts?.length - 1]
                          )
                        }
                      >
                        View Report
                      </a>
                    </div>
                  )
                ) : (
                  <div className="primary-text">
                    <a
                      onClick={() =>
                        onShowResult(data?.attempts[data?.attempts?.length - 1])
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      View Report
                    </a>
                  </div>
                );
              },
              title: '',
              width: '150px',
            },
          ]}
          totalItems={testReport?.totalItems}
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          itemsPerPage={10}
          currentPage={params.page || 1}
        />
      </section>
    </>
  );
};

export default TestReports;

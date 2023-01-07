import { PageHeader, PaginatedTable, Loader } from '@lipihipi/ec-ui';
import { Form, Input, Select } from '@lipihipi/form';
import React, { useEffect, useState } from 'react';
// import { CSVLink } from 'react-csv';
import { MdSearch } from 'react-icons/md';
// import { Button } from 'react-bootstrap';
import Styled from 'styled-components';

export const Avatar = Styled.div<{ url: string }>`
	background-image: url(${({ url }: any) => url});
`;

const mapOptions = (values: any[]) => {
  return values.map((value) => ({ label: value.name, value: value._id }));
};

const TestList = ({
  getTests,
  breadCrumbs,
  getCourses,
  getAssetUrl,
  onReportClick,
}: any) => {
  const [tests, setTests] = useState<any>({
    totalItems: 0,
    questionSets: [],
  });
  const [courses, setCourses] = useState<any>({
    totalItems: 0,
    courses: [],
  });
  const [params, setParams] = React.useState<any>({
    populate: true,
    page: 1,
    isRecent: true,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // const exportToExcel = () => {
  //   let testData = tests.questionSets;
  //   const excelData: any = [];
  //   if (testData?.length > 0) {
  //     testData.forEach((test: any) => {
  //       const studentDetails = {
  //         'Student Name': test?.name,
  //         Course: test?.exam?.course?.name,
  //         'Attached with (Source)': test?.attachedWith?.length
  //           ? test?.attachedWith
  //               ?.map((attachedWith: any) => {
  //                 return attachedWith.name;
  //               })
  //               .join(', ')
  //           : 'Not Available',
  //         'No of Students': test?.noOfStudents,
  //       };
  //       excelData.push(studentDetails);
  //     });
  //   }
  //   return excelData;
  // };

  useEffect(() => {
    getTests({ ...params }).then(({ data }: any) => {
      setIsLoading(false);
      setTests(data);
    });
  }, [params]);

  useEffect(() => {
    getCourses({ populate: true, all: true }).then(({ data }: any) => {
      setIsLoading(false);
      setCourses(data);
    });
  }, []);

  const handleSearch = (values: any) => {
    setParams({
      ...values,
      isRecent: true,
      page: 1,
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title="Test Reports"
          breadCrumbs={
            breadCrumbs || [{ title: 'Reports', link: '/' }, { title: 'Tests' }]
          }
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
                  placeholder="Enter test name to search"
                />
              </div>
              <div className="col-md-4">
                <Select
                  id="course"
                  name="course"
                  placeholder="Select Course"
                  onChange={submitForm}
                  options={[
                    { label: 'All', value: '' },
                    ...mapOptions(courses.courses),
                  ]}
                />
              </div>
              {/* <Button name="Export" id="Export" onClick={() => exportToExcel()}>
                <CSVLink
                  data={exportToExcel()}
                  filename={'Test Reports.csv'}
                  target="_blank"
                >
                  <li className="gv-list export-list">Download</li>
                </CSVLink>
              </Button> */}
              <div className="col-md-3 d-none">
                <Select
                  id="exam"
                  name="exam"
                  onChange={submitForm}
                  placeholder="Select Status"
                  options={[{ label: 'All', value: '' }]}
                />
              </div>
              <button type="submit" className="d-none">
                Search
              </button>
            </div>
          )}
        />

        <PaginatedTable
          onPageChange={(page) => {
            setParams({ ...params, page });
          }}
          totalItems={tests.totalItems}
          currentPage={params.page || 1}
          itemsPerPage={10}
          data={tests.questionSets}
          columns={[
            {
              dataRenderer: (data: any) => (
                <div className="avtar-with-text cursor-pointer">
                  <Avatar
                    className="primary-avtar"
                    url={
                      data?.displayPicture
                        ? getAssetUrl(data?.displayPicture)
                        : ''
                    }
                  />
                  <div className="wrap">
                    <p className="avtar-name m-0">{data?.name}</p>
                  </div>
                </div>
              ),
              title: 'Test Name',
              width: 'calc(100% - (200px + 200px + 200px + 102px))',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {data?.exam?.course?.name
                    ? data?.exam?.course?.name
                    : 'Not Available'}
                </div>
              ),
              title: 'Course',
              width: '200px',
            },
            {
              dataRenderer: (data: any) =>
                data?.attachedWith?.length ? (
                  <div className="primary-text">
                    {data?.attachedWith
                      ?.map((source: any) => {
                        return source?.name;
                      })
                      .join(', ')}
                  </div>
                ) : (
                  <div className="primary-text"> Not Available </div>
                ),
              title: 'Attached with (Source)',
              width: '200px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">{data?.noOfStudents || 0}</div>
              ),
              title: 'No of Students',
              width: '200px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onReportClick(data?._id);
                    }}
                  >
                    View Details
                  </a>
                </div>
              ),
              title: '',
              width: '102px',
            },
          ]}
        />
      </section>
    </>
  );
};

export default TestList;

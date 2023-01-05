import { PageHeader, Pagination, Loader } from '@lipihipi/ec-ui';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Form, Input, Select } from '@lipihipi/form';
import { MdSearch } from 'react-icons/md';
import { IAllListProps } from './types';
import Styled from 'styled-components';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
// import { Line } from 'react-chartjs-2';

export const BatchIcon = Styled.span<{ batchType: string }>`
  display: inline-block;
  width: 11px;
  height: 11px;
  vertical-align: middle;
  border-radius: 50%;
  background-color: ${({ batchType }: any) =>
    batchType === 'recorded' ? '#00BE4C' : '#00B8BE'}
`;

export const BatchType = Styled.span`
    margin: 0 20px 0 10px;
    display: inline-block;
    vertical-align: middle;
`;

const mapSelectValues = (values: any[]) => {
  return values.map(value => {
    return { label: value.name, value: value._id };
  });
};

const activeType = [
  { label: 'Select', value: '' },
  { label: 'Active', value: 'PUBLISH' },
  { label: 'Inactive', value: 'DRAFT' },
];

const typeOfBatches = [
  { label: 'All', value: '' },
  { label: 'Live', value: 'live' },
  { label: 'Recorded', value: 'recorded' },
];

const AllBatches = ({
  getBatches,
  getEducators,
  title,
  breadCrumbs,
  onViewBatchReport,
  getCourses,
}: IAllListProps) => {
  const [batches, setBatches] = React.useState<any>({
    totalItems: 0,
    batches: [],
  });

  const [courses, setCourses] = React.useState<any>({
    courses: [],
    totalItems: 0,
  });

  const [params, setParams] = React.useState<any>({
    populate: true,
    page: 1
  });

  const [batchParams, setBatchParams] = React.useState<any>({
    populate: true,
    all: true
  });

  const [educators, setEducators] = React.useState<any>({
    totalItems: 0,
    educators: [],
  });
  console.log(educators);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handleSearch = (values: any) => {
    // console.log(values)
    setParams({
      page: 1,
      ...values,
    });
    setBatchParams({
      page: 1,
      ...values,
    });
  };

  React.useEffect(() => {
    getBatches(batchParams).then(({ data }: any) => {
      setIsLoading(false);
      setBatches(data);
    });
  }, [params]);

  React.useEffect(() => {
    getEducators({ ...params }).then(({ data }: any) => {
      setIsLoading(false);
      setEducators(data);
    });
    getCourses({ ...params }).then(({ data }: any) => {
      setIsLoading(false);
      setCourses(data);
    });
  }, []);

  const exportToExcel = () => {
    let batchData = batches.batches
    const excelData: any = [];
    if (batchData?.length > 0) {
      batchData.forEach((batch: any) => {
        const studentDetails = {
          "Batch Name": batch?.name,
          "Course": batch?.course?.refId?.name,
          "No of Students": batch?.students?.length
        };
        excelData.push(studentDetails);
      });
    }
    return excelData;
  }

  // const startDate = new Date(4, 25);
  //   const labels: any[]= [];
  //   for (let i = 0; i < 25; i++) {
  //     const date = moment(startDate)
  //       .add(i, "days")
  //       .format("DD/MMM");
  //     labels.push(date.toString());
  //   }

  //   const data = () => {
  //     return {
  //       labels,
  //       datasets: [
  //         {
  //           label: " ",
  //           data: [5, 7, 3, 5, 2, 3, 5, 8, 10, 2, 6],
  //           borderWidth: 1,
  //           fill: false,
  //           borderColor: "#333",
  //         }
  //       ]
  //     };
  //   };

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={title || 'Reports - by Batches'}
          breadCrumbs={breadCrumbs || [{ title: 'Reports by batches' }]}
        />
        {/* <div className="row">  
        <div className="col-md-10">
            <Line
            type = {'line'}
            data={data}
              options={{
                title: {
                  display: true,
                  text: '',
                  fontSize: 20,
                },
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      gridLines: {
                        drawOnChartArea: false,
                        color:'#00a795'
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        drawOnChartArea: false
                      },
                    },
                  ],
                },
                legend: {
                  display: false,
                  position: 'right',
                  color:'#00a795'
                },
              }}/>
        </div>
      </div> */}

        <Form
          initialValues={{ q: '' }}
          onSubmit={handleSearch}
          render={({ submitForm }: any) => (
            <div className="row">
              <div className="col-md-8">
                <Input
                  prefix={<MdSearch />}
                  id="searchExam"
                  name="q"
                  placeholder="Enter here to search for assignment such as by test name or notes name"
                />
              </div>
              <div className="col-md-4">
                <Select
                  id="courseId"
                  name="courseId"
                  placeholder="Select Course"
                  onChange={submitForm}
                  options={[
                    { label: 'All', value: '' },
                    ...mapSelectValues(courses.courses),
                  ]}
                />
              </div>

              <div className="col-md-4">
                <Select
                  id="status"
                  name="status"
                  label="Active Type"
                  placeholder="Select"
                  onChange={submitForm}
                  options={activeType}
                />
              </div>

              {/* <div className="col-md-4">
                <Select
                  id="educator"
                  name="educator"
                  label="Educator  wise Batch Filter"
                  placeholder="Select"
                  onChange={submitForm}
                  options={[
                    { label: 'All', value: '' },
                    ...mapSelectValues(educators.educators),
                  ]}
                />

                <button type="submit" className="d-none"></button>
              </div> */}

              <div className="col-md-4">
                <Select
                  id="batchType"
                  name="batchType"
                  label="Type of Batches"
                  placeholder="Select"
                  onChange={submitForm}
                  options={typeOfBatches}
                />
              </div>
              <Button
                name="Export"
                id="Export"
                onClick={() => exportToExcel()}
              >
                <CSVLink
                  data={exportToExcel()}
                  filename={'Batch Reports.csv'}
                  target="_blank"
                >
                  <li className="gv-list export-list">Download</li>
                </CSVLink>
              </Button>

              {/* <div className="col-md-3">
                <Select
                  id="exam"
                  name="exam"
                  label="Sort by Date"
                  placeholder="Select"
                  options={[{ label: 'All', value: '' }]}
                />
              </div> */}
            </div>
          )}
        />

        <div className="form-group d-flex align-items-center justify-content-end">
          <span>
            <BatchIcon batchType={'live'} />
            <BatchType>Live</BatchType>
          </span>
          <span>
            <BatchIcon batchType={'recorded'} />
            <BatchType>Recorded</BatchType>
          </span>
        </div>

        <div className="batch-accordion test-accordian">
          {batches &&
            batches.batches.map((batch: any) => (
              <>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <p className="d-flex justify-content-between align-items-center pr-4">
                        <div className="d-flex align-items-center">
                          <BatchIcon batchType={batch.batchType} />
                          <BatchType>{batch?.name}</BatchType>
                        </div>
                        <span>
                          {moment(batch?.createdAt).format('D MMM YYYY')}
                        </span>
                      </p>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                      <Card.Body style={{ padding: '15px 17px 17px 40px' }}>
                        <div className="d-flex justify-content-between pr-4">
                          <ul className="simple-table batch-reports">
                            <li>
                              <strong>No of students</strong>
                            </li>
                            <li>
                              <strong>{batch.students.length}</strong>
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
              </>
            ))}
          <Pagination
            totalItems={batches?.totalItems}
            currentPage={params.page || 1}
            itemsPerPage={10}
            onPageChange={(page: number) => {
              setParams({ ...params, page });
              setBatchParams({ ...params, page });
            }}
          />
        </div>
      </section>
    </>
  );
};

export default AllBatches;

import {
  PageHeader,
  PaginatedTable,
  ActionButton,
  ListItemAction,
  Menu,
  Loader,
} from '@lipihipi/ec-ui';
import { DateTime, Form, Input, Select } from '@lipihipi/form';
import React, { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import Styled from 'styled-components';
import moment from 'moment';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IEducatorListProps } from './types';
import { Button } from 'react-bootstrap';
import {CSVLink} from 'react-csv';

export const Avatar = Styled.div<{ url: string }>`
	background-image: url(${({ url }: any) => url});
`;

const status = [
  { label: 'All Status', value: '' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Pending', value: 'PENDING' },
];

const mapOptions = (values: any[]) => {
  return values.map(value => ({ label: value.name, value: value._id }));
};

const EducatorList = ({
  getEducators,
  getAssetUrl,
  getCourses,
  breadCrumbs,
  onReportClick,
  title,
}: IEducatorListProps) => {
  const [educators, setEducators] = useState<any>({
    totalItems: 0,
    educators: [],
  });
  const [allEducators, setAllEducators] = React.useState<any>([]);
  const [courses, setCourses] = useState<any>({
    totalItems: 0,
    courses: [],
  });
  const [params, setParams] = React.useState<any>({
    populate: true,
    page: 1,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    getEducators(params).then(({ data }: any) => {
      // console.log(data);
      setIsLoading(false);
      setEducators(data);
    });
    getEducators({all: true}).then(({ data }: any) => {
      // console.log(data);
      setAllEducators(data?.educators);
    });
  }, [params]);

  useEffect(() => {
    getCourses({ all: true }).then(({ data }: any) => {
      setIsLoading(false);
      setCourses(data);
    });
  }, []);

  const handleSearch = (values: any) => {
    setParams({
      ...values,
      page: 1
    });
  };

  const exportToExcel = () => {
    let educatorData;
    if (params?.startDate || params?.endDate || params?.q || params?.course || params?.status) educatorData = educators?.educators;
    else educatorData = allEducators;
    const excelData: any = [];
    if(educatorData?.length > 0) {
      educatorData.forEach((educator: any) => {
        const educatorDetails = {
          "Educator Name": educator.name,
          "Course": educator?.subjectDetail?.course?.length
          ? educator?.subjectDetail?.course
              ?.map((course: any) => {
                return course?.name;
              })
              .join(', ')
          : 'Not Available',

          "Subject": educator?.subjectDetail?.subjects?.length
          ? educator?.subjectDetail?.subjects
              ?.map((subject: any) => {
                return subject?.name;
              })
              .join(', ')
          : 'Not Available',
          "Joining Date": moment(educator?.createdAt).format('D MMM YYYY'),
          "Status": educator.status
        };
        excelData.push(educatorDetails);
      });
    }
    return excelData;
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className="main-structure">
        <PageHeader
          title={title || 'Reports - by Educators'}
          breadCrumbs={
            breadCrumbs || [
              { title: 'Reports', link: '/' },
              { title: 'Educators Report' },
            ]
          }
        />

        <Form
          initialValues={params}
          onSubmit={handleSearch}
          render={({ submitForm }: any) => (
            <>
              <div style={{float: "right"}}>
                <Button
                  name="Export"
                  id="Export"
                  onClick={() => exportToExcel()}
                >
                  <CSVLink
                    data={exportToExcel()}
                    filename={'Educator Reports.csv'}
                    target="_blank"
                  >
                    <li className="gv-list export-list">Export</li>
                  </CSVLink>
                </Button>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Input
                  prefix={<MdSearch />}
                  id="searchExam"
                  name="q"
                  placeholder="Type here and press Enter"
                />
              </div>
              <div className="col-md-3">
                <Select
                  id="course"
                  name="course"
                  placeholder="Select Course"
                  onChange={submitForm}
                  options={[
                    { label: 'All Courses', value: '' },
                    ...mapOptions(courses.courses),
                  ]}
                />
              </div>
              <div className="col-md-3">
                <Select
                  id="approved"
                  name="status"
                  placeholder="Select Status"
                  onChange={submitForm}
                  options={status}
                />
              </div>
              <div className="col-md-3">
                  <DateTime
                    name={`startDate`}
                    id={`startDate`}
                    label=""
                    dateFormat="MMMM d, yyyy"
                    onChange={submitForm}
                    placeholderText="Start Date"
                    isClearable
                  />
                </div>
                <div className="col-md-3">
                  <DateTime
                    name={`endDate`}
                    id={`endDate`}
                    label=""
                    placeholderText="End Date"
                    dateFormat="MMMM d, yyyy"
                    onChange={submitForm}
                    isClearable
                  />
                </div>
              <button type="submit" className="d-none">
                Search
              </button>
            </div>
            </>

          )}
        />

        <PaginatedTable
          data={educators.educators}
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
              title: 'Educators Name',
              width: '200px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {data?.subjectDetail?.course?.length
                    ? data?.subjectDetail?.course
                        ?.map((course: any) => {
                          return course?.name;
                        })
                        .join(', ')
                    : 'Not Available'}
                </div>
              ),
              title: 'Course(s)',
              width: '200px',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {data?.subjectDetail?.subjects?.length
                    ? data?.subjectDetail?.subjects
                        ?.map((subject: any) => {
                          return subject?.name;
                        })
                        .join(', ')
                    : 'Not Available'}
                </div>
              ),
              title: 'Subject(s) Name',
              width: 'calc(100% - (250px + 250px + 150px + 100px))',
            },
            {
              dataRenderer: (data: any) => (
                <div className="primary-text">
                  {moment(data?.createdAt).format('D MMM YYYY')}
                </div>
              ),
              title: 'Joining Date',
              width: '150px',
            },
            {
              dataRenderer: (data: any) => (
                <>
                  {data.status === 'APPROVED' && (
                    <div className="status approved">{data.status}</div>
                  )}
                  {data.status === 'PENDING' && (
                    <div className="status unapproved text-warning">
                      {data.status}
                    </div>
                  )}
                </>
              ),
              title: 'Status',
              width: '100px',
            },
            {
              dataRenderer: (data: any) => (
                <ListItemAction>
                  <ActionButton>
                    <BsThreeDotsVertical />
                  </ActionButton>
                  <Menu>
                    <li
                      onClick={() => {
                        onReportClick(data?._id);
                      }}
                    >
                      View Report
                    </li>
                  </Menu>
                </ListItemAction>
              ),
              title: '',
            },
          ]}
          totalItems={educators?.totalItems}
          onPageChange={page => {
            setParams({ ...params, page: page });
          }}
          itemsPerPage={10}
          currentPage={params.page || 1}
        />
      </section>
    </>
  );
};

export default EducatorList;

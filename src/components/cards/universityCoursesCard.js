/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

// components
import DropdownMulti from '../general/dropdownMulti';
import Dropdown, { ItemDropdown } from '../general/dropdown';
import { ButtonDefault } from '../styleComponent/button';

// apollo
import client from '../../apollo/client';
import GET_UNIVERSITY_COURSES from '../../queries/university/get-uni-courses';

// utils
import {
  getCategoryList,
  getDurationList,
  getStudyLvlList,
  getTableData,
} from '../../utils/universityUtils';

const UniversityCoursesCard = ({ count, title, isCurrentMobile }) => {
  const [courses, setCourses] = useState(null);

  const categories = useMemo(() => getCategoryList(courses), [courses]);
  const durationList = useMemo(() => getDurationList(courses), [courses]);
  const studyLevelList = useMemo(() => getStudyLvlList(courses), [courses]);
  const [header, body] = useMemo(() => getTableData(courses), [courses]);

  useEffect(async () => {
    if (title) {
      const queryData = await client.query({
        query: GET_UNIVERSITY_COURSES,
        variables: {
          search: title,
        },
      });

      if (queryData?.data) setCourses(queryData?.data?.courses?.nodes);
    }
  }, [title]);

  return (
    <div className="relative mb-6 bg-white border border-gray-200">
      <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
        <span>Study Programmes ({count})</span>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-center space-x-6">
          <div className="w-1/2 md:w-1/3">
            <DropdownMulti
              title="Courses Catégories"
              className="flex items-center justify-between pl-3 text-xs font-normal text-black truncate bg-gray-200 rounded-lg md:pl-4 md:text-base"
              maxHeight="100%"
              classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
              classDropdown="mt-1 rounded-md shadow-lg md:w-700 w-300"
              position="center"
              data={categories || []}
            />
          </div>
          <div className="w-1/2 md:w-1/3">
            <Dropdown
              title="Study Level"
              className="flex items-center justify-between pl-3 text-xs font-normal text-black truncate bg-gray-200 rounded-lg md:pl-4 md:text-base"
              maxHeight="250px"
              classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
              classDropdown="mt-1 rounded-md shadow-lg"
              position="center"
            >
              <ItemDropdown value="" classInactive="font-medium text-custom-primary">
                All Study Level
              </ItemDropdown>
              {studyLevelList &&
                studyLevelList.length > 0 &&
                studyLevelList.map((lvl) => (
                  <ItemDropdown value={lvl} classInactive="text-custom-primary">
                    {lvl}
                  </ItemDropdown>
                ))}
            </Dropdown>
          </div>
          <div className="hidden md:block md:w-1/3">
            <Dropdown
              title="Durations"
              className="flex items-center justify-between pl-2 text-sm font-normal text-black truncate bg-gray-200 rounded-lg md:pl-4 md:text-base"
              maxHeight="250px"
              classChevron="md:p-4 p-3 bg-custom-primary text-white"
              classDropdown="mt-1 rounded-md shadow-lg"
              position="center"
            >
              <ItemDropdown value="" classInactive="font-medium text-custom-primary">
                All Durations
              </ItemDropdown>
              {durationList &&
                durationList.map((duration) => (
                  <ItemDropdown value={duration} classInactive="text-custom-primary">
                    {duration}
                  </ItemDropdown>
                ))}
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="m-3 md:m-6">
        <table className="min-w-full">
          {!isCurrentMobile && (
            <thead className="text-xl font-normal text-gray-400 uppercase">
              <tr>
                {header &&
                  header.map((heading) => (
                    <td className="hidden md:table-cell">{heading.value}</td>
                  ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body &&
              body.map((row) => (
                <tr>
                  {row.isHeading ? (
                    <td
                      colSpan={header.length}
                      className="pt-4 pb-3 text-xl font-normal text-black md:text-2xl md:pt-6"
                    >
                      {row.programme}
                    </td>
                  ) : (
                    header &&
                    header.map((heading) => (
                      <td className="py-1 pl-5 font-normal md:text-lg text-custom-primary">
                        {row[heading.key]}
                      </td>
                    ))
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-4">
        <ButtonDefault className="flex items-center space-x-2 text-sm rounded-lg">
          <FontAwesomeIcon icon={faChevronDown} className="w-3" />
          <span>Show More</span>
        </ButtonDefault>
      </div>
    </div>
  );
};

export default UniversityCoursesCard;

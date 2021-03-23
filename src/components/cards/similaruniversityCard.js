/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

// apollo
import client from '../../apollo/client';
import GET_SIMILAR_UNIVERSITIES from '../../queries/university/get-similar-universities';

const SimilarUniversityCard = ({ type }) => {
  const [universities, setUniversities] = useState(null);

  useEffect(async () => {
    if (type) {
      const queryData = await client.query({
        query: GET_SIMILAR_UNIVERSITIES,
        variables: {
          search: type,
          count: 5,
        },
      });

      if (queryData?.data) setUniversities(queryData?.data?.universities?.nodes);
    }
  }, [type]);

  return (
    <div className="relative mb-6 bg-white border border-gray-200">
      <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
        <span> Similar Universities</span>
      </div>
      <div className="px-4 py-2 md:p-6">
        {universities &&
          universities.map((uni, i) => (
            <div key={i}>
              <div className="flex justify-between space-x-4">
                <div className="flex-1">
                  <Link href={`/university/${uni.slug}`}>
                    <a className="font-normal leading-7 text-black md:text-xl truncate-2-lines max-h-13">
                      {uni.title}
                    </a>
                  </Link>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600 md:text-base">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />{' '}
                      <span>{uni.address}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-none">
                  <img
                    src={uni.featuredImage?.node.link}
                    alt=""
                    className="object-cover h-full rounded-md w-28"
                  />
                </div>
              </div>
              <hr className="my-4 md:my-6" />{' '}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SimilarUniversityCard;

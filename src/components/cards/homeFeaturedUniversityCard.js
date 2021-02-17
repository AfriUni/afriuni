/* eslint-disable indent */
import React from 'react';
import Link from 'next/link';

const HomeFeaturedUniversityCard = (props) => (
  <div className="flex flex-col justify-between h-full bg-white rounded-xl">
    <img
      src={props.data.featuredImage ? props.data.featuredImage.node.sourceUrl : ''}
      alt=""
      className="flex-none w-full h-24 md:h-48 rounded-t-xl"
    />
    <div className="flex flex-col flex-1 p-2 -mt-10 border-b border-l border-r border-gray-200 rounded-b-xl md:p-6 md:-mt-16">
      <div className="flex-none">
        <div className="inline-block p-2 bg-white border border-gray-200 rounded-xl md:mb-2">
          <img src={props.data.logo} alt="" className="w-10 h-10 md:h-14 md:w-12" />
        </div>
      </div>
      <Link href={`/university/${props.data.databaseId}`}>
        <a className="flex-1 block h-8 mb-2 text-sm font-medium leading-4 text-custom-primary md:text-2xl md:my-2 truncate-2-lines md:h-20 md:leading-7">
          {props.data.title}
        </a>
      </Link>
      <div className="flex flex-col flex-1 space-y-1 md:flex-row md:space-y-0 md:justify-between md:items-center">
        <div className="text-xs text-gray-400 md:text-sm">
          {props.data.locations.nodes.map((loc, i) => {
            let coma = '';
            if (i > 0) coma += ', ';
            return (
              <span key={i} className="capitalize">
                {coma}
                {loc.name}
              </span>
            );
          })}
        </div>
        <div className="text-xs text-custom-secondary md:text-sm">
          {props.data.course_count} Courses
        </div>
      </div>
    </div>
  </div>
);

export default HomeFeaturedUniversityCard;

/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';

const HomeFeaturedCourseCard = (props) => (
  <div className="flex-col inline-block p-2 bg-white md:p-6 rounded-xl md:flex">
    <div className="flex-none">
      <div className="hidden px-4 py-1 text-xs border rounded border-custom-primary text-custom-primary md:inline-block">
        {props.data.studiesLevel?.nodes[0].name}
      </div>
    </div>
    <Link href={`/course/${props.data.databaseId}/${props.data.slug}`}>
      <a className="flex-1 block mb-3 font-medium leading-6 break-words text-custom-secondary md:text-xl md:mt-5 truncate-2-lines max-h-12 md:max-h-16 md:leading-8">
        {props.data.title}
      </a>
    </Link>
    <div className="flex items-end justify-between flex-1 w-full">
      <div className="w-full">
        {/*<div className="text-sm font-medium text-custom-primary md:text-custom-primary_2 md:text-lg">*/}
          <Link href={`/university/${props.data.university?.nodes[0].slug}`}>
            <a className={"text-sm font-medium text-custom-primary md:text-custom-primary_2 md:text-lg"}>{props.data.university?.nodes[0].title}</a>
          </Link>
        {/*</div>*/}
        <div className="flex items-center justify-between w-full mt-1 font-medium md:font-normal md:mt-0">
          <div className="text-xs text-gray-400 md:text-base">
            {props.data.university?.nodes[0].locations.nodes.map((loc, i) => {
              let coma = '';
              if (i > 0) coma += ', ';
              return (
                <span key={i} className="lowercase capitalize">
                  {coma}
                  {loc.name}
                </span>
              );
            })}
          </div>
          <div className="ml-4 text-xs text-gray-400 md:text-base md:hidden">
            {props.data.studiesLevel?.nodes[0].name}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={props.data.university?.nodes[0].logo}
          alt=""
          className="object-contain w-20 h-20"
        />
      </div>
    </div>
  </div>
);

export default HomeFeaturedCourseCard;

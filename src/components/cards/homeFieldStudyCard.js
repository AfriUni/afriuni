/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Link from 'next/link';

const HomeFieldStudyCard = (props) => (
  <div className="flex justify-center flex-1 p-3 bg-white shadow-xl md:p-6 rounded-xl">
    <Link href={`/discipline/${props.slug}`}>
      <a className="relative flex flex-col items-center space-y-4">
        <div className="relative">
          <img className="object-cover w-full h-16 md:h-40" src={props.image} alt={props.title} />
        </div>
        <div className="text-sm font-bold text-center break-words md:text-2xl">{props.title}</div>
      </a>
    </Link>
  </div>
);

export default HomeFieldStudyCard;

import React from 'react';

const OfficialCard = (props) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <img src={props.data.image} alt="" className="object-fill w-full md:h-56 flex-none" />
      <div className="p-4 flex flex-col flex-1">
        <div className="font-medium text-sm md:text-base mb-3">{props.data.name}</div>
        <div className="text-gray-600 font-thin md:text-sm text-xs">
            {props.data.post}
        </div>
      </div>
    </div>
  );
};

export default OfficialCard;

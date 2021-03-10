import React from 'react';

const OfficialCard = (props) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <img src="../official.jpg" alt="" className="object-fill w-full md:h-44 flex-none" />
      <div className="p-4 flex flex-col flex-1">
        <div className="font-medium text-sm md:text-base mb-3">Prof. Mamokgethi Phakeng</div>
        <div className="text-gray-600 font-thin md:text-sm text-xs">
          Dean of the Faculty of Commerce
        </div>
      </div>
    </div>
  );
};

export default OfficialCard;

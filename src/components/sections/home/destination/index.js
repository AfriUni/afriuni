import React from 'react';
import Link from 'next/link';
import DestinationCard from '../../../cards/destinationCard';

const DestinationSection = (props) => {
  return (
    <div className="pt-6 md:pt-16 pb-6 md:pb-14 bg-white transform skew-y-3 mt-16 relative mb-6 md:mb-24">
      <div className="bg-white h-24 md:h-56 absolute bottom-0 right-0 left-0 transform -skew-y-6 translate-y-10 md:translate-y-28 z-0" />

      <div className="container mx-auto px-4 transform -skew-y-3">
        <h3 className="text-2xl md:text-5xl font-medium text-custom-primary_2 text-center mt-5 md:mb-10">
          Study Destinations
        </h3>

        <div className="mt-5 md:mt-10 grid md:grid-cols-5 grid-cols-2 gap-x-3 md:gap-x-6 gap-y-4 md:gap-y-8 justify-center items-center">
          {props.data.countries.nodes.map((item, i) => {
            return <DestinationCard image={item.image} name={item.name} slug={item.slug} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DestinationSection;

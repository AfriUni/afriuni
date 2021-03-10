import React from 'react';
import Link from 'next/link';
import HomeFieldStudyCard from '../../../cards/homeFieldStudyCard';

const FieldStudySection = (props) => {
  return (
    <div className="pt-4 md:pt-14 pt-4 md:pb-14">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-5xl font-medium text-custom-secondary text-center mt-5 md:mb-10">
          Fields of Study
        </h3>

        <div className="mt-5 md:mt-10 grid md:grid-cols-5 grid-cols-2 gap-x-3 md:gap-x-6 gap-y-4 md:gap-y-8 justify-center">
          {props.data.categories.nodes.slice(0, 15).map((item, i) => {
            return (
              <HomeFieldStudyCard title={item.name} slug={item.slug} image={item.logo} key={i} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FieldStudySection;

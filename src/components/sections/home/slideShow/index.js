import React from 'react';
import Slider from 'react-slick';
import { SlideShowContainer } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown, { ItemDropdown } from '../../../general/dropdown';
import { Input } from '../../../styleComponent/input';
import { ButtonRedPrimary } from '../../../styleComponent/button';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';

const SlideShowSection = (props) => {
  const slideshow = React.useRef(null);
  const [dataSlider, setDataSlider] = React.useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    accessibility: false,
  };

  React.useEffect(() => {
    const results = props.data.universitiesFeatured.nodes;
    const datas = [];

    results.map((item, i) => {
      const lists = item.featured_list.nodes;
      const listsPrio = item.featured_data;

      lists.map((subitem, i) => {
        if (datas.length < 10) {
          const currentItem = subitem;
          const images = listsPrio.filter((order) => parseInt(order.id) === subitem.databaseId);

          currentItem['image'] = images[0].image;

          datas.push(currentItem);
        }
      });
    });

    setDataSlider(datas);
  }, [props.data]);

  return (
    <SlideShowContainer className={`relative z-10`}>
      <div className="relative">
        <div className="absolute left-0 right-0 flex items-center justify-center z-10 md:mt-48 mt-20">
          <div className="flex flex-col items-center md:w-1/2 lg:w-2/3 px-6 md:px-0">
            <div className="text-2xl md:text-5xl font-medium text-white mb-2 md:mb-6 text-center">
              Find University Courses across Africa
            </div>
            <div className="flex justify-center w-full">
              <div className={'grid grid-cols-12 gap-x-3 w-full'}>
                <div className="md:col-span-2 hidden md:block">
                  <Dropdown
                    title={'Country'}
                    className="bg-white py-4 px-4 flex justify-between items-center text-custom-primary truncate rounded-lg"
                    maxHeight="250px"
                    classDropdown="mt-1 rounded-md shadow-lg"
                    position="center"
                  >
                    <ItemDropdown value={'Country'} classInactive="font-medium text-custom-primary">
                      Select country
                    </ItemDropdown>
                    <ItemDropdown value={'Cameroon'} classInactive="text-custom-primary">
                      Cameroon
                    </ItemDropdown>
                    <ItemDropdown value={'South Africa'} classInactive="text-custom-primary">
                      South Africa
                    </ItemDropdown>
                    <ItemDropdown value={'France'} classInactive="text-custom-primary">
                      France
                    </ItemDropdown>
                  </Dropdown>
                </div>
                <Input
                  className={
                    'h-10 md:h-14 text-sm md:text-base col-span-8 md:col-span-8 form-input'
                  }
                  placeholder="Search Courses  e.g Nursing, Economics, Computer Science, Agriculture"
                />
                <ButtonRedPrimary className="h-10 md:h-14 col-span-4 md:col-span-2 flex items-center justify-center text-sm md:text-lg rounded-lg">
                  Search
                </ButtonRedPrimary>
              </div>
            </div>
          </div>
        </div>

        <Slider {...settings} ref={slideshow} className="overflow-hidden relative">
          {dataSlider.map((item, i) => {
            return (
              <div className="relative h-300 md:h-500" key={i}>
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: "url('" + item.image + "')" }}
                ></div>
                <div className="absolute inset-0 bg-cover bg-black bg-opacity-25" />
                <div className="absolute bottom-0 left-0 py-4 px-2 md:px-6 font-medium text-white text-sm md:text-base">
                  {item.title}
                </div>
                <div className="absolute bottom-0 right-0 py-4 px-2 md:px-4 font-medium text-white text-sm md:text-base flex items-end">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 mr-3" />
                  {item.locations.nodes.map((loc, i) => {
                    let coma = '';
                    if (i > 0) coma += ', ';
                    return (
                      <span key={i} className={'lowercase capitalize'}>
                        {coma}
                        {loc.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </SlideShowContainer>
  );
};

// export default SlideShowSection;
export default compose(inject('header'), observer)(SlideShowSection);

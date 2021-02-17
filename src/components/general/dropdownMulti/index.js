import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Link from 'next/link';

const DropdownMulti = ({
  title,
  className = '',
  classDropdown = '',
  classChevron = '',
  position = 'right',
  maxHeight = '',
  data = [],
}) => {
  const [initPosition, setInitPosition] = React.useState('origin-top-right right-0');
  const [isOpen, setIsOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [clickedTab, setClickedTab] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState(title);
  const [currentParent, setCurrentParent] = React.useState('');
  const [currentIndexTab, setCurrentIndexTab] = React.useState(null);
  const [currentIndexLink, setCurrentIndexLink] = React.useState(null);

  const [currentData, setCurrentData] = React.useState([]);
  const container = React.useRef(null);

  React.useEffect(() => {
    if (position === 'right') setInitPosition('origin-top-right right-0 ');
    if (position === 'left') setInitPosition('origin-top-left left-0');
    if (position === 'center') setInitPosition('origin-center left-0 right-0');
  }, [position]);

  React.useEffect(() => {
    window.addEventListener('click', addBackDrop);

    return () => {
      window.removeEventListener('click', addBackDrop);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (data) setCurrentData(data);
  }, [data]);

  const addBackDrop = (e) => {
    const currentClick = e.target;

    if (container.current !== null) {
      const checkContainer = container.current.contains(currentClick);
      if (!checkContainer) {
        setIsOpen(false);
      }
    }
  };

  const closeTabContent = () => {
    setClickedTab(false);
    setIsOpen(true);
  };

  const openDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSelectTab = (index, lastIndex, event) => {
    setTabIndex(index);
    setClickedTab(true);

    const currentTitle = currentData.filter((order, indexL) => indexL === index);
    setCurrentParent(currentTitle[0].name);
  };

  const onSelectSubTab = (e, index, value) => {
    e.preventDefault();
    setIsOpen(false);
    setCurrentTitle(value);
    setClickedTab(true);
    setCurrentIndexLink(index);
    setCurrentIndexTab(tabIndex);
  };

  const resetTab = () => {
    setClickedTab(false);
    setTabIndex(0);
    setCurrentIndexTab(0);
    setCurrentIndexLink(0);
    setCurrentTitle(title);
  };

  return (
    <div className="relative" ref={container}>
      <div className={className} onClick={openDropdown}>
        {currentTitle}{' '}
        <div className={classChevron}>
          <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute z-20 ${initPosition} ${classDropdown}`}>
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="overflow-y-auto p-4"
              style={{ maxHeight: maxHeight }}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="mb-4 pb-2 flex justify-between items-center border-b border-gray-400 md:text-base text-sm">
                <div className={`text-custom-primary_2 ${clickedTab ? 'hidden' : ''}`}>
                  <span>{title}</span>
                </div>
                <div
                  onClick={closeTabContent}
                  className={`cursor-pointer flex items-center space-x-3 font-normal ${
                    !clickedTab ? 'hidden' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-2" />{' '}
                  <span>{currentParent}</span>
                </div>
                <span className="md:text-sm text-xs text-black cursor-pointer" onClick={resetTab}>
                  Reset
                </span>
              </div>
              <Tabs className="relative h-full" selectedIndex={tabIndex} onSelect={onSelectTab}>
                <TabList
                  className={`${
                    !clickedTab ? 'grid' : 'hidden'
                  } md:grid-cols-4 grid-cols-2 md:gap-2 gap-3`}
                >
                  {currentData.map((data, index) => {
                    return (
                      <Tab
                        className={`text-xs md:text-sm font-normal hover:text-custom-secondary cursor-pointer`}
                        key={index}
                        selectedClassName={`text-custom-secondary focus:outline-none`}
                      >
                        <h3 className="">{data.name}</h3>
                      </Tab>
                    );
                  })}
                </TabList>
                <div className={`bg-white ${clickedTab ? 'block' : 'hidden'}`}>
                  {currentData.map((data, indexP) => {
                    return (
                      <TabPanel
                        className="opacity-0"
                        selectedClassName="opacity-100 bg-white"
                        key={indexP}
                      >
                        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-2 gap-3 text-xs md:text-sm">
                          {data.subMenu.map((sub, index) => {
                            return (
                              <Link href="#" key={index}>
                                <a
                                  className={`font-light hover:text-custom-secondary block ${
                                    index === currentIndexLink && currentIndexTab === indexP
                                      ? 'text-custom-secondary'
                                      : ''
                                  }`}
                                  onClick={(e) => onSelectSubTab(e, index, sub.name)}
                                >
                                  {sub.name}
                                </a>
                              </Link>
                            );
                          })}
                        </div>
                      </TabPanel>
                    );
                  })}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMulti;

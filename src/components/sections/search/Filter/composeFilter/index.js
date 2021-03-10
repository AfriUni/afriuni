import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ComposeFilter = (props) => {
  const [datas, setDatas] = React.useState([]);
  const [selectParent, setSelectParent] = React.useState(false);
  const [parent, setParent] = React.useState('');
  const [currentParentData, setCurrentParentData] = React.useState([]);

  const [queryData, setQueryData] = React.useState([]);
  const [queryDataParent, setQueryDataParent] = React.useState([]);

  const [showCount, setShowCount] = React.useState(0);

  Array.prototype.inArray = function (comparer) {
    for (let i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }
    return false;
  };

  Array.prototype.pushIfNotExist = function (element, comparer) {
    if (!this.inArray(comparer)) {
      this.push(element);
    }
  };

  React.useEffect(() => {
    setDatas(props.data);
    if (props.showCount && props.showCount > 0) {
      setShowCount(props.showCount);
    } else {
      setShowCount(props.data.length);
    }
  }, [props.data]);

  React.useEffect(() => {
    if (props.onChange) props.onChange(queryData);
  }, [queryData]);

  const currentCities = (data) => {
    const currentQuery = queryData;
    let count = 0;

    data.children.map((child) => {
      if (currentQuery.includes(child.slug)) count++;
    });

    return count;
  };

  const onSelectParent = (slug, reselect = false) => {
    const parentData = datas.filter((order) => order.slug === slug);

    if (props.multiData) {
      const oldValue = queryData;

      queryParent(slug, reselect, oldValue);

      if (!oldValue.includes(slug)) {
        let existParent = false;

        parentData[0].children.map((child) => {
          if (oldValue.includes(child.slug)) {
            existParent = true;
          }
        });

        if (!existParent) {
          oldValue.pushIfNotExist(slug, function (e) {
            return e === slug;
          });
        }

        if (reselect) {
          parentData[0].children.map((child) => {
            const index = oldValue.indexOf(child.slug);
            if (index !== -1) {
              oldValue.splice(index, 1);
            }
          });
        }

        setSelectParent(true);
        setQueryData(oldValue);
        setCurrentParentData(parentData);
      } else {
        if (!reselect) {
          const index = oldValue.indexOf(slug);
          if (index !== -1) {
            oldValue.splice(index, 1);
          }
          setSelectParent(true);
          setSelectParent(false);
          setQueryData(oldValue);
          setCurrentParentData(parentData);
        } else {
          oldValue.pushIfNotExist(slug, function (e) {
            return e === slug;
          });
          parentData[0].children.map((child) => {
            const index = oldValue.indexOf(child.slug);
            if (index !== -1) {
              oldValue.splice(index, 1);
            }
          });
          setQueryData(oldValue);
          setCurrentParentData(parentData);
        }
      }
    } else {
      setCurrentParentData(parentData);

      const dataToSave = [slug];
      setQueryData(dataToSave);

      // setParent(slug)
      setSelectParent(true);
    }

    if (props.onChange) props.onChange(queryData);
  };

  const queryParent = (slug, reselect, queryValue) => {
    const oldValue = queryDataParent;
    const currentParent = datas.filter((order) => order.slug === slug);
    let existInQuery = false;

    // check if some child of current Parent exist inside the queryData
    // if(queryValue.includes(slug)){
    //     existInQuery = true;
    // }else{
    currentParent[0].children.map((child) => {
      if (queryValue.includes(child.slug)) {
        existInQuery = true;
      }
    });
    // }

    if (!oldValue.includes(slug)) {
      oldValue.pushIfNotExist(slug, function (e) {
        return e === slug;
      });
    } else {
      if (!reselect && !existInQuery) {
        const index = oldValue.indexOf(slug);
        if (index !== -1) {
          oldValue.splice(index, 1);
        }
      }
    }

    setQueryDataParent(oldValue);
    setCurrentParentData(currentParent);
  };

  const unSelectParent = () => {
    setParent('');
    setSelectParent(false);
    if (!props.multiData) {
      setQueryData([]);
    }
    if (props.onChange) props.onChange(queryData);
  };

  const onSelectChild = (parent, slug) => {
    const oldValue = queryData;

    if (oldValue.includes(parent)) {
      const index = oldValue.indexOf(parent);
      if (index !== -1) {
        oldValue.splice(index, 1);
      }
    }

    if (!props.multiData) {
      currentParentData[0].children.map((child) => {
        const index = oldValue.indexOf(child.slug);
        if (index !== -1) {
          oldValue.splice(index, 1);
        }
      });
    }

    if (props.multiData) {
      if (!oldValue.includes(slug)) {
        oldValue.pushIfNotExist(slug, function (e) {
          return e === slug;
        });
      } else {
        const index = oldValue.indexOf(slug);
        if (index !== -1) {
          oldValue.splice(index, 1);
        }
      }

      let ExistChildParent = false;
      currentParentData[0].children.map((child) => {
        if (oldValue.includes(child.slug)) ExistChildParent = true;
      });

      if (!ExistChildParent) oldValue.push(parent);
    } else {
      oldValue.push(slug);
    }

    setQueryData(oldValue);
    const parentData = datas.filter((order) => order.slug === parent);
    setCurrentParentData(parentData);

    if (props.onChange) props.onChange(queryData);
  };

  const onClickShowMore = () => {
    if (showCount === datas.length) {
      setShowCount(props.showCount);
    } else {
      setShowCount(datas.length);
    }
  };

  return (
    <div className="relative">
      {!selectParent && (
        <div className="flex flex-col text-lg font-light space-y-1">
          {datas.slice(0, showCount).map((data, index) => (
            <label className={`inline-flex items-center cursor-pointer`} key={index}>
              <input
                type="checkbox"
                checked={queryDataParent.includes(data.slug)}
                onChange={() => onSelectParent(data.slug, false)}
                className="rounded border-gray-300 shadow-sm focus:border-0 focus:ring-0"
              />
              <span className="ml-2 flex justify-between items-center w-full">
                <span>
                  {data.name} <span className="text-sm text-gray-400">({data.count})</span>
                </span>
                {currentCities(data) > 0 ? (
                  <span className="italic text-sm font-normal">
                    {currentCities(data)} town(s) selected
                  </span>
                ) : (
                  <>
                    {queryDataParent.includes(data.slug) && (
                      <span className="italic text-sm font-normal">Click to remove</span>
                    )}
                  </>
                )}
              </span>
            </label>
          ))}

          {props.showCount && (
            <div
              className="mt-5 font-medium underline flex items-center cursor-pointer text-custom-primary"
              onClick={onClickShowMore}
            >
              <span className={'mr-4'}>
                {' '}
                {showCount === datas?.length
                  ? 'Less More'
                  : 'See ' + (datas.length - showCount) + ' More'}
              </span>
            </div>
          )}
        </div>
      )}

      {selectParent && (
        <div className="bg-white flex flex-col text-lg font-light space-y-1">
          {/*subList*/}
          <div
            className="flex items-center space-x-2 text-custom-primary font-normal mb-3 cursor-pointer"
            onClick={unSelectParent}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-base" />{' '}
            <span>{props.backTitle}</span>
          </div>
          <div className="">
            <div
              className={`capitalize cursor-pointer ${
                queryData.includes(currentParentData[0].slug) ? 'font-normal' : ''
              }`}
              onClick={() => onSelectParent(currentParentData[0].slug, true)}
            >
              {currentParentData[0].name}{' '}
              <span className="text-sm text-gray-400">({currentParentData[0].count})</span>
            </div>

            <div className="pl-3 flex flex-col text-lg font-light space-y-1 mt-3">
              {currentParentData[0].children.map((data, index) => (
                <label
                  className={`inline-flex items-center cursor-pointer ${
                    queryData.includes(data.slug) ? 'font-normal' : ''
                  }`}
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={queryData.includes(data.slug)}
                    onChange={() => onSelectChild(currentParentData[0].slug, data.slug)}
                    className="rounded border-gray-300 shadow-sm focus:border-0 focus:ring-0"
                  />
                  <span className="ml-2">
                    {data.name} <span className="text-sm text-gray-400">({data.count})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposeFilter;

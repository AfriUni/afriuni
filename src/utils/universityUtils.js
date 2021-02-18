export const getLocationData = (nodes) => {
  const payload = {
    city: '',
    country: '',
    flag: '',
  };

  if (!nodes) return payload;

  payload.city = nodes.find((x) => !x.is_country)?.name;
  payload.country = nodes.find((x) => x.is_country)?.name;
  payload.countrySlug = nodes.find((x) => x.is_country)?.slug;
  payload.flag = nodes.find((x) => x.is_country)?.flag;

  return payload;
};

export const getCategoryList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.specialisations?.nodes && course.specialisations?.nodes.length > 0) {
      course.specialisations?.nodes.map((spec) => {
        mainCategories.push(spec.name);
      });
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

export const getDurationList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.duration_time) {
      mainCategories.push(`${course.duration_time.time_number} ${course.duration_time.time_month}`);
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

export const getStudyLvlList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.studiesLevel.nodes && course.studiesLevel.nodes.length > 0) {
      course.studiesLevel.nodes.map((lvl) => {
        mainCategories.push(lvl.name);
      });
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

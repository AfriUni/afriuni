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
  if (courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.specialisations?.nodes && course.specialisations?.nodes.length > 0) {
    }
  });
};

export const checkCategoryAvailability = categories => {
  let availableCategories = [];

  categories.forEach(category => {
    if (category.slotQuota - category.totalRegistrants > 0) {
      availableCategories.push(category.distance);
    }
  });

  return availableCategories;
};

export const checkCategoryAvailabilityInAll = categories => {
  let totalSlotQuotaInAllCategories = 0;
  let totalRegistrantsInAllCategories = 0;

  categories.forEach(category => {
    totalSlotQuotaInAllCategories += category.slotQuota;
    totalRegistrantsInAllCategories += category.totalRegistrants;
  });
  return totalSlotQuotaInAllCategories - totalRegistrantsInAllCategories > 0
    ? true
    : false;
};

import { ref, computed } from 'vue';

export const useSort = (availableItems, sortField = '') => {
  const sorting = ref(null);

  const displatedItems = computed(function () {
    if (!sorting.value) {
      return availableItems.value;
    }
    return availableItems.value.slice().sort((item1, item2) => {
      if (sorting.value === 'asc' && item1[sortField] > item2[sortField]) {
        return 1;
      } else if (sorting.value === 'asc') {
        return -1;
      } else if (
        sorting.value === 'desc' &&
        item1[sortField] > item2[sortField]
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  function sort(mode) {
    sorting.value = mode;
  }

  return {
    sorting,
    displatedItems,
    sort,
  };
};

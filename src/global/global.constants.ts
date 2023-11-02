export const globalConstants = {
  features: {
    getDateString: (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dates = date.getDate();
      return `${year}-${month}-${dates}`;
    },
  },
};

const convertDate = (date: Date) => {
  return new Date(date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
};
export default convertDate
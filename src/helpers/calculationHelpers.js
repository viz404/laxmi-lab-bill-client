function formatDate(date) {
  if (date) {
    let dateValue = new Date(date);
    return new Intl.DateTimeFormat("en-IN").format(dateValue);
  }

  return "";
}

export default {
  formatDate,
};

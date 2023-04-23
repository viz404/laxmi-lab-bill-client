const trimDate = (date) => {
  let modified = "";

  if (date) {
    let dateValue = new Date(date);
    modified = new Intl.DateTimeFormat("en-IN").format(dateValue);
  }

  return modified;
};

export default trimDate;

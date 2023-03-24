const trimDate = (date) => {
  let modified = date.split("T").shift().split("-").reverse();

  return modified.join("/");
};

export default trimDate;

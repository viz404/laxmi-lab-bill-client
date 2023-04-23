const verifyEmptyWorks = (works) => {
  let check = false;
  for (let work of works) {
    if (
      work.topLeft == undefined &&
      work.topRight == undefined &&
      work.bottomLeft == undefined &&
      work.bottomRight == undefined
    ) {
      check = true;
    }
  }
  return check;
};

export default verifyEmptyWorks;

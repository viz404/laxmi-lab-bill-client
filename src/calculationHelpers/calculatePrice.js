const calculatePrice = (works, typeOfWorks) => {
  const numberMap = new Map();
  let total = 0;

  for (let work of typeOfWorks) {
    numberMap.set(work.title, Number(work.price));
  }

  for (let work of works) {
    let currTotal = 0;

    if (work.topLeft) {
      currTotal += work.topLeft.split(",").length * numberMap.get(work.title);
    }

    if (work.topRight) {
      currTotal += work.topRight.split(",").length * numberMap.get(work.title);
    }

    if (work.bottomLeft) {
      currTotal +=
        work.bottomLeft.split(",").length * numberMap.get(work.title);
    }

    if (work.bottomRight) {
      currTotal +=
        work.bottomRight.split(",").length * numberMap.get(work.title);
    }

    total += currTotal;
  }

  return total;
};

export default calculatePrice;

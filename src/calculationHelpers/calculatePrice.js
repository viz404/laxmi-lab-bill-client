const calculatePrice = (selectedWorks, typeOfWorks) => {
  const priceMap = new Map();
  let total = 0;

  for (let work of typeOfWorks) {
    priceMap.set(work.title, Number(work.price));
  }

  for (let work of selectedWorks) {
    let currTotal = 0;

    if (work.topLeft && work.topLeft != "") {
      currTotal += work.topLeft.split(",").length * priceMap.get(work.title);
    }

    if (work.topRight && work.topRight != "") {
      currTotal += work.topRight.split(",").length * priceMap.get(work.title);
    }

    if (work.bottomLeft && work.bottomLeft != "") {
      currTotal += work.bottomLeft.split(",").length * priceMap.get(work.title);
    }

    if (work.bottomRight && work.bottomRight != "") {
      currTotal +=
        work.bottomRight.split(",").length * priceMap.get(work.title);
    }

    total += currTotal;
  }

  return total;
};

export default calculatePrice;

const calculatePrice = (selectedWorks) => {
  let price = 0;

  for (let work of selectedWorks) {
    let currPrice = 0;

    if (work.topLeft && work.topLeft != "") {
      currPrice += work.topLeft.split(",").length * work.singlePrice;
    }

    if (work.topRight && work.topRight != "") {
      currPrice += work.topRight.split(",").length * work.singlePrice;
    }

    if (work.bottomLeft && work.bottomLeft != "") {
      currPrice += work.bottomLeft.split(",").length * work.singlePrice;
    }

    if (work.bottomRight && work.bottomRight != "") {
      currPrice += work.bottomRight.split(",").length * work.singlePrice;
    }

    price += currPrice;
  }

  return price;
};

export default calculatePrice;

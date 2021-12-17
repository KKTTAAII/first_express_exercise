const express = require("express");
const ExpressError = require("./error");
const app = express();

function checkIfNum(result, nums) {
  nums.forEach((num) => {
    result.push(parseInt(num));
    if (isNaN(num)) {
      throw new ExpressError(`${num} is not a number`, 400);
    }
  });
}

function checkIfThereIsQuery(query) {
  if (!query) {
    throw new ExpressError("Nums must be provided", 400);
  }
}

app.get("/mean", (req, res, next) => {
  try {
    const query = req.query.nums;
    const response = {};
    response["operation"] = "mean";

    checkIfThereIsQuery(query);

    const nums = query.split(",");
    const int = [];

    checkIfNum(int, nums);

    const sum = int.reduce((acc, curr) => acc + curr);
    const mean = sum / int.length;
    response["value"] = mean;

    return res.json(response);
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, res, next) => {
  try {
    const query = req.query.nums;
    const response = {};
    response["operation"] = "median";

    checkIfThereIsQuery(query);

    const nums = query.split(",");
    const int = [];

    checkIfNum(int, nums);

    const sortedNums = int.sort((a, b) => a - b);
    const middle = Math.floor(sortedNums.length / 2);

    if (sortedNums.length % 2 === 0) {
      const middle1 = sortedNums[middle - 1];
      const middle2 = sortedNums[middle];
      response["value"] = (middle1 + middle2) / 2;
    } else {
      response["value"] = sortedNums[middle];
    }

    return res.json(response);
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    const query = req.query.nums;
    const response = {};
    response["operation"] = "mode";

    checkIfThereIsQuery(query);

    const nums = query.split(",");
    const int = [];

    checkIfNum(int, nums);

    let result = {};
    let mostOccuredNum;
    let mostTimes = 0;
    for (let num of int) {
      if (result[num]) {
        result[num]++;
      } else {
        result[num] = 1;
      }
      if (mostTimes < result[num]) {
        mostOccuredNum = num;
        mostTimes = result[num];
      }
      response["value"] = mostOccuredNum;
    }
    res.json(response);
  } catch (err) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  next(err);
});

const server = app.listen(3000, () => {
  console.log("App on port 3000");
});

module.exports = server;

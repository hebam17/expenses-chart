// get elemets

const chartsElement = document.getElementById("charts");

// functions
const getData = async (url) => {
  let datawait = await fetch(url);
  let data = await datawait.json();
  return data;
};

const buildChart = (chart, height, barClass = "") =>
  `<div class="chart"><div class="week-day">${chart.day}</div><div class="chart-body ${barClass}" style="height:${height}rem;"></div><div class="value">\$${chart.amount}</div></div>`;

const heightCount = (amount) => {
  let heightUnit = 2;
  let height = (amount / 15) * heightUnit;
  return height;
};

const barClass = (day) => {
  const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const date = new Date();
  let weekDay = date.getDay();
  return weekDays[weekDay - 1] === day ? "active" : "";
};

const charts = async () => {
  const data = await getData("../data.json");
  const elems = data.map((elem) => {
    let barActiveClass = barClass(elem.day);
    let height = heightCount(elem.amount);
    return buildChart(elem, height, barActiveClass);
  });
  const elemsStr = elems.join("");
  chartsElement.innerHTML = elemsStr;
};

charts();

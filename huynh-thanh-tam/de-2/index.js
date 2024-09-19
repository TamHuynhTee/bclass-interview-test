const barCount = 60;
const initialDateStr = new Date().toUTCString();

const ctx = document.getElementById("chart").getContext("2d");
ctx.canvas.width = 1000;
ctx.canvas.height = 250;

const barData = new Array(barCount);
const lineData = new Array(barCount);

getRandomData(initialDateStr);

const chart = new Chart(ctx, {
  type: "candlestick",
  data: {
    datasets: [
      {
        label: "CHRT - Chart.js Corporation",
        data: barData,
      },
      {
        label: "Close price",
        type: "line",
        data: lineData,
        hidden: true,
      },
    ],
  },
});

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(target, index, date, lastClose) {
  const open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
  const close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
  const high = +randomNumber(
    Math.max(open, close),
    Math.max(open, close) * 1.1
  ).toFixed(2);
  const low = +randomNumber(
    Math.min(open, close) * 0.9,
    Math.min(open, close)
  ).toFixed(2);

  if (!target[index]) {
    target[index] = {};
  }

  Object.assign(target[index], {
    x: date.valueOf(),
    o: open,
    h: high,
    l: low,
    c: close,
  });
}

function getRandomData(dateStr) {
  let date = luxon.DateTime.fromRFC2822(dateStr);

  for (let i = 0; i < barData.length; ) {
    date = date.plus({ days: 1 });
    if (date.weekday <= 5) {
      randomBar(barData, i, date, i === 0 ? 30 : barData[i - 1].c);
      lineData[i] = { x: barData[i].x, y: barData[i].c };
      i++;
    }
  }
}

document.getElementById("randomizeData").addEventListener("click", function () {
  getRandomData(initialDateStr, barData);
  update();
});

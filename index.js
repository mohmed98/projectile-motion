const launchBtn = document.querySelector("#launchBtn");
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
  location.reload();
});
const obAngleElement = document.querySelector("#obAngle");
const obVelocityElement = document.querySelector("#obVelocity");

obAngleElement.addEventListener("change", () => {
  launchBtn.disabled = false;
  const angleValue = document.querySelector("#angleValue");
  angleValue.innerHTML = obAngleElement.value;
});
obVelocityElement.addEventListener("change", () => {
  launchBtn.disabled = false;
  const velocityValue = document.querySelector("#velocityValue");
  velocityValue.innerHTML = obVelocityElement.value;
});

launchBtn.addEventListener("click", () => {
  launchBtn.disabled = true;
  const obAngle = obAngleElement.value;
  const obVelocity = obVelocityElement.value;
  const movingObject = document.querySelector("#movingObject");
  const lineCanvas = document.querySelector("#lineCanvas");
  const flightTime = document.querySelector(".flightTime");
  const xRange = document.querySelector(".xRange");
  const obPositions = [];
  let t = 0;

  while (true) {
    const x = obVelocity * t * Math.cos(Math.PI * (obAngle / 180));
    const y =
      obVelocity * t * Math.sin(Math.PI * (obAngle / 180)) -
      0.5 * 9.8 * Math.pow(t, 2);
    obPositions.push({ x, y });
    if (y < 0) {
      break;
    }
    t += 0.1;
  }
  flightTime.innerHTML = t.toFixed(4) + " s";
  xRange.innerHTML = obPositions[obPositions.length - 1].x.toFixed(4) + " m";

  console.log(t);
  var i = 0;

  const arrayLen = obPositions.length - 1;
  movingObject.style.transform = `translate(${obPositions[i].x}px, ${obPositions[i].y}px)`;
  lineCanvas.height = 250;
  lineCanvas.width = 600;

  const linePath = lineCanvas.getContext("2d");

  linePath.moveTo(8, 250);
  linePath.lineWidth = 1;

  movingObject.addEventListener("transitionrun", () => {
    if (i < arrayLen) {
      i++;
    }
  });

  movingObject.addEventListener("transitionend", () => {
    if (i < arrayLen) {
      movingObject.style.transform = `translate(${obPositions[i].x}px, -${obPositions[i].y}px)`;
      linePath.lineTo(obPositions[i].x + 8, 245 - obPositions[i].y);
      console.log(`translate(${obPositions[i].x}px, -${obPositions[i].y}px)`);
      linePath.stroke();
    }
  });
});

const launchBtn = document.querySelector("#launchBtn");
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
  location.reload();
});

launchBtn.addEventListener("click", () => {
  const obAngle = document.querySelector("#obAngle").value;
  const obVelocity = document.querySelector("#obVelocity").value;
  const movingObject = document.querySelector("#movingObject");
  const lineCanvas = document.querySelector("#lineCanvas");

  const obPositions = [];
  let t = 0;

  while (true) {
    const x = obVelocity * t * Math.cos(Math.PI * (obAngle / 180));
    const y =
      obVelocity * t * Math.sin(Math.PI * (obAngle / 180)) -
      0.5 * 9.8 * Math.pow(t, 2);
    obPositions.push({ x, y });
    if (y < 0) {
      console.log("break");
      break;
    }
    t += 0.1;
  }
  var i = 0;
  const arrayLen = obPositions.length - 1;
  movingObject.style.transform = `translate(${obPositions[i].x}px, ${obPositions[i].y}px)`;
  lineCanvas.height = 300;
  lineCanvas.width = 600;

  const linePath = lineCanvas.getContext("2d");

  linePath.moveTo(8, 300);
  linePath.lineWidth = 2;

  movingObject.addEventListener("transitionrun", () => {
    if (i < arrayLen) {
      i++;
    }
  });

  movingObject.addEventListener("transitionend", () => {
    if (i < arrayLen) {
      movingObject.style.transform = `translate(${obPositions[i].x}px, -${obPositions[i].y}px)`;
      linePath.lineTo(obPositions[i].x + 8, 300 - obPositions[i].y);
      console.log(`translate(${obPositions[i].x}px, -${obPositions[i].y}px)`);
      linePath.stroke();
    }
  });
});

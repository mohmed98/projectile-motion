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
  const ballCanvas = document.querySelector("#ballCanvas");

  ballCanvas;
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

  const linePath = lineCanvas.getContext("2d");
  const movingBall = ballCanvas.getContext("2d");
  movingBall.beginPath();
  movingBall.arc(50, 150, 10, 0, 2 * Math.PI);
  movingBall.stroke();
  linePath.moveTo(0, 150);

  movingObject.addEventListener("transitionrun", () => {
    if (i < arrayLen) {
      i++;
    }
  });

  movingObject.addEventListener("transitionend", () => {
    if (i < arrayLen) {
      movingObject.style.transform = `translate(${obPositions[i].x}px, -${obPositions[i].y}px)`;
      linePath.lineTo(obPositions[i].x, 150 - obPositions[i].y);
      console.log(obPositions[i].x, obPositions[i].y) + 100;
      linePath.stroke();
      movingBall.clearRect(0, 0, 150, 150);
      movingBall.beginPath();
      movingBall.arc(
        obPositions[i].x,
        150 - obPositions[i].y,
        10,
        0,
        2 * Math.PI
      );
      movingBall.fillStyle = "#000";
      movingBall.fill();
    }
  });
});

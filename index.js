const launchBtn = document.querySelector("#launchBtn");
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
  location.reload();
});

launchBtn.addEventListener("click", () => {
  const obAngle = document.querySelector("#obAngle").value;
  const obVelocity = document.querySelector("#obVelocity").value;
  const movingObject = document.querySelector("#movingObject");
  const obPositions = [];
  let t = 0;

  while (true) {
    const x = obVelocity * t * Math.cos(Math.PI * (obAngle / 180));
    const y =
      obVelocity * t * Math.sin(Math.PI * (obAngle / 180)) -
      0.5 * 9.8 * Math.pow(t, 2);
    obPositions.push({ x, y });
    console.log({ y, t });
    if (y < 0) {
      console.log("break");
      break;
    }
    t += 0.1;
  }
  var i = 0;
  const arrayLen = obPositions.length - 1;
  movingObject.style.transform = `translate(${obPositions[i].x}px, ${obPositions[i].y}px)`;
  movingObject.addEventListener("transitionrun", () => {
    if (i < arrayLen) {
      i++;
    }
  });

  movingObject.addEventListener("transitionend", () => {
    if (i < arrayLen) {
      movingObject.style.transform = `translate(${obPositions[i].x}px, -${obPositions[i].y}px)`;
    }
    console.log({ arrayLen, i });
  });
});

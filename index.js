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
  for (let i = 0; i <= 10; i += 0.1) {
    const x = obVelocity * i * Math.cos(Math.PI * (obAngle / 180));
    const y =
      obVelocity * i * Math.sin(Math.PI * (obAngle / 180)) -
      0.5 * 9.8 * Math.pow(i, 2);
    obPositions.push({ x, y });
  }
  console.log(obPositions);
  var i = 0;
  const arrayLen = obPositions.length;
  movingObject.style.transform = `translate(${obPositions[i].x}px, ${obPositions[i].y}px)`;
  movingObject.addEventListener("transitionrun", () => {
    if (i < arrayLen) {
      i++;
    }
  });

  movingObject.addEventListener("transitionend", () => {
    movingObject.style.transform = `translate(${obPositions[i].x}px, -${obPositions[i].y}px)`;
    console.log({ arrayLen, i });
  });
});

let resultToDraw = undefined;

function polygonArea(points) {
  return 0.5 * points.reduce((area, p1, i, arr) => {
    const p2 = arr[(i + 1) == arr.length ? 0 : i + 1];
    return area + p1.x * p2.y - p2.x * p1.y;
  }, 0);
}

function intersects(a, b, c, d, p, q, r, s) {
  let det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

function isSimple(points, i, j) {
  const plen = points.length;
  lines = [
    [points[i], points[i + 1 == plen ? 0 : i + 1]],
    [points[i], points[i == 0 ? plen - 1 : i - 1]],
    [points[j], points[j + 1 == plen ? 0 : j + 1]],
    [points[j], points[j == 0 ? plen - 1 : j - 1]],
  ];

  return lines.reduce((simple, l) => {
    return simple && points.reduce((all, p1, idx, arr) => {
      const p2 = arr[(idx + 1) % arr.length];
      return all && !intersects(l[0].x, l[0].y, l[1].x, l[1].y, p1.x, p1.y, p2.x, p2.y);
    }, true);
  }, true);
}

function pointSwapMutation(points) {
  while(true) {
    let i = randomIntTo(points.length), j = randomIntTo(points.length - 1);
    if (j >= i)
      j++;

    let tmp = points[i];
    points[i] = points[j];
    points[j] = tmp;

    if (isSimple(points, i, j)) {
      break;
    }

    tmp = points[i];
    points[i] = points[j];
    points[j] = tmp;
  }
  return points;
}

function linearCooling({iterations, i}) {
  return iterations / (1 + 0.8 * i);
}

function linearStop({i, iterations}) {
  return !(i < iterations);
}

function simulatedAnnealing({points, startHeat, iterations, score, mutate, cool, stop}) {
  let currPoints = simplePolygon(points);
  let heat = startHeat;
  let currScore = score(currPoints);
  let bestScore = currScore;
  let bestPoints = currPoints.slice();

  for (let i = 0; !stop({i, iterations, heat}); i ++) {
    const newPoints = mutate(currPoints);
    const newScore = score(newPoints);

    if (i % 10000 == 0) {
      console.log(i);
      // console.log(i, currScore, heat);
      // clearCanvas();
      // drawPolygon(currPoints);
    }

    const r = Math.random();
    const compare = Math.pow(Math.E, (currScore - newScore) / heat);

    if (newScore < currScore || r < compare) {
      currScore = newScore;
      currPoints = newPoints.slice();

      if (currScore < bestScore) {
        bestScore = currScore;
        bestPoints = currPoints.slice();
      }
    }
    
    heat = cool({startHeat, iterations, i, heat});
  }
  return bestPoints;
}

function doTest(i) {
  const test = tests[i];
  clearCanvas();
  setScale(test);

  const result = simulatedAnnealing({
    points: test,
    startHeat: 100000,
    iterations: 100000,
    score: polygonArea,
    mutate: pointSwapMutation,
    cool: linearCooling,
    stop: linearStop,
  });
  const bestArea = polygonArea(result);

  resultToDraw = result.slice();
  console.log("Best result:", result);
  console.log("Best indexes:", result.map(r => test.indexOf(r)));
  console.log("Best area", bestArea);

  document.getElementById('area').value = document.getElementById('area').value + '\n' + bestArea + '\n' + result.map(r => test.indexOf(r));
}

function run() {
  const testNumber = Number(document.getElementById('test').value);
  let timesToRun = Number(document.getElementById('times').value);

  setInterval(function() {
    if (resultToDraw)
      clearCanvas();
      drawPolygon(resultToDraw);
  }, 100);

  while(timesToRun--) {

    doTest(testNumber);
  }
}
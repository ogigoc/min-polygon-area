function underLine(l, r, p) {
    // shit function
    const k = (l.y - r.y) / (l.x - r.x);
    const n = l.y - k * l.x;
    return p.y < k * p.x + n;
  }
  
  function simplePolygon(points) {
    const left = points.reduce((left, p) => {
      if (left.x == p.x) return left.y > p.y ? p : left;
      return left.x > p.x ? p : left;
    });  
    const right = points.reduce((right, p) => {
      if (right.x == p.x) return right.y < p.y ? p : right; 
      return right.x < p.x ? p : right;
    });
  
    const upper = points.reduce((upper, p) => !underLine(left, right, p) ? upper : upper.concat([p]), []);
    const lower = points.reduce((lower, p) => underLine(left, right, p) ? lower : lower.concat([p]), []);
  
    upper.sort((a, b) => {
      if (a.x == b.x) return a.y > b.y ? 1 : -1;
      return a.x > b.x ? 1 : -1;
    });
    lower.sort((a, b) => {
      if (a.x == b.x) return a.y < b.y ? 1 : -1;
      return a.x < b.x ? 1 : -1;
    });
  
    return upper.concat(lower);
  }
  
  function randomIntTo(max) {
    return Math.floor(Math.random() * max);
  }
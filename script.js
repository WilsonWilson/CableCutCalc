function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const ogRow = document.querySelector('.row-og');
const preRows = document.querySelectorAll('.row-pre');
const postRows = document.querySelectorAll('.row-post');

const showHide = function (rows) {
  rows.forEach((row) => {
    row.classList.remove('hide');
  });
};

const isTB = () => {
  // form field values
  let t = parseInt(document.getElementById('top').value);
  let b = parseInt(document.getElementById('bottom').value);
  let pr = parseInt(document.getElementById('pre').value);
  let po = parseInt(document.getElementById('post').value);
  let ogv; // will hold original length
  let availPrev; // will hold pre-cut available length
  let availPostv; // will hold post-cut available length

  // result display elements
  let og = document.querySelector('.original');
  let availPre = document.querySelector('.available-pre');
  let availPost = document.querySelector('.available-post');
  let lifePre = document.querySelector('.life-pre');
  let lifePost = document.querySelector('.life-post');
  let job = document.querySelector('.job');

  if (t >= 0 && b >= 0) {
    ogRow.classList.remove('hide');
    if (t > b) {
      ogv = t - b;
      og.textContent = `${formatNumber(ogv)}′`;
      console.log('count down');
      if (pr >= 0) {
        showHide(preRows);
        availPrev = t - pr;
        availPre.textContent = `${formatNumber(availPrev)}′`;
        lifePre.textContent = `${formatNumber(ogv - availPrev)}′`;
      }
      if (po >= 0) {
        showHide(postRows);
        availPostv = t - po;
        availPost.textContent = `${formatNumber(availPostv)}′`;
        job.textContent = `${formatNumber(po - pr)}′`;
        lifePost.textContent = `${formatNumber(ogv - availPostv)}′`;
      }
    } else {
      ogv = b - t;
      og.textContent = `${formatNumber(ogv)}'`;
      console.log('count up: ' + ogv);
      if (pr > 0) {
        showHide(preRows);
        availPrev = pr - t;
        availPre.textContent = `${formatNumber(availPrev)}′`;
        lifePre.textContent = `${formatNumber(ogv - availPrev)}′`;
      }
      if (po >= 0) {
        showHide(postRows);
        availPostv = b - po;
        availPost.textContent = `${formatNumber(availPostv)}′`;
        job.textContent = `${formatNumber(pr - po)}′`;
        lifePost.textContent = `${formatNumber(ogv - availPostv)}′`;
      }
    }
  }
};

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => input.addEventListener('keyup', isTB));

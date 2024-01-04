// window.addEventListener('load', catWalk);
/*
1. Create a variable to store a reference to the `<img>` element.
2. Change the style of the `<img>` to have a `left` of `0px`, so that it starts 
   at the left hand of the screen.
3. Complete the function called catWalk() to move the cat 10 pixels to the right
   of where it started, by changing the `left` style property.
4. Call that function every 50 milliseconds. Your cat should now be moving 
   across the screen from left to right. Hurrah!
5. When the cat reaches the right-hand of the screen, restart them at the left 
   hand side (`0px`). So they should keep walking from left to right across the 
   screen, forever and ever.
6. When the cat reaches the middle of the screen, replace the img with an image 
   of a cat dancing (use this URL given below), keep it dancing for 5 seconds, 
   and then replace the img with the original image and have it 
   continue the walk.
*/

'use strict';
const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise(resolve => {
    img.style.left = `${startPos}px`;

    const intervalId = setInterval(() => {
      startPos += STEP_SIZE_PX;
      img.style.left = `${startPos}px`;

      if (startPos >= stopPos) {
        clearInterval(intervalId);
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise(resolve => {
    const originalSrc = img.src;
    img.src = DANCING_CAT_URL;

    setTimeout(() => {
      img.src = originalSrc;
      resolve();
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  img.style.position = 'absolute';

  const startPos = 0;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  const walkAndDance = () => {
    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(() => {
        img.style.left = `${startPos}px`; // Reset position to start
        walkAndDance(); // Repeat the sequence indefinitely
      });
  };

  walkAndDance();
}

window.addEventListener('load', catWalk);
window.addEventListener('load', catWalk);

// 'use strict';
// const STEP_SIZE_PX = 10;
// const STEP_INTERVAL_MS = 50;
// const DANCE_TIME_MS = 5000;
// const DANCING_CAT_URL =
//   'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

// function walk(img, startPos, stopPos) {
//   // Resolve this promise when the cat (`img`) has walked from `startPos` to
//   // `stopPos`.
//   // Make good use of the `STEP_INTERVAL_PX` and `STEP_INTERVAL_MS`
//   // constants.
// }

// function dance(img) {
//   return new Promise(resolve => {
//     // Switch the `.src` of the `img` from the walking cat to the dancing cat
//     // and, after a timeout, reset the `img` back to the walking cat. Then
//     // resolve the promise.
//     // Make good use of the `DANCING_CAT_URL` and `DANCE_TIME_MS` constants.
//   });
// }

// function catWalk() {
//   const startPos = -img.width;
//   const centerPos = (window.innerWidth - img.width) / 2;
//   const stopPos = window.innerWidth;

//   // Use the `walk()` and `dance()` functions to let the cat do the following:
//   // 1. Walk from `startPos` to `centerPos`.
//   // 2. Then dance for 5 secs.
//   // 3. Then walk from `centerPos` to `stopPos`.
//   // 4. Repeat the first three steps indefinitely.
// }

// window.addEventListener('load', catWalk);

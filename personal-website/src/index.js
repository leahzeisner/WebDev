// Automatic Slideshow - change image every 3 seconds
let myIndex = 0;

function slideshow() {
    const slidesElement = document.getElementsByClassName("my-slides");

    let i;
    for (i = 0; i < slidesElement.length; i++) {
        slidesElement[i].style.display = "none";
    }

    myIndex++;

    if (myIndex > slidesElement.length) {
        myIndex = 1
    }
    slidesElement[myIndex - 1].style.display = "block";
    setTimeout(slideshow, 3000);
}
slideshow();




// Make welcome page fade away
// Make stars appear after welcome page is scrolled
const welcomeCheckpoint = 500;
const starsCheckpoint = 100;   // change back to 500 if you don't want them to show on welcome page
 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  let welcomeOpacity

  if (currentScroll <= welcomeCheckpoint) {
    welcomeOpacity = 1 - currentScroll / welcomeCheckpoint;
  } else {
    welcomeOpacity = 0;
  }
  document.querySelector(".welcome-page-left").style.opacity = welcomeOpacity;
  document.querySelector(".welcome-page-right").style.opacity = welcomeOpacity;


  let starsOpacity = 0
  if (currentScroll >= starsCheckpoint) {   
    starsOpacity = 0.3
  } else {
    starsOpacity = 1   // change back to 0 if you don't want them to show on welcome page
  }
  document.querySelector(".stars-container").style.opacity = starsOpacity;

});




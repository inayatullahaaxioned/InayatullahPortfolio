/* Author: 
Inayatullah
*/
const workItem = document.querySelectorAll(".work-item"),
    prevSlide = document.querySelector(".prev-slide"),
    backBg = document.querySelector(".work-bg img"),
    listImage = document.querySelectorAll('.work-img'),
    nextSlide = document.querySelector(".next-slide");
let index = 0;
// global variable declaration end here
// slider function start here
function setSlide(index) {
    const toggle = document.querySelector(".active"),
        workImage = listImage[index].src;
    backBg.src = workImage;
    toggle.classList.remove("active");
    workItem[index].classList.add("active");
};
// slider function end here

// event for slider start here
prevSlide.addEventListener("click", function () {
    index--;
    if (index < 0) {
        index = workItem.length - 1;
    };
    setSlide(index);
});
nextSlide.addEventListener("click", function () {
    index++;
    if (index > workItem.length - 1) {
        index = 0;
    };
    setSlide(index);
});
// event for slider end here

//hamburger js start
const hamburger = document.querySelector(".hamburger"),
    html = document.querySelector('html'),
    menuToggle = document.querySelector('.menu-toggle');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    menuToggle.classList.toggle('active');
    html.classList.toggle('scroll-lock');
});
//hamburger js end

//animation observer start 
const sections = document.querySelectorAll("section");

sections.forEach(function (section) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const animation = section.querySelectorAll('.anime');
            if (entry.isIntersecting) {
                animation.forEach(function (element) {
                    element.classList.add('animation');
                });
            } else {
                animation.forEach(function (element) {
                    element.classList.remove('animation');
                });
            }
        })
    });
    observer.observe(section);
});
//animation observer end

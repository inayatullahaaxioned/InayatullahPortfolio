/* Author: 
Inayatullah
*/
//preloader js 
const loader = document.createElement('div'),
    loadingText = document.createElement('div'),
    container = document.querySelector('.container'),
    body = document.querySelector('body');
body.prepend(loader);
loader.appendChild(loadingText);
loader.className = "loading";
loadingText.className = "loading-text-word";
preloader();
function preloader() {
    let Inayat = ['I', 'N', 'A', 'Y', 'A', 'T', 'U', 'L', 'L', 'A', 'H'];
    Inayat.forEach(element => {
        let span = document.createElement('span');
        span.className = 'loading-text-words';
        span.innerText = element;
        loadingText.appendChild(span);
        $(window).on('load', function(){
            $('.loading').delay(3000).fadeOut('slow');
            $('.container').delay(5000).fadeIn('slow');
        });
    });
}
//preloader js ends 
const workItem = document.querySelectorAll(".work-item"),
    prevSlide = document.querySelector(".prev-slide"),
    backBg = document.querySelector(".work-bg img"),
    listImage = document.querySelectorAll('.work-img'),
    nextSlide = document.querySelector(".next-slide");
let index = 0;
// global variable declaration end here
// slider function start here
workItem[0].classList.add('show');
function setSlide(index) {
    const toggle = document.querySelector(".show"),
        workImage = listImage[index].src;
    backBg.src = workImage;
    toggle.classList.remove("show");
    workItem[index].classList.add("show");
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
const animationSections = document.querySelectorAll(".animation-section");

animationSections.forEach(function (section) {
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



//navigation js start
const mobileMenu = document.querySelector('.menu-toggle'),
    sections = document.querySelectorAll('section'),
    navigation = document.querySelectorAll('.nav-item');

navigation.forEach(function (navMenu) {
    navMenu.addEventListener('click', function (e) {
        e.preventDefault();
        const activeNav = mobileMenu.querySelector('.active');
        if (activeNav) {
            activeNav.classList.remove('active');
        }
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        html.classList.remove('scroll-lock');
        navMenu.classList.add('active');
        const sectionUrl = navMenu.getAttribute('href');
        sections.forEach(function (section) {
            const sectionId = section.getAttribute('id');
            if (sectionId == sectionUrl.replace("#", "")) {
                const sectionTop = section.getBoundingClientRect().top;
                window.scrollBy({
                    top: sectionTop - 40,
                    behavior: "smooth"
                })
            }
        });
    });
});
//navigation js ends

// on scroll navmenu active change 
window.onscroll = function () {
    let attribute;
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 50) {
            attribute = section.getAttribute('id');
        }
    });
    navigation.forEach(function (item) {
        item.classList.remove('active');
        if (item.getAttribute('href').replace('#', "") == attribute) {
            item.classList.add('active');
        }
    });
    if (scrollY <= 100) {
        navigation[0].classList.add('active');
    };
}
// on scroll navmenu active change

//form validation
const form = document.querySelector('.form'),
    fullName = document.querySelector('input[type=text]'),
    email = document.querySelector('input[type=email]'),
    message = document.querySelector('.message'),
    fullNameRegex = /^[a-zA-Z]+[a-zA-Z\s]+$/,
    emailRegex = /^([A-Za-z][A-Za-z0-9\-\_\.]+[A-Za-z0-9])\@([A-Za-z]{2,})\.([A-Za-z]{2,})$/,
    messageRegex = /./;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    validateInput(fullName, fullNameRegex);
    validateInput(email, emailRegex, 5, 40);
    validateInput(message, messageRegex, 10, 250);
    const errors = form.querySelectorAll('.error');
    if (errors.length == 0) {
        const successMessage = document.createElement('span');
        successMessage.className = "success-msg";
        successMessage.innerText = 'Your Message Has Been Sent Successfully!';
        form.prepend(successMessage);
        setTimeout(function () {
            successMessage.remove();
        }, 4000);
        form.reset();
    };
});


//universal function for validating inputs
function validateInput(input, regex, minLimit = 3, maxLimit = 20) {
    const error = input.parentElement.querySelector('.error'),
        inputValue = input.value.trim();
    if (error) {
        error.remove();
    }
    if (inputValue == "") {
        appendError(input, `${input.name} is required`);
    } else if (inputValue.length < minLimit) {
        appendError(input, `minimum ${minLimit} character is required`);
    } else if (inputValue.length > maxLimit) {
        appendError(input, `maximum ${maxLimit} characters are allowed`);
    } else if (!regex.test(inputValue)) {
        appendError(input, `Please Enter valid ${input.name}`);
    }
}

//append error function
function appendError(input, errorMsg) {
    const inputParent = input.parentElement,
        errorSpan = document.createElement('span');
    errorSpan.className = "error";
    errorSpan.innerText = errorMsg;
    inputParent.appendChild(errorSpan);
};

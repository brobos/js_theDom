/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// navigation menu
const navigation = document.getElementById("navbar__list");

// select section
const section = document.querySelectorAll("section");

// select section IDs
const sections = document.querySelectorAll("section[id]");

// create button go-to-top
const btnTop = document.createElement("button");
btnTop.id = "toTop";
btnTop.className = "buttonTop";
btnTop.innerHTML = "Top";
document.body.appendChild(btnTop);

// styling the button
btnTop.style.cssText = "color: white; background-color: orange; font-size: 1em; font-weight: bold";

// after scroll down 200px from the top, button appears
window.onscroll = () => {
  btnAppear();
};

const btnAppear = () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
};

// build the navigation menu + scroll to section on link click
const buildMenu = () => {
  let mainMenu = "";
  for (let i = 0; i < section.length; i++) {
    const sectionId = section[i].id;
    const sectionName = section[i].getAttribute("data-nav");
    mainMenu += `<li><a class="menu__link" href="#${sectionId}">${sectionName}</a></li>`;

    // active__link
  };

  navigation.innerHTML = mainMenu;
};

// Build menu 
buildMenu();

// add event listener for scroll
const sectionPosition = () => {

  // Get scroll position
  let scrollY = window.pageYOffset;

  // Loop through sections to get height and top and ID, adding and removing class 'active'
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.getElementById(sectionId).classList.add("active");
    } else {
      document.getElementById(sectionId).classList.remove("active");
    }
  });
};

window.addEventListener("scroll", sectionPosition);

// on click scroll to top
const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

document.getElementById("toTop").addEventListener("click", goToTop);

// make nav links active
const activeNavigation = () => {
  let linksHolder = document.getElementById("navbar__list");
  let links = linksHolder.querySelectorAll('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active__link");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active__link", "");
      }
      this.className += " active__link";
    });
  };
}

activeNavigation();

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

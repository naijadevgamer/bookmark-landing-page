"use strict";

const header = document.querySelector("header");
const section = document.querySelector("#section1");
const sectionHeight = section.getBoundingClientRect().height;
let lastScroll = 0;

/////////////////////////////////////////////////////
// PAGE NAVIGATION
const scrollToView = function (navsParent) {
  document.querySelector(navsParent).addEventListener("click", function (e) {
    e.preventDefault();
    // Check if Phone nav
    if (navsParent === ".phone-nav ul")
      document.querySelector("#header-checkbox").checked = false;

    // Matching strategy
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

scrollToView(".nav-links");
scrollToView(".phone-nav ul");

/////////////////////////////////////////////////////
// PAGE NAVIGATION

// const stickyNav = function (entries) {
//   console.log(entries);
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     header.classList.add("nav-stick");
//   } else header.classList.remove("nav-stick");
// };

// const sectionObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${sectionHeight + 20}px`,
// });

// sectionObserver.observe(section);

// // nav-Scroll
// let lastScroll = window.scrollY;

// const stickyNavScroll = function () {
//   window.addEventListener("scroll", function () {
//     // down
//     if (this.scrollY > lastScroll) {
//       header.classList.remove("nav-scroll-up");
//     }
//     // up
//     if (this.scrollY < lastScroll) {
//       header.classList.add("nav-scroll-up");
//     }
//     lastScroll = this.scrollY;
//   });
// };

// stickyNavScroll();

// Intersection Observer callback
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("nav-stick");
  } else {
    header.classList.remove("nav-stick");
  }
};

const sectionObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${sectionHeight}px`,
});

sectionObserver.observe(section);

// Function to handle scroll events
const handleScroll = function () {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    // Scroll down
    header.classList.remove("nav-show");
  } else {
    // Scroll up
    if (!sectionObserver.takeRecords().length) {
      // If the section is fully passed, show the navigation bar
      header.classList.add("nav-show");
    }
  }

  lastScroll = currentScroll;
};

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

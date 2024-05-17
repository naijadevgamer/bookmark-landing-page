"use strict";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

gsap.to(".card--1", {
  scrollTrigger: {
    trigger: ".card--1",
    scrub: 0.5,
    start: "top 70%",
    end: "top 40%",
  }, // start the animation when ".box" enters the viewport (once)
  backgroundColor: "#e6fff5",
});
gsap.to(".card--2", {
  scrollTrigger: {
    trigger: ".card--2",
    scrub: 0.5,
    start: "top 70%",
    end: "top 40%",
  }, // start the animation when ".box" enters the viewport (once)
  backgroundColor: "#E0F7FA",
});
gsap.to(".card--3", {
  scrollTrigger: {
    trigger: ".card--3",
    scrub: 0.5,
    start: "top 70%",
    end: "top 40%",
  }, // start the animation when ".box" enters the viewport (once)
  backgroundColor: "#fff9e6",
});

// gsap.to(".disp-img", {
//   scrollTrigger: {
//     trigger: ".disp-img",
//     scrub: true,
//     // start: "top 120%",
//     end: "top 40%",
//   }, // start the animation when ".box" enters the viewport (once)
//   // scale: 1.3,
//   // yPercent: 50,
//   // start: "top 200%",
//   // end: "top 20%",
//   duration: 1,
// });

const header = document.querySelector("header");
const checkHeader = document.querySelector("#header-checkbox");
const section1 = document.querySelector("#section--1");
const logoHeader = document.querySelector(".logo-header");
const logoPhone = document.querySelector(".logo-phone");
const navLinks = document.querySelectorAll(
  ".nav-links, .phone-nav-list, footer ul"
);
const allRevealSection = document.querySelectorAll(".sect");
const allRevealButtons = document.querySelectorAll(".btn--observe");
const allRevealCards = document.querySelectorAll(".card");

const section1Height = section1.getBoundingClientRect().height;
let lastScroll = 0;

// Parcel config to maintain state
if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////
// SMOOTH SCROLL PAGE NAVIGATION FUNCTIONALITY
// Function to handle checkbox change in phone nav
const checkChange = function () {
  document.body.style.overflow = checkHeader.checked ? "hidden" : "auto";
  header.style.backgroundColor = checkHeader.checked
    ? "transparent"
    : window.scrollY > 100
    ? "#252b46e6"
    : "";
};

// Scroll to view
const scrollToView = function (navsParent) {
  navsParent.addEventListener("click", function (e) {
    e.preventDefault();

    // Check if Phone nav
    if (navsParent.classList.contains("phone-nav-list")) {
      checkHeader.checked = false;
      checkChange();
    }
    // Matching strategy
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

navLinks.forEach((nav) => scrollToView(nav));
checkHeader.addEventListener("change", checkChange);

/////////////////////////////////////////////////////
// STICKY NAVIGATION FUNCTIONALITY
// Function to calculate rootMargin based on screen width
function calculateRootMargin() {
  const screenWidth = window.innerWidth;
  let rootMargin = "";
  // Compare breakpoints
  if (screenWidth > 900) rootMargin = `-${section1Height + 50}px 0px 0px 0px`;
  else if (screenWidth > 640)
    rootMargin = `-${section1Height + 43}px 0px 0px 0px`;
  else rootMargin = `-${section1Height + 33}px 0px 0px 0px`;
  return rootMargin;
}

// Intersection Observer callback
const stickyNav = function (entries) {
  const [entry] = entries;
  header.classList.toggle("nav-stick", !entry.isIntersecting);
  logoHeader.style.opacity = entry.isIntersecting ? 1 : 0;
  logoPhone.style.opacity = entry.isIntersecting ? 0 : 1;
  header.style.backgroundColor =
    window.innerWidth <= 640
      ? entry.isIntersecting
        ? "transparent"
        : "#252b46e6"
      : "";
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: calculateRootMargin(),
};
const section1Observer = new IntersectionObserver(stickyNav, option);

section1Observer.observe(section1);

// Function to handle scrolling up and down
const handleScroll = function () {
  const currentScroll = window.scrollY;
  // Scroll direction functionality
  header.classList.toggle("nav-show", currentScroll <= lastScroll);
  // Add transition when nav is passed
  header.classList.toggle("duration-300", currentScroll > 300);
  lastScroll = currentScroll;
};

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);
// Update rootMargin on resize
window.addEventListener("resize", () => {
  option.rootMargin = calculateRootMargin();
});
// Update rootMargin on orientation change
window.addEventListener("orientationchange", () => {
  option.rootMargin = calculateRootMargin();
});

/////////////////////////////////////////////////////
// TEXT TRICK FUNCTIONALITY
gsap.to("#section--1__header", {
  duration: 2,
  delay: 3,
  text: "A Simple Bookmark Manager",
  ease: "sine.inOut",
});

//////////////////////////////////////////////////
// REVEAL FUNCTIONALITY
// Reveal cards, buttons, and sections function
const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const targetC = entry.target.classList;
  targetC.contains("section--hidden") && targetC.remove("section--hidden");
  targetC.contains("btn--observe") && targetC.remove("opacity-0");
  targetC.contains("card--1") && targetC.add("reveal-card--1");
  targetC.contains("card--2") && targetC.add("reveal-card--2");
  targetC.contains("card--3") && targetC.add("reveal-card--3");

  observer.unobserve(entry.target);
};

const revealSectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0,
});
allRevealSection.forEach((sect) => revealSectionObserver.observe(sect));

const revealButtonObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 1,
  rootMargin: "-50px",
});
allRevealButtons.forEach((btn) => revealButtonObserver.observe(btn));

const revealCardObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.2,
});
allRevealCards.forEach((card) => revealCardObserver.observe(card));

// For Viewport 900 and below
const revealCardObserverSpecial = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.2,
});
window.innerWidth <= 900 &&
  revealCardObserverSpecial.observe(document.querySelector(".card--2"));

//////////////////////////////////////////////////
// ASIDE FUNCTIONALITY
const handleAside = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // const targetC = entry.target.classList;
  gsap.to("aside h2", {
    duration: 2,
    text: "Stay up-to-date with what we’re doing",
    ease: "sine.inOut",
  });
  observer.unobserve(entry.target);

  document.querySelector("aside form").classList.remove("opacity-0");
  document.querySelector("aside p").classList.remove("opacity-0");
};

const asideObserver = new IntersectionObserver(handleAside, {
  root: null,
  threshold: 1,
});

asideObserver.observe(document.querySelector("aside"));

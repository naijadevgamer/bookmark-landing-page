"use strict";

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const header = document.querySelector("header");
const checkHeader = document.querySelector("#header-checkbox");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#features");
const logoHeader = document.querySelector(".logo-header");
const logoPhone = document.querySelector(".logo-phone");
const navLinks = document.querySelectorAll(".nav-links, .phone-nav-list");
const allRevealSection = document.querySelectorAll(".sect");

const section1Height = section1.getBoundingClientRect().height;
let lastScroll = 0;

// Parcel config to maintain state
if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////
// PAGE NAVIGATION SMOOTH SCROLL

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
const calculateRootMargin = () => {
  const screenWidth = window.innerWidth;
  let rootMargin = "";
  // Compare breakpoints
  if (screenWidth > 900)
    // For larger screens
    rootMargin = `-${section1Height + 50}px 0px 0px 0px`;
  else if (screenWidth > 640)
    // For medium screens
    rootMargin = `-${section1Height + 43}px 0px 0px 0px`;
  // For smaller screens (e.g., mobile)
  else rootMargin = `-${section1Height + 33}px 0px 0px 0px`;
  return rootMargin;
};

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
  ease: "none",
});

//////////////////////////////////////////////////
// REVEAL SECTION
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revealSectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allRevealSection.forEach((sect) => revealSectionObserver.observe(sect));

//////////////////////////////////////////////////
// REVEAL BUTTONS
const revealButton = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("opacity-0");
  observer.unobserve(entry.target);
};

const revealButtonObserver = new IntersectionObserver(revealButton, {
  root: null,
  threshold: 1,
  rootMargin: "-100px",
});

revealButtonObserver.observe(document.querySelector(".btn--observe"));

// allRevealSection.forEach((sect) => revealSectionObserver.observe(sect));

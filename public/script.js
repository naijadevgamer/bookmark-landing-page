"use strict";

const header = document.querySelector("header");
const checkHeader = document.querySelector("#header-checkbox");
const section = document.querySelector("#section1");
const logoHeader = document.querySelector(".logo-header");
const logoPhone = document.querySelector(".logo-phone");

const sectionHeight = section.getBoundingClientRect().height;
let lastScroll = 0;

// Function to handle checkbox change in phone nav
const checkChange = function () {
  if (checkHeader.checked) {
    document.body.style.overflow = "hidden";
    header.style.backgroundColor = "transparent";
  } else {
    document.body.style.overflow = "auto";
    if (window.scrollY > 100) header.style.backgroundColor = "#252b46e6";
  }
};

/////////////////////////////////////////////////////
// PAGE NAVIGATION
const scrollToView = function (navsParent) {
  document.querySelector(navsParent).addEventListener("click", function (e) {
    e.preventDefault();
    // Check if Phone nav
    if (navsParent === ".phone-nav ul") {
      document.querySelector("#header-checkbox").checked = false;
      checkChange();
    }

    // Matching strategy
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

scrollToView(".nav-links");
scrollToView(".phone-nav ul");

checkHeader.addEventListener("change", checkChange);

/////////////////////////////////////////////////////
// STICKY NAVIGATION FUNCTIONALITY

// Intersection Observer callback
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    header.classList.add("nav-stick");
    logoHeader.style.opacity = 0;
    logoPhone.style.opacity = 1;
    if (window.innerWidth <= 640) header.style.backgroundColor = "#252b46e6";
  } else {
    header.classList.remove("nav-stick");
    logoHeader.style.opacity = 1;
    logoPhone.style.opacity = 0;
    if (window.innerWidth <= 640) header.style.backgroundColor = "transparent";
  }
};

// Function to calculate rootMargin based on screen width
const calculateRootMargin = () => {
  const screenWidth = window.innerWidth;
  let rootMargin = "";

  // Compare breakpoints
  if (screenWidth > 900)
    // For larger screens
    rootMargin = `-${sectionHeight + 50}px 0px 0px 0px`;
  else if (screenWidth > 640)
    // For medium screens
    rootMargin = `-${sectionHeight + 43}px 0px 0px 0px`;
  // For smaller screens (e.g., mobile)
  else rootMargin = `-${sectionHeight + 33}px 0px 0px 0px`;

  return rootMargin;
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: calculateRootMargin(),
};

const sectionObserver = new IntersectionObserver(stickyNav, option);

sectionObserver.observe(section);

// Function to handle scroll events
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

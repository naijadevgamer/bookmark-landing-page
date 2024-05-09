"use strict";

const header = document.querySelector("header");
const checkHeader = document.querySelector("#header-checkbox");
const section = document.querySelector("#section1");
const logoHeader = document.querySelector(".logo-header");
const logoPhone = document.querySelector(".logo-phone");
const navLinks = document.querySelectorAll(".nav-links, .phone-nav ul");

const sectionHeight = section.getBoundingClientRect().height;
let lastScroll = 0;

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
    console.log("check");
    // Check if Phone nav
    if (navsParent.classList.contains(".phone-nav ul")) {
      console.log("check");
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

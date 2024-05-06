"use strict";

const header = document.querySelector("header");
const checkHeader = document.querySelector("#header-checkbox");
const section = document.querySelector("#section1");
const navToggle = document.querySelector("#nav-toggle");

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

// navToggle.addEventListener("click", function () {
if (checkHeader.checked) {
  console.log("yes");
  document.body.style.overflow = "hidden";
  // document.body.classList.toggle("overflow-hidden");
} else {
  console.log("no");
  document.body.style.overflow = "auto";
}
// document.body.style.overflow = "hidden";
// });
/////////////////////////////////////////////////////
// STICKY NAVIGATION FUNCTIONALITY

// Intersection Observer callback
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    header.classList.add("nav-stick");
  } else {
    header.classList.remove("nav-stick");
    // document.querySelector("header").scrollIntoView({ behavior: "smooth" });
  }
};

// Function to calculate rootMargin based on screen width
const calculateRootMargin = () => {
  const screenWidth = window.innerWidth;
  let rootMargin = "";

  // Compare breakpoints
  if (screenWidth > 900) {
    // For larger screens
    rootMargin = `-${sectionHeight + 50}px 0px 0px 0px`;
  } else if (screenWidth > 640) {
    // For medium screens
    rootMargin = `-${sectionHeight + 43}px 0px 0px 0px`;
  } else {
    // For smaller screens (e.g., mobile)
    rootMargin = `-${sectionHeight + 33}px 0px 0px 0px`;
  }

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

  // Scroll down
  if (currentScroll > lastScroll) header.classList.remove("nav-show");
  // Scroll up
  else header.classList.add("nav-show");

  // Add transition when nav is passed
  if (currentScroll > 300) header.classList.add("duration-300");
  else header.classList.remove("duration-300");

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

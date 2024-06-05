"use strict";
import "./input.css";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

// DOM Element Selectors
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
const allRevealHeading = document.querySelectorAll(".sect-h");
const allRevealCards = document.querySelectorAll(".card");
const form = document.querySelector("form");
const formDiv = document.querySelector("form div");
const errorText = document.querySelector("form p");
const errorIcon = document.querySelector("form .icon");

const section1Height = section1.getBoundingClientRect().height;
let lastScroll = 0;

gsap.registerPlugin(TextPlugin, ScrollTrigger);

// Calculate Scroll Start based on screen width
const calcStart = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 900) return "top 240px";
  if (screenWidth > 640) return "top 150px";
  return "top 200px";
};

// Scroll trigger for header image
gsap.to(".disp-img", {
  scrollTrigger: {
    trigger: ".disp-img",
    scrub: 0.1,
    start: calcStart(),
  },
  yPercent: 33,
  scale: 1.1,
});

// Toggle body overflow and header background based on checkbox
const toggleNav = () => {
  document.body.style.overflow = checkHeader.checked ? "hidden" : "auto";
  header.style.backgroundColor = checkHeader.checked
    ? "transparent"
    : window.scrollY > 100
    ? "#252b46e6"
    : "";
};

// Smooth scroll functionality
const scrollToView = function (navsParent) {
  navsParent.addEventListener("click", function (e) {
    e.preventDefault();
    // Check if Phone nav
    if (navsParent.classList.contains("phone-nav-list")) {
      checkHeader.checked = false;
      toggleNav();
    }
    // Matching strategy
    if (e.target.classList.contains("nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

navLinks.forEach((nav) => scrollToView(nav));
checkHeader.addEventListener("change", toggleNav);

// Calculate root margin for sticky navigation based on screen width
const calculateRootMargin = () => {
  const screenWidth = window.innerWidth;
  // Compare breakpoints
  if (screenWidth > 900) return `-${section1Height + 50}px 0px 0px 0px`;
  if (screenWidth > 640) return `-${section1Height + 43}px 0px 0px 0px`;
  return `-${section1Height + 33}px 0px 0px 0px`;
};

// Intersection Observer callback for sticky navigation
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

let section1Observer = new IntersectionObserver(stickyNav, {
  threshold: 0,
  rootMargin: calculateRootMargin(),
});
section1Observer.observe(section1);

// Handle scroll direction detection
const handleScroll = () => {
  const currentScroll = window.scrollY;
  header.classList.toggle("nav-show", currentScroll <= lastScroll);
  header.classList.toggle("trans", currentScroll >= 300);
  header.classList.toggle("trans2", currentScroll >= 300);
  lastScroll = currentScroll;
};

// Attach scroll event and update rootMargin on orientation change
window.addEventListener("scroll", handleScroll);
window.addEventListener("orientationchange", () => {
  section1Observer = new IntersectionObserver(stickyNav, {
    threshold: 0,
    rootMargin: calculateRootMargin(),
  });
});

// GSAP text animation for header
gsap.to("#section--1__header", {
  duration: 2,
  delay: 3,
  text: "A Simple Bookmark Manager",
  ease: "sine.inOut",
});

// Intersection observer callback for text trick functionality
const handleTextTrick = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  gsap.to(entry.target, {
    duration: 2,
    delay: 1,
    text: entry.target.dataset.text,
    ease: "sine.inOut",
  });
  observer.unobserve(entry.target);
};

const textObserver = new IntersectionObserver(handleTextTrick, {
  threshold: 0,
});
allRevealHeading.forEach((h) => textObserver.observe(h));

// Intersection observer callback for reveal functionality
const reveal = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const targetC = entry.target.classList;
  if (targetC.contains("section--hidden")) targetC.remove("section--hidden");
  if (targetC.contains("btn--observe")) targetC.remove("opacity-0");
  if (targetC.contains("card--1")) targetC.add("reveal-card--1");
  if (targetC.contains("card--2")) targetC.add("reveal-card--2");
  if (targetC.contains("card--3")) targetC.add("reveal-card--3");

  observer.unobserve(entry.target);
};

const revealSectionObserver = new IntersectionObserver(reveal, {
  threshold: 0,
});
const revealButtonObserver = new IntersectionObserver(reveal, {
  threshold: 1,
  rootMargin: "-50px",
});
const revealCardObserver = new IntersectionObserver(reveal, {
  threshold: 0.2,
});

allRevealSection.forEach((sect) => revealSectionObserver.observe(sect));
allRevealButtons.forEach((btn) => revealButtonObserver.observe(btn));
allRevealCards.forEach((card) => revealCardObserver.observe(card));

// Special observer for viewport 900 and below
if (window.innerWidth <= 900) {
  const revealCardObserverSpecial = new IntersectionObserver(reveal, {
    threshold: 0.2,
  });
  revealCardObserverSpecial.observe(document.querySelector(".card--2"));
}

// GSAP scroll trigger for card scrubbing
const handleCardScrub = (element, bg) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: 0.5,
      start: "top 70%",
      end: "top 40%",
    },
    backgroundColor: bg,
  });
};

handleCardScrub(".card--1", "#e6fff5");
handleCardScrub(".card--2", "#E0F7FA");
handleCardScrub(".card--3", "#fff9e6");

// Intersection observer callback for aside animations
const handleAside = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
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
  threshold: 1,
});
asideObserver.observe(document.querySelector("aside"));

// Form validation and error handling
const showError = function (msg) {
  form.classList.remove("item-start");
  form.classList.add("item-center");
  formDiv.classList.add("error");
  errorText.textContent = msg;
  errorText.classList.remove("hidden");
  errorIcon.classList.remove("hidden");
};

const revertError = function () {
  form.classList.add("item-start");
  form.classList.remove("item-center");
  formDiv.classList.remove("error");
  errorText.classList.add("hidden");
  errorIcon.classList.add("hidden");
};

const handleError = function () {
  const input = document.querySelector("form input");
  const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  // Check if empty
  if (input.value === "") return showError("Field is empty");
  // check if valid email
  if (!reg.test(input.value))
    return showError("Whoops, make sure it's an email");

  revertError();
  input.value = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleError();
});

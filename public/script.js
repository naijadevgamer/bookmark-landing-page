"use strict";

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

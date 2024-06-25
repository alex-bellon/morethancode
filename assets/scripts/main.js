// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
async function init() {
  initializeServiceWorker();

  // Reset progress button
  let resetProgressHolder = document.querySelector("#reset-progress");

  let resetButton = document.createElement("button");

  resetButton.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  resetButton.textContent = "Reset Progress";

  resetButton.style = `
    border-radius: 5px;
    
  `;

  resetProgressHolder.appendChild(resetButton);

  // Navbar toggle
  let navbarToggle = document.querySelector("#navbar-toggle");

  let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") == "true";

  const toggleNavbarVisibility = () => {
    isNavbarExpanded = !isNavbarExpanded;
    navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
  };

  navbarToggle.addEventListener("click", toggleNavbarVisibility);

  const navbarMenu = document.querySelector("#navbar-menu");
  const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");

  navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
  navbarMenu.addEventListener("click", toggleNavbarVisibility);
}

function initializeServiceWorker() {
  /*******************/
  // ServiceWorkers have many uses, the most common of which is to manage
  // local caches, intercept network requests, and conditionally serve from
  // those local caches. This increases performance since users aren't
  // re-downloading the same resources every single page visit. This also allows
  // websites to have some (if not all) functionality offline! I highly
  // recommend reading up on ServiceWorkers on MDN before continuing.
  /*******************/
  // We first must register our ServiceWorker here before any of the code in
  // sw.js is executed.

  // Check if 'serviceWorker' is supported in the current browser
  if ("serviceWorker" in navigator) {
    console.log("It is supported");
  } else {
    console.log("Not supported");
    return;
  }

  navigator.serviceWorker.addEventListener("controllerchange", function () {
    window.location.reload();
  });

  window.addEventListener("load", function () {
    this.navigator.serviceWorker
      .register("./sw.js") // Register './sw.js' as a service worker
      .then(console.log("Register ./sw.js success!"))
      .catch("Register ./sw.js failed :(");
  });
}

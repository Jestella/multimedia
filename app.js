"use strict";

const modal = document.querySelector(".modal");
const modal_submission = document.querySelector(".modal_submission");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".modal_close_btn");
const btnsOpenModal = document.querySelectorAll(".modal_open_btn");
const header = document.querySelector(".header");

// modal window_1 buy ticket
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// message window
const message = document.createElement("div");
message.classList.add("message_window");
message.innerHTML =
  "Current Exhibition [Virtual Life 2021] Design Exchange, Toronto | only 5 days left! &ensp;<button>x</button>";

header.prepend(message);

// close message window

document.querySelector("message_close_btn");
addEventListener("click", function () {
  message.remove();
});

// menu fade animation - use event delegation
const nav = document.querySelector(".nav");

// tabbed component
const tabBtn = document.querySelectorAll(".tab_btn");
const tabContainer = document.querySelector(".tabs");
const tabContent = document.querySelectorAll(".tab_content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target;

  if (!clicked) return;

  // Remove active classes
  tabBtn.forEach((t) => t.classList.remove("tab_btn--active"));
  tabContent.forEach((c) => c.classList.remove("tab_content--active"));

  // Activate tab
  clicked.classList.add("tab_btn--active");

  // Activate content area
  document
    .querySelector(`.tab_content_${clicked.dataset.tab}`)
    .classList.add("tab_content--active");
});

// sticky navigation - use intersection observer API
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserver.observe(header);

// revealing section titles - use intersection observer API
const sections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section_hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section_hidden");
});

// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy_img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));

// slider

const slider = function () {
  const allSlide = document.querySelectorAll(".slide");
  const sliderBtnLeft = document.querySelector(".slider_btn_left");
  const sliderBtnRight = document.querySelector(".slider_btn_right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const lastSlide = allSlide.length;

  const createDots = function () {
    allSlide.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots_dot")
      .forEach((dot) => dot.classList.remove("dots_dot--active"));

    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add("dots_dot--active");
  };

  const goToSlide = function (slide) {
    allSlide.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
    );
  };

  const nextSlide = function () {
    if (curSlide === lastSlide - 1) {
      curSlide;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  sliderBtnRight.addEventListener("click", nextSlide);
  sliderBtnLeft.addEventListener("click", prevSlide);

  // keyboard arrows
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots_dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

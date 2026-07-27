"use strict";

const WHATSAPP_BASE = "https://wa.me/79956478891";
const DEFAULT_MESSAGE = "Здравствуйте! Я увидел ваш сайт и хотел бы уточнить стоимость и детали заказа";
const DEFAULT_WHATSAPP_URL = `${WHATSAPP_BASE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

const projects = [
  {
    image: "assets/images/project-outdoor.webp",
    category: "СТЕКЛОПЛАСТИК • 120 М³",
    title: "Восстановление подземной пожарной ёмкости",
    place: "Пример типовой задачи",
    duration: "После обследования",
    result: "Ликвидация продольного повреждения корпуса, восстановление геометрии и контроль герметичности."
  },
  {
    image: "assets/images/project-laminate.webp",
    category: "ХИМПРОИЗВОДСТВО • 50 М³",
    title: "Ремонт внутреннего химстойкого слоя",
    place: "Пример типовой задачи",
    duration: "После обследования",
    result: "Удаление разрушенного слоя, усиление основания и нанесение нового химически стойкого покрытия."
  },
  {
    image: "assets/images/project-complete.webp",
    category: "РЕЗЕРВУАРНЫЙ ПАРК • 3 ЕД.",
    title: "Плановое восстановление комплекса ёмкостей",
    place: "Пример типовой задачи",
    duration: "После обследования",
    result: "Дефектовка, локальное усиление и восстановление покрытия комплекса резервуаров."
  }
];

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = DEFAULT_WHATSAPP_URL;
});

const menuButton = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector(".mobile-panel");

function setMenu(open) {
  menuButton.classList.toggle("is-open", open);
  mobilePanel.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  mobilePanel.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuButton.addEventListener("click", () => {
  setMenu(!mobilePanel.classList.contains("is-open"));
});

mobilePanel.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalPlace = document.querySelector("#modal-place");
const modalDuration = document.querySelector("#modal-duration");
const modalResult = document.querySelector("#modal-result");
const modalCloseButtons = modal.querySelectorAll(".modal-bg, .modal-close");
let lastProjectTrigger = null;

function openProject(index, trigger) {
  const project = projects[index];
  if (!project) return;
  lastProjectTrigger = trigger;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalPlace.textContent = project.place;
  modalDuration.textContent = project.duration;
  modalResult.textContent = project.result;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeProject() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastProjectTrigger) lastProjectTrigger.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(Number(button.dataset.project), button));
});

modalCloseButtons.forEach((button) => button.addEventListener("click", closeProject));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modal.hidden) closeProject();
    if (mobilePanel.classList.contains("is-open")) setMenu(false);
  }
});

const requestForm = document.querySelector("#request-form");
const formError = requestForm.querySelector(".form-error");
const formSuccess = requestForm.querySelector(".form-success");

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(requestForm);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const phoneDigits = phone.replace(/\D/g, "");
  const company = String(data.get("company") || "").trim();
  const task = String(data.get("task") || "").trim();
  const consent = data.get("consent");
  const valid = name.length >= 2 && phoneDigits.length >= 10 && task.length >= 3 && consent;

  formError.hidden = Boolean(valid);
  formSuccess.hidden = true;

  if (!valid) {
    formError.focus();
    return;
  }

  const message = [
    DEFAULT_MESSAGE,
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Компания: ${company || "—"}`,
    `Задача: ${task}`
  ].join("\n");

  formSuccess.hidden = false;
  window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

"use strict";

const whatsappBase = "https://wa.me/79956478891";
const whatsappMessage = "Здравствуйте! Я увидел ваш сайт и хотел бы уточнить стоимость и детали заказа";
const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(whatsappMessage)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.setAttribute("href", whatsappUrl);
});

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-panel");

function setMenu(open) {
  menuButton.classList.toggle("is-open", open);
  mobileMenu.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  mobileMenu.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuButton.addEventListener("click", () => {
  setMenu(!mobileMenu.classList.contains("is-open"));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const projects = [
  {
    image: "./assets/images/project-outdoor.webp",
    category: "СЦЕНАРИЙ • СТЕКЛОПЛАСТИК",
    title: "Восстановление подземной пожарной ёмкости",
    description: "Пример подачи задачи: диагностика повреждения, восстановление геометрии корпуса и контроль герметичности."
  },
  {
    image: "./assets/images/project-laminate.webp",
    category: "СЦЕНАРИЙ • ХИМПРОИЗВОДСТВО",
    title: "Ремонт внутреннего химстойкого слоя",
    description: "Пример подачи задачи: подготовка основания, локальное усиление и нанесение защитного покрытия."
  },
  {
    image: "./assets/images/project-complete.webp",
    category: "СЦЕНАРИЙ • РЕЗЕРВУАРНЫЙ ПАРК",
    title: "Плановое восстановление комплекса ёмкостей",
    description: "Пример подачи задачи: обследование, локальное усиление и восстановление защитного слоя."
  }
];

const modal = document.querySelector("#project-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");
const modalClose = document.querySelector(".modal-close");
let modalTrigger = null;

function openProject(index, trigger) {
  const project = projects[index];
  if (!project) return;
  modalTrigger = trigger;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDescription.textContent = project.description;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProject() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (modalTrigger) modalTrigger.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(Number(button.dataset.project), button));
});

modalClose.addEventListener("click", closeProject);
document.querySelector(".modal-bg").addEventListener("click", closeProject);
modal.querySelector("[data-whatsapp]").addEventListener("click", closeProject);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!modal.hidden) closeProject();
  else if (mobileMenu.classList.contains("is-open")) setMenu(false);
});

const form = document.querySelector("#contact-form");
const formError = form.querySelector(".form-error");
const formSuccess = form.querySelector(".form-success");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").replace(/\D/g, "");
  const company = String(data.get("company") || "").trim() || "—";
  const task = String(data.get("task") || "").trim();
  const valid = name.length >= 2 && phone.length >= 10 && task.length >= 3 && data.get("consent") === "on";

  formError.hidden = valid;
  formSuccess.hidden = !valid;
  if (!valid) return;

  const message = `${whatsappMessage}.\n\nИмя: ${name}\nТелефон: ${data.get("phone")}\nКомпания: ${company}\nЗадача: ${task}`;
  window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

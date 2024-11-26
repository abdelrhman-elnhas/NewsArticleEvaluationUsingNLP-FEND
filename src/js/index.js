import { handleFormSubmit } from "./formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("articleForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("Form element not found!");
  }
});

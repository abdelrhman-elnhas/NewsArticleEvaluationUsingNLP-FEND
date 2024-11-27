import { handleFormSubmit } from "../js/formHandler.js";

const form = document.getElementById("articleForm");
export function handleForm() {
  const form = document.getElementById("articleForm");
  if (!form) {
    console.error("Form element not found!");
    return;
  }
  form.addEventListener("submit", handleFormSubmit);
}

import { handleFormSubmit } from "../js/formHandler.js";
import "../styles/main.scss";

document
  .getElementById("articleForm")
  .addEventListener("submit", handleFormSubmit);

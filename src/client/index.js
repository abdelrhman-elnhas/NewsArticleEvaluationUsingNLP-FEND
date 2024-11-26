import "../styles/main.scss";
import { handleFormSubmit } from "../js/formHandler.js";

document
  .getElementById("articleForm")
  .addEventListener("submit", handleFormSubmit);

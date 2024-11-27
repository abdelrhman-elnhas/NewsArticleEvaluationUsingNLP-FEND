import { handleForm } from "../js/index.js";
describe("Form Submission Tests", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="articleForm">
        <input type="text" name="url" />
        <button type="submit">Submit</button>
      </form>
    `;
  });

  test("Form element exists and adds event listener", () => {
    const form = document.getElementById("articleForm");
    const spy = jest.spyOn(form, "addEventListener"); // Spy on addEventListener method

    handleForm(); // Call the function that should add the event listener

    // Check if addEventListener was called with the correct arguments
    expect(spy).toHaveBeenCalledWith("submit", expect.any(Function)); // Check for submit event and function

    spy.mockRestore();
  });

  test("Logs error if form element is missing", () => {
    document.body.innerHTML = "";

    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    handleForm();

    expect(spy).toHaveBeenCalledWith("Form element not found!");
    spy.mockRestore();
  });
});

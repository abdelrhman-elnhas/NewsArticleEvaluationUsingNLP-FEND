import { handleForm } from "../js/index.js"; // Ensure correct import
describe("Form Submission Tests", () => {
  // Set up the form before each test
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

    spy.mockRestore(); // Restore the original addEventListener after the test
  });

  test("Logs error if form element is missing", () => {
    document.body.innerHTML = ""; // Remove the form from the document

    const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // Spy on console.error
    handleForm(); // Call the function

    expect(spy).toHaveBeenCalledWith("Form element not found!"); // Expect error message
    spy.mockRestore(); // Restore the original console.error
  });
});

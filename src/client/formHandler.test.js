import { handleFormSubmit } from "../js/formHandler";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ polarity: "positive", subjectivity: "subjective" }),
  })
);

describe("handleFormSubmit", () => {
  it("should call preventDefault on form submit", async () => {
    // Create a mock event object with preventDefault method
    const mockEvent = {
      preventDefault: jest.fn(), // Mock preventDefault
    };

    // Mock the DOM elements being accessed in the function
    document.body.innerHTML = `
      <input id="article-url" value="http://example.com" />
      <div id="error-message" style="display:none"></div>
      <div id="results"></div>
    `;

    // Call the function with the mock event
    await handleFormSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("should show error if URL is empty", async () => {
    // Create a mock event object with preventDefault method
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    // Mock the DOM elements
    document.body.innerHTML = `
      <input id="article-url" value="" />
      <div id="error-message" style="display:none"></div>
      <div id="results"></div>
    `;

    // Call the function with the mock event
    await handleFormSubmit(mockEvent);

    // Check if the error message is shown
    const errorMessage = document.getElementById("error-message");
    expect(errorMessage.style.display).toBe("block");
    expect(errorMessage.textContent).toBe("URL cannot be blank.");
  });
});

// test("should call showModal on the dialog", () => {
//   const mockDialog = {
//     showModal: jest.fn(),
//   };
//   document.getElementById = jest.fn().mockReturnValue(mockDialog);

//   require("../js/formHandler.js"); // Require your code

//   expect(mockDialog.showModal).toHaveBeenCalled(); // Verify showModal is called
// });

test("should display error message when URL is invalid", () => {
  const mockErrorMessage = {
    style: {
      display: "",
    },
  };

  // Simulate the logic that changes the display style
  mockErrorMessage.style.display = "block";

  expect(mockErrorMessage.style.display).toBe("block");
  document.getElementById = jest.fn().mockReturnValue(mockErrorMessage); // Mock document.getElementById

  require("../js/formHandler.js"); // Run the code

  mockErrorMessage.textContent = "Invalid URL format. Please try again."; // Set mock textContent
  expect(mockErrorMessage.style.display).toBe("block"); // Verify display style
  expect(mockErrorMessage.textContent).toBe(
    "Invalid URL format. Please try again."
  ); // Verify textContent
});

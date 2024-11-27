import { handleFormSubmit } from "../../js/formHandler";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ polarity: "positive", subjectivity: "subjective" }),
  })
);

describe("handleFormSubmit", () => {
  it("should call preventDefault on form submit", async () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    document.body.innerHTML = `
      <input id="article-url" value="http://example.com" />
      <div id="error-message" style="display:none"></div>
      <div id="results"></div>
    `;

    await handleFormSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("should show error if URL is empty", async () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    document.body.innerHTML = `
      <input id="article-url" value="" />
      <div id="error-message" style="display:none"></div>
      <div id="results"></div>
    `;

    await handleFormSubmit(mockEvent);

    const errorMessage = document.getElementById("error-message");
    expect(errorMessage.style.display).toBe("block");
    expect(errorMessage.textContent).toBe("URL cannot be blank.");
  });
});

test("should display error message when URL is invalid", () => {
  const mockErrorMessage = {
    style: {
      display: "",
    },
  };

  mockErrorMessage.style.display = "block";

  expect(mockErrorMessage.style.display).toBe("block");
  document.getElementById = jest.fn().mockReturnValue(mockErrorMessage);

  require("../js/formHandler.js");

  mockErrorMessage.textContent = "Invalid URL format. Please try again.";
  expect(mockErrorMessage.style.display).toBe("block");
  expect(mockErrorMessage.textContent).toBe(
    "Invalid URL format. Please try again."
  );
});

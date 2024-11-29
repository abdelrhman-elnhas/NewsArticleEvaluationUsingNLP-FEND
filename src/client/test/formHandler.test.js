import { handleFormSubmit } from "../../js/formHandler";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ polarity: "positive", subjectivity: "objective" }),
  })
);

describe("handleFormSubmit", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  beforeEach(() => {
    document.body.innerHTML = `
			<input id="article-url" value="" />
			<div id="error-message" style="display: none;"></div>
			<dialog id="dialog"></dialog>
		`;
  });

  it("should show error if URL is empty", async () => {
    const mockEvent = { preventDefault: jest.fn() };
    document.getElementById("article-url").value = "";

    await handleFormSubmit(mockEvent);

    const errorMessage = document.getElementById("error-message");
    expect(errorMessage.style.display).toBe("block");
    expect(errorMessage.textContent).toBe("URL cannot be blank.");
  });

  it("should show error for invalid URL format", async () => {
    const mockEvent = { preventDefault: jest.fn() };
    document.getElementById("article-url").value = "invalid-url";

    await handleFormSubmit(mockEvent);

    const errorMessage = document.getElementById("error-message");
    expect(errorMessage.style.display).toBe("block");
    expect(errorMessage.textContent).toBe(
      "Invalid URL format. Please try again."
    );
  });

  it("should call fetch for a valid URL and display results", async () => {
    const mockEvent = { preventDefault: jest.fn() };
    document.getElementById("article-url").value = "http://example.com";

    await handleFormSubmit(mockEvent);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8081/api",
      expect.any(Object)
    );
    const dialog = document.getElementById("dialog");
    expect(dialog.innerHTML).toContain("Polarity:");
    expect(dialog.innerHTML).toContain("Subjectivity:");
  });
});

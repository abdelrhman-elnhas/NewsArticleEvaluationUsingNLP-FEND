export const handleFormSubmit = async (e) => {
  e.preventDefault();

  const url = document.getElementById("article-url").value;
  const errorMessage = document.getElementById("error-message");

  const dialog = document.getElementById("dialog"); // Ensure this matches your actual HTML
  if (dialog) {
    dialog.showModal();
  } else {
    console.error("Dialog element not found!");
    return;
  }

  // Regex for URL validation
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

  if (!url) {
    errorMessage.textContent = "URL cannot be blank.";
    errorMessage.style.display = "block";
    return;
  } else if (!urlRegex.test(url)) {
    errorMessage.textContent = "Invalid URL format. Please try again.";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none"; // Clear error for valid URL
  }

  try {
    const response = await fetch("http://localhost:8081/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch results.");
    }

    const data = await response.json();

    if (data.error) {
      errorMessage.textContent = `Error: ${data.error}`;
      errorMessage.style.display = "block";
      return;
    }

    // Populate results dialog
    const results = document.getElementById("dialog");
    if (results) {
      results.innerHTML = `
        <p><strong>Polarity:</strong> ${data.polarity}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <button id="close">Check Another Article</button>
      `;

      const closeButton = document.getElementById("close");
      closeButton.addEventListener("click", () => results.close());
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.textContent = "Failed to fetch results. Please try again.";
    errorMessage.style.display = "block";
  }
};

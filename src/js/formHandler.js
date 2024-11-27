export const handleFormSubmit = async (e) => {
  e.preventDefault();

  const url = document.getElementById("article-url").value;
  const errorMessage = document.getElementById("errorMessage");

  // Regex for URL validation
  const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;

  const dialog = document.getElementById("dialog");
  if (dialog) {
    dialog.showModal();
  } else {
    console.error("Dialog element not found!");
  }

  if (!url) {
    if (errorMessage) {
      errorMessage.textContent = "URL cannot be blank.";
      errorMessage.style.display = "block";
    }
    return;
  } else if (!urlRegex.test(url)) {
    if (errorMessage) {
      errorMessage.textContent = "Invalid URL format. Please try again.";
      errorMessage.style.display = "block";
    }
    return;
  } else {
    if (errorMessage) {
      errorMessage.style.display = "none";
    }
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
      if (errorMessage) {
        errorMessage.textContent = `Error: ${data.error}`;
        errorMessage.style.display = "block";
      }
      return;
    }

    const results = document.getElementById("results");
    if (results) {
      results.innerHTML = `
        <p><strong>Polarity:</strong> ${data.polarity}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
        <button id="close">Check Another Article</button>
      `;
      results.showModal();

      const closeButton = document.getElementById("close");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          results.close();
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    if (errorMessage) {
      errorMessage.textContent = "Failed to fetch results. Please try again.";
      errorMessage.style.display = "block";
    }
  }
};

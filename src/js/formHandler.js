export const handleFormSubmit = async (event) => {
  event.preventDefault();

  const url = document.getElementById("article-url").value;

  if (!url) {
    alert("URL cannot be blank.");
    return;
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
      alert(`Error: ${data.error}`);
      return;
    }

    if (data && data !== "") {
      document.getElementById("results").innerHTML = `
        <p><strong>Polarity:</strong> ${data.polarity}</p>
        <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
				<button id="close">Check Another Article</button>
      `;
    } else {
      document.getElementById("results").innerHTML = `
        <p>No meaningful content found in the article. Please check the URL.</p>
      `;
    }

    document.getElementById("results").showModal();
    document.getElementById("close").addEventListener("click", () => {
      document.getElementById("results").close();
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch results. Please try again.");
  }
};

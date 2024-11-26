import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "src/views" });
});

const apiKey = process.env.MEANINGCLOUD_API_KEY;
const apiUrl = "https://api.meaningcloud.com/sentiment-2.1";

app.post("/api", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const apiResponse = await fetch(
      `${apiUrl}?key=${apiKey}&url=${encodeURIComponent(url)}&lang=en`,
      { method: "POST" }
    );

    if (!apiResponse.ok) {
      throw new Error("Failed to fetch from MeaningCloud API");
    }

    const data = await apiResponse.json();

    if (!data.sentence_list || data.sentence_list.length === 0) {
      throw new Error("No sentences found in the API response.");
    }

    res.json({
      polarity: data.score_tag,
      subjectivity: data.subjectivity,
      text: data.sentence_list[0]?.text || "No text available",
    });
  } catch (error) {
    console.error("Error fetching from MeaningCloud API:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

const PORT = 8081;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

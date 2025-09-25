import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { category } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a short ${category} quote under 20 words with a suitable author. Return ONLY valid JSON like {"quote": "...", "author": "..."}. Do not include any code blocks or extra text.`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Remove ```json ... ``` if present
    rawText = rawText.replace(/```json\n?/, "").replace(/```/, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = { quote: rawText || "No quote generated.", author: "Unknown" };
    }

    res.json(parsed);
  } catch (error) {
    console.error("Error generating quote:", error);
    res.status(500).json({ quote: "Failed to generate quote.", author: "System Error" });
  }
});

export default router;

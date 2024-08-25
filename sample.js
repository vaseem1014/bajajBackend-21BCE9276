const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const userId = "Shaik_Vaseem_Aman_14_10_2003";
const email = "vaseem1014@gmail.com";
const rollNumber = "21BCE9276";

function separateData(data) {
  const numbers = [];
  const alphabets = [];
  let highestAlphabet = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (
      typeof item === "string" &&
      item.length === 1 &&
      /^[A-Za-z]$/.test(item)
    ) {
      alphabets.push(item);
      if (
        !highestAlphabet ||
        item.toLowerCase() > highestAlphabet.toLowerCase()
      ) {
        highestAlphabet = item;
      }
    }
  });

  return {
    numbers,
    alphabets,
    highestAlphabet: highestAlphabet ? [highestAlphabet] : [],
  };
}

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, error: "Invalid input data" });
  }

  const { numbers, alphabets, highestAlphabet } = separateData(data);

  res.json({
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

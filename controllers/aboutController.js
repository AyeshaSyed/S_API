// ScholiumAPP/ScholiumAPI/controllers/aboutController.js
const db = require("../config/db");
console.log("aboutController.js:");

exports.submitContactForm = async (req, res) => {
  // Extracting fields from the request body
  const { contact_name, contact_email, message } = req.body;
  console.log("Headers:", req.headers);
  console.log("Raw Body:", req.body);

  // Logging the extracted fields for debugging purposes
  console.log("Contact Name:", contact_name);
  console.log("Contact Email:", contact_email);
  console.log("Message:", message);

  // Validating the fields
  if (!contact_name || !contact_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Inserting the fields into the 'about' table
    await db("about").insert({ contact_name, contact_email, message });

    // Sending a success response
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    // Sending an error response in case of failure
    res.status(500).json({ error: error.message });
  }
};

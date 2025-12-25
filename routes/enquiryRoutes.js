const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");

/* =========================
   EMAIL TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   POST ENQUIRY + EMAIL
========================= */
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save enquiry to DB
    const enquiry = await Enquiry.create(req.body);

    // 2️⃣ Send email notification (NON-BLOCKING)
    transporter.sendMail({
      from: `"Maurya Industries Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Website Enquiry Received",
      html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Phone:</b> ${req.body.phone || "-"}</p>
        <p><b>Message:</b> ${req.body.message}</p>
        <hr />
        <p>This enquiry was submitted from the Maurya Industries website.</p>
      `,
    }).catch((err) => {
      console.error("❌ Email failed:", err.message);
    });

    // 3️⃣ Respond success
    res.status(201).json({ success: true, enquiry });
  } catch (error) {
    console.error("❌ Enquiry error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
});

/* =========================
   GET ENQUIRIES (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* =========================
   DELETE ENQUIRY (ADMIN)
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

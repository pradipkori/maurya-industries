const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");

/* =========================
   EMAIL TRANSPORTER (RENDER SAFE)
========================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT for Render
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================
   VERIFY EMAIL TRANSPORTER
========================= */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter ready");
  }
});

/* =========================
   POST ENQUIRY + EMAIL
========================= */
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save enquiry to DB
    const enquiry = await Enquiry.create(req.body);

    // 2️⃣ Send email notification
    try {
      const info = await transporter.sendMail({
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
      });

      console.log("✅ Email sent:", info.response);
    } catch (mailError) {
      console.error("❌ Email sending failed:", mailError);
    }

    // 3️⃣ Respond success
    res.status(201).json({ success: true, enquiry });
  } catch (error) {
    console.error("❌ Enquiry save error:", error);
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

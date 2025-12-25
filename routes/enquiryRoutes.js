const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const { Resend } = require("resend");

/* =========================
   RESEND EMAIL CLIENT
========================= */
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   POST ENQUIRY + EMAIL
========================= */
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save enquiry to DB (NO CHANGE)
    const enquiry = await Enquiry.create(req.body);

    // 2️⃣ Send email notification (RENDER SAFE)
    try {
      await resend.emails.send({
        from: "Maurya Industries <onboarding@resend.dev>",
        to: ["mauryaindustries1978@gmail.com"],
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

      console.log("✅ Email sent successfully");
    } catch (emailError) {
      console.error("❌ Email failed (Resend):", emailError);
    }

    // 3️⃣ Respond success (NO CHANGE)
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

import { Router } from "express";
import { ContactSubmission, OrderSubmission } from "@workspace/db";

const router = Router();

/**
 * Lead-capture routes for the portfolio site's forms.
 *
 * Submissions are persisted to MongoDB (see @workspace/db). Wire in real
 * email notifications (e.g. Nodemailer/Resend) here as well if you want to
 * be notified in real time.
 */

router.post("/contact", async (req, res) => {
  const body = req.body ?? {};

  if (
    typeof body.fullName !== "string" ||
    !body.fullName ||
    typeof body.email !== "string" ||
    !body.email ||
    typeof body.message !== "string" ||
    !body.message
  ) {
    res
      .status(400)
      .json({ error: "fullName, email, and message are required" });
    return;
  }

  req.log.info(
    { from: body.email, subject: body.subject },
    "Contact form submission received",
  );

  try {
    await ContactSubmission.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      projectType: body.projectType,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to persist contact submission");
    res.status(500).json({ error: "Failed to save your message" });
    return;
  }

  res.status(201).json({ success: true });
});

router.post("/order", async (req, res) => {
  const body = req.body ?? {};

  if (
    typeof body.name !== "string" ||
    !body.name ||
    typeof body.email !== "string" ||
    !body.email ||
    typeof body.projectType !== "string" ||
    !body.projectType ||
    typeof body.projectDescription !== "string" ||
    !body.projectDescription
  ) {
    res.status(400).json({
      error: "name, email, projectType, and projectDescription are required",
    });
    return;
  }

  req.log.info(
    { from: body.email, projectType: body.projectType },
    "Website order submission received",
  );

  try {
    await OrderSubmission.create({
      businessName: body.businessName,
      name: body.name,
      email: body.email,
      phone: body.phone,
      projectType: body.projectType,
      websitePages: body.websitePages,
      featuresNeeded: body.featuresNeeded,
      budget: body.budget,
      deadline: body.deadline,
      referenceWebsite: body.referenceWebsite,
      projectDescription: body.projectDescription,
      preferredContactMethod: body.preferredContactMethod,
      agreeToBeContacted: Boolean(body.agreeToBeContacted),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to persist order submission");
    res.status(500).json({ error: "Failed to save your order" });
    return;
  }

  res.status(201).json({ success: true });
});

export default router;

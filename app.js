// Nexora Web shared front-end. LocalStorage is browser-local, not a shared online database.

// EMAILJS CONFIG — replace all placeholders with values from your EmailJS account.
const EMAILJS_CONFIG = {
  publicKey: "dGiKTJjhBnyN8j8Ah",
  serviceId: "service_4qqqwrk",
  templateId: "template_ifi4tea",
  toEmail: "manomalik3817@gmail.com"
};

const emailJsConfigured = () =>
  Boolean(window.emailjs) &&
  [EMAILJS_CONFIG.publicKey, EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId]
    .every(value => value && !value.startsWith("YOUR_"));

const STORAGE_KEY = "nexora_web_messages_v1";
const readMessages = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};
const writeMessages = items => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

 document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  if (emailJsConfigured()) {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }

  const form = document.querySelector("#contactForm");
  if (!form) return;

  const status = document.querySelector("#formSuccess");
  const submitButton = form.querySelector('[type="submit"]');

  const showStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("success", "error", "show");
    status.classList.add(type, "show");
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const msg = {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      ...data,
      createdAt: new Date().toISOString(),
      status: "New"
    };

    // Save to this browser's Inbox dashboard.
    const items = readMessages();
    items.unshift(msg);
    writeMessages(items);

    if (!emailJsConfigured()) {
      form.reset();
      showStatus("Message saved here. Email notifications aren’t configured yet.", "error");
      return;
    }

    // These variable names must match the EmailJS template.
    const templateParams = {
      name: data.name,
      title: "Nexora Web Contact Form",
      email: data.email,
      service: data.service,
      budget: data.budget || "Not specified",
      message: data.message,
      to_email: EMAILJS_CONFIG.toEmail,
      reply_to: data.email
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams);
      form.reset();
      showStatus("Thanks!", "success");
    } catch (error) {
      console.error("EmailJS send failed:", error);
      showStatus("Your message was saved here, but the email couldn’t be sent. Check your EmailJS setup and try again.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message ↗";
      }
    }
  });
});

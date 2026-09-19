NEXORA WEB — MULTI-PAGE WEBSITE
================================

FILES
- index.html       Home
- about.html       About
- services.html    Services
- portfolio.html   Portfolio (6 editable sample concepts)
- contact.html     Contact form
- inbox.html       Local browser inbox dashboard
- style.css        Shared responsive dark purple/blue theme
- app.js           Navigation, form validation, LocalStorage, optional EmailJS hook

PREVIEW
1. Extract the ZIP.
2. Open index.html in a browser.
3. Submit a test message on contact.html.
4. Open inbox.html in the SAME browser/device to see the saved submission.

IMPORTANT: EMAIL + ONLINE INBOX
This is a static HTML/CSS/JS starter. By default, form submissions are stored in LocalStorage on the visitor's browser. They are NOT automatically emailed or shared across devices.

To enable email notifications at your business email:
1. Create an account at https://www.emailjs.com/
2. Connect an email service and create a template.
3. EmailJS is preconfigured in app.js with the provided Public Key, Service ID, and Template ID.
4. The EmailJS Browser SDK is already included in contact.html. app.js initializes it automatically.
5. The Contact Us template's To Email should remain set to your intended inbox. Set Reply-To to {{email}} (or {{reply_to}} if you update the template to use that variable).
6. Add template variables: {{name}}, {{email}}, {{service}}, {{budget}}, and {{message}}.
7. In app.js, update toEmail if needed. Test using the EmailJS dashboard and check Spam/Junk.
8. The form shows “Thanks!” only after EmailJS reports a successful send. If setup is missing or sending fails, it displays a clear status. Never put account passwords or private/secret keys in front-end files.

For a private, cross-device inbox, add a backend/database with admin authentication. inbox.html is a local demo, not a secure admin portal.

CUSTOMIZE
- Replace sample portfolio concepts with real projects.
- Update Instagram URL in footer.
- Brand mark is a text N monogram; you can replace it with your logo image.
- Edit services and copy as your business grows.

DEPLOYMENT
Upload all files together to GitHub Pages, Netlify, or your hosting provider. Configure a custom domain through that host if desired.

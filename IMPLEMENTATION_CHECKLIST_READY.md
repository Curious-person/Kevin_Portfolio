# Supabase + Cloudinary + Resend Migration Checklist

Follow these steps to complete the migration of your portfolio backend.

---

## 🛠️ Step 1: External Account Setups

### A. Supabase (Database)
1. Go to [supabase.com](https://supabase.com/) and create a free account.
2. Create a new project (e.g. `kevin-portfolio`).
3. Note your Database Password.
4. Once created, go to **Project Settings > API** and copy:
   * **Project URL**
   * **Project API keys (anon / public)**

### B. Cloudinary (Image Hosting)
1. Create a free account on [cloudinary.com](https://cloudinary.com/).
2. On your Cloudinary Dashboard, copy:
   * **Cloud Name**
   * **API Key**
   * **API Secret**

### C. Resend (Email Deliverability)
1. Go to [resend.com](https://resend.com/) and create an account.
2. Go to **API Keys** and click **Create API Key** (with sending permissions). Copy the key.
3. (Optional for Production): Under **Domains**, add and verify your custom domain to send emails from `yourname@yourdomain.com`. By default, you can send to yourself using their default onboarding domain.

---

## 📝 Step 2: Configure Environment Variables

1. Open your local [.env.local](file:///c:/personal-project/Kevin_portfolio/.env.local) file.
2. Fill in the keys you copied in Step 1:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>

   RESEND_API_KEY=re_<your-resend-key>
   CONTACT_FROM_EMAIL=<your-verified-from-email-or-onboarding@resend.dev>
   CONTACT_TO_EMAIL=<your-personal-inbox-email>
   ```

---

## 💾 Step 3: Database Initializing

1. Open your Supabase project dashboard.
2. Click on **SQL Editor** in the left sidebar menu.
3. Click **New Query**.
4. Open [supabase-schema.sql](file:///c:/personal-project/Kevin_portfolio/supabase-schema.sql) in your code editor, copy the entire file contents, and paste it into the Supabase SQL input field.
5. Click **Run**.
6. Verify that 6 tables (`projects`, `case_studies`, `designs`, `experience`, `stats`, `contact_submissions`) are created and seeded with initial records.

---

## 🖼️ Step 4: Hosting Images on Cloudinary

1. Log into your Cloudinary console.
2. Upload your design files, portfolio screen captures, and portrait photos to the media library.
3. Click the link icon on each uploaded asset to copy the secure full URL (e.g. `https://res.cloudinary.com/...`).
4. In the Supabase project dashboard, navigate to the **Table Editor** for the `designs` and `projects` tables.
5. Replace the mock image URLs in the table rows with the Cloudinary URLs you copied.

---

## 📦 Step 5: Install Dependencies

Run the package installation command to download Supabase and Resend packages:
```bash
npm install @supabase/supabase-js resend
```

---

## 🧪 Step 6: Testing Checklist

### 1. Verification of Home Page Loading
* Start the local server: `npm run dev`.
* Navigate to `http://localhost:3000`.
* Check if the projects count and details are retrieved from Supabase.
* Toggle active sections (Projects / Designs / Case Studies) to ensure Framer Motion animations work correctly.

### 2. Verification of Creative Designs
* Go to the **Designs** tab on the homepage.
* Verify that images load correctly using the Cloudinary secure URLs.
* Click on a design card and confirm the modal displays the magnified render.

### 3. Verification of Career Experience
* Navigate to `/about`.
* Confirm that the Experience list is populated dynamically from the database.

### 4. Verification of Contact Form
* Go to `/contact`.
* Fill in all form fields and submit.
* Verify:
  1. An alert is shown stating the message was sent successfully.
  2. The form fields are automatically cleared.
  3. The database table `contact_submissions` in Supabase contains the new record.
  4. An email notification arrives in your `CONTACT_TO_EMAIL` inbox containing the formatted submission details.

---

## ⚠️ Troubleshooting Guide

* **Error: `Missing Supabase environment variables`**
  * Check that your `.env.local` file is named correctly (at the root of the project) and that you restarted your local dev server (`npm run dev`) after creating/editing it.
* **Image fails to load with Hostname Error**
  * Ensure that `res.cloudinary.com` is spelled correctly in the `next.config.ts` under the `images.remotePatterns` array.
* **Email doesn't send / Resend error**
  * Ensure you are sending *to* the email address you registered with Resend if you are using a free sandbox key.
  * Check that the `CONTACT_FROM_EMAIL` is set to `onboarding@resend.dev` (if using sandbox) or to a verified domain email.

# Package Installations Reference

The following npm packages are required to support the Supabase database connection and Resend email integrations.

## Required Packages

1. **`@supabase/supabase-js`** (v2.x) - Client library to connect to the Supabase PostgreSQL database.
2. **`resend`** (v4.x) - Client library to send email notifications.

---

## Installation Commands

Run the command corresponding to your package manager in the root directory:

### Using NPM
```bash
npm install @supabase/supabase-js resend
```

### Using Yarn
```bash
yarn add @supabase/supabase-js resend
```

### Using PNPM
```bash
pnpm add @supabase/supabase-js resend
```

### Using Bun
```bash
bun add @supabase/supabase-js resend
```

---

## Already Included Packages

These validation and form packages are already configured in the codebase and do not require re-installation:
* `react-hook-form` (handles form state)
* `zod` (handles schema validation)
* `@hookform/resolvers` (connects React Hook Form with Zod validation)

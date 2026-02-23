/**
 * @file SignInPage.tsx
 * @description Sign-in page.
 *
 * Composes AuthLayout (background + overlay) with the SignInForm component.
 * This file intentionally contains only layout/composition — all UI logic
 * lives in components/ui/SignInForm.tsx.
 */

import AuthLayout from "@/layouts/AuthLayout";
import SignInForm from "@/components/ui/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout backgroundImage="/experts-hair-3.webp">
      <SignInForm />
    </AuthLayout>
  );
}

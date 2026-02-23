/**
 * @file UnauthorizedPage.tsx
 * @description 403 — Access Denied page.
 *
 * Shows a centred message with a role-aware "Go back" button.
 */

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldX, ArrowLeft } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";
import { useAuth } from "@/context/AuthContext";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    if (!user) {
      navigate("/signin");
    } else if (user.role === "receptionist") {
      navigate("/visit-entry");
    } else if (user.role === "manager") {
      navigate("/dashboard/manager");
    } else if (user.role === "owner") {
      navigate("/dashboard/owner");
    } else {
      navigate("/signin");
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl w-full px-6 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <ShieldX className="w-16 h-16 text-stone-300 mb-4" />

          <h1 className="text-3xl font-black text-stone-900">Access Denied</h1>

          <p className="text-stone-500 mt-2">
            You don't have permission to view this page.
          </p>

          <button
            onClick={handleBack}
            className="bg-stone-900 text-white rounded-xl px-6 py-3 hover:bg-stone-800 transition-colors mt-8 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </AppLayout>
  );
}

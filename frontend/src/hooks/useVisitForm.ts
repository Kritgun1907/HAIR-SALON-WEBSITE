/**
 * @file useVisitForm.ts
 * @description Custom React hook encapsulating all visit-entry form logic.
 *
 * Manages form state, validation, dropdown data fetching, and the
 * full Razorpay checkout flow (load SDK → create order → open modal
 * → verify → redirect to /payment-status).
 *
 * Amount is **auto-calculated** from selected services.
 * Discount is entered as a **percentage** (0–100).
 */

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type {
  VisitFormData,
  VisitFormErrors,
  ApiFormData,
  RazorpayResponse,
} from "@/types/visit";
import { loadRazorpayScript } from "@/services/razorpay";
import { fetchFormData, createOrder, verifyOrderPayment, createVisit } from "@/services/api";

const today = new Date().toISOString().split("T")[0];

const EMPTY_FORM: VisitFormData = {
  name: "",
  phone: "",
  amount: "",
  age: "",
  gender: "",
  startTime: "",
  endTime: "",
  artist: "",
  serviceType: [],
  searchService: [],
  discount: "",
  date: today,
};

export function useVisitForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<VisitFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<VisitFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [dropdownData, setDropdownData] = useState<ApiFormData>({
    artists: [],
    serviceTypes: [],
    services: [],
  });
  const [dropdownLoading, setDropdownLoading] = useState(true);
  const [dropdownError, setDropdownError] = useState(false);

  // Load dropdown options on mount
  useEffect(() => {
    setDropdownLoading(true);
    fetchFormData()
      .then((data) => {
        setDropdownData(data);
        setDropdownError(false);
      })
      .catch(() => {
        setDropdownError(true);
      })
      .finally(() => setDropdownLoading(false));
  }, []);

  // ── Service display items for MultiSelect (append price to name) ───────────
  const serviceDisplayItems = useMemo(
    () =>
      dropdownData.services.map((s) => ({
        id: s.id,
        name: `${s.name} — ₹${s.price.toLocaleString("en-IN")}`,
      })),
    [dropdownData.services]
  );

  // ── Auto-calculated amount from selected services ──────────────────────────
  const subtotal = useMemo(() => {
    return formData.searchService.reduce((sum, id) => {
      const svc = dropdownData.services.find((s) => s.id === id);
      return sum + (svc?.price ?? 0);
    }, 0);
  }, [formData.searchService, dropdownData.services]);

  /** Discount percentage (clamped 0–100). */
  const discountPct = Math.min(100, Math.max(0, Number(formData.discount) || 0));

  /** Flat discount amount derived from percentage. */
  const discountAmt = Math.round(subtotal * (discountPct / 100));

  /** Final amount payable after discount. */
  const payable = Math.max(0, subtotal - discountAmt);

  // Keep formData.amount in sync so the rest of the flow sees it
  useEffect(() => {
    setFormData((prev) => {
      const next = String(payable);
      return prev.amount !== next ? { ...prev, amount: next } : prev;
    });
  }, [payable]);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: VisitFormErrors = {};
    if (!formData.name.trim()) e.name = "Name is required";
    else if (formData.name.trim().length < 2) e.name = "At least 2 characters";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim()))
      e.phone = "Valid 10-digit Indian mobile number";
    if (!formData.age) e.age = "Age is required";
    if (!formData.gender) e.gender = "Gender is required";
    if (!formData.date) e.date = "Date is required";
    if (!formData.startTime) e.startTime = "Start time is required";
    if (!formData.endTime) e.endTime = "End time is required";
    if (!formData.artist) e.artist = "Artist is required";
    if (subtotal <= 0) e.amount = "Select at least one service";
    else if (payable <= 0) e.amount = "Payable amount must be greater than ₹0";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Change handlers ────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof VisitFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelect = (field: keyof VisitFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof VisitFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /** For multi-select fields (string[] values) — replaces the whole array. */
  const handleMultiSelect =
    (field: keyof VisitFormData) => (values: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: values }));
    };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData({ ...EMPTY_FORM, date: today });
    setErrors({});
    setPaymentError(null);
  };

  // ── Submit / payment flow ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setPaymentError(null);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded)
        throw new Error("Failed to load Razorpay SDK. Check your connection.");

      const order = await createOrder({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        amount: payable,
      });

      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Hair Salon",
        description: "Visit Payment",
        order_id: order.order_id,
        prefill: {
          name: formData.name.trim(),
          contact: `+91${formData.phone.trim()}`,
        },
        theme: { color: "#1c1917" },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            setPaymentError("Payment was cancelled. Please try again.");
          },
        },
        handler: async (response: RazorpayResponse) => {
          const result = await verifyOrderPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            amount: order.amount,
          });

          if (result.success) {
            // Persist the visit in the database
            let visitRecordFailed = false;
            try {
              // Resolve artist ID → name (Visit model stores the display name,
              // which analytics uses for leaderboard / deep-dive grouping)
              const selectedArtist = dropdownData.artists.find(
                (a) => a.id === formData.artist,
              );

              await createVisit({
                name: formData.name.trim(),
                contact: formData.phone.trim(),
                age: formData.age,
                gender: formData.gender,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                artist: selectedArtist?.name ?? formData.artist,
                serviceType:
                  formData.serviceType.length > 0
                    ? formData.serviceType.join(", ")
                    : undefined,
                serviceIds: formData.searchService,
                discountPercent: discountPct,
                razorpayPaymentId: result.payment_id,
              });
            } catch {
              // Visit creation failed but payment succeeded — flag it
              console.error("Visit record creation failed after payment");
              visitRecordFailed = true;
            }

            const params = new URLSearchParams({
              payment_id: result.payment_id,
              amount: String(result.amount),
              name: result.name,
              phone: result.phone,
            });
            if (visitRecordFailed) {
              params.set("visit_warning", "true");
            }
            navigate(`/payment-status?${params}`);
          } else {
            setPaymentError("Payment verification failed. Contact support.");
            setIsLoading(false);
          }
        },
      });

      rzp.open();
    } catch (err) {
      setPaymentError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    paymentError,
    dropdownData,
    dropdownLoading,
    dropdownError,
    serviceDisplayItems,
    subtotal,
    discountPct,
    discountAmt,
    payable,
    handleChange,
    handleSelect,
    handleMultiSelect,
    handleSubmit,
    handleReset,
  };
}

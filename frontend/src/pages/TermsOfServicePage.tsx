/**
 * @file TermsOfServicePage.tsx
 * @description Terms of Service page for The Experts Hair Salon.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollText, Scissors } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

const LAST_UPDATED = "24 February 2026";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  index: number;
}

function Section({ title, children, index }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.07 }}
      className="mb-10"
    >
      <h2 className="text-xl font-bold text-stone-800 mb-3 flex items-center gap-2">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black text-amber-600 shrink-0"
          style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="text-sm text-stone-500 leading-relaxed space-y-2 font-light pl-9">
        {children}
      </div>
    </motion.div>
  );
}

export default function TermsOfServicePage() {
  return (
    <AppLayout>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden pt-28 pb-16 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #2a1a0e 0%, #1c120a 60%, #140d06 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(180,140,60,0.18) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg ring-1 ring-amber-400/30">
            <ScrollText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-white/40 font-light">Last updated: {LAST_UPDATED}</p>
        </motion.div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #faf8f4)" }}
        />
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base text-stone-500 leading-relaxed mb-12 font-light border-l-4 border-amber-400/60 pl-5"
        >
          Welcome to <strong className="text-stone-700 font-semibold">The Experts Hair Salon</strong>. By
          accessing our premises, website, or digital platform, you agree to be bound by these Terms
          of Service. Please read them carefully before using any of our services. If you do not
          agree with any part of these terms, please refrain from using our services.
        </motion.p>

        <Section index={0} title="Acceptance of Terms">
          <p>
            By booking an appointment, making a payment, or using any feature of our digital
            platform, you confirm that you are at least 18 years of age (or have the consent of a
            parent or guardian) and that you have read, understood, and agree to these Terms of
            Service and our Privacy Policy.
          </p>
        </Section>

        <Section index={1} title="Our Services">
          <p>
            The Experts Hair Salon offers professional hair care services including, but not limited
            to:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Haircuts, trims, and styling for all hair types.</li>
            <li>Hair colouring, highlights, and treatments.</li>
            <li>Scalp treatments and conditioning therapies.</li>
            <li>Grooming services for men, women, and children.</li>
          </ul>
          <p className="mt-2">
            Services are subject to availability. We reserve the right to modify, suspend, or
            discontinue any service at any time without prior notice.
          </p>
        </Section>

        <Section index={2} title="Appointments & Bookings">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Appointments can be booked via our digital platform and are subject to artist
              availability.
            </li>
            <li>
              Please arrive <strong className="text-stone-600">at least 5 minutes</strong> before
              your scheduled appointment. Late arrivals may result in a shortened service or
              rescheduling.
            </li>
            <li>
              Cancellations or rescheduling requests must be made at least{" "}
              <strong className="text-stone-600">2 hours</strong> in advance. Failure to do so may
              result in a cancellation fee.
            </li>
            <li>
              Walk-ins are welcome subject to availability, though we cannot guarantee service
              times without a prior booking.
            </li>
          </ul>
        </Section>

        <Section index={3} title="Payments & Pricing">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              All prices are listed on our platform and are inclusive of applicable taxes unless
              otherwise stated.
            </li>
            <li>
              Payments are processed securely via{" "}
              <strong className="text-stone-600">Razorpay</strong>. We accept UPI, credit/debit
              cards, net banking, and digital wallets.
            </li>
            <li>
              Receipts are issued digitally upon successful payment. Please retain these for your
              records.
            </li>
            <li>
              Prices are subject to change. Any changes will be reflected on the platform prior to
              your next booking.
            </li>
            <li>
              In the event of a payment failure, please contact us before attempting a second
              transaction to avoid duplicate charges.
            </li>
          </ul>
        </Section>

        <Section index={4} title="Refunds & Cancellations">
          <p>
            We strive to deliver exceptional results. If you are dissatisfied with a service, please
            inform us at the salon before leaving so we can address your concerns.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Refunds are considered on a case-by-case basis and are at the sole discretion of the
              salon management.
            </li>
            <li>
              Refunds for services already rendered will not be issued unless there is a clear error
              on our part.
            </li>
            <li>
              Pre-paid bookings cancelled within the permitted window (at least 2 hours in advance)
              are eligible for a full refund or credit towards a future visit.
            </li>
            <li>
              Processed refunds, where approved, will be credited to the original payment method
              within <strong className="text-stone-600">5–7 business days</strong>.
            </li>
          </ul>
        </Section>

        <Section index={5} title="User Accounts & Platform Access">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Staff accounts (receptionists, managers, owners) are created and managed by
              authorised administrators only.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your login credentials. Do
              not share your password with anyone.
            </li>
            <li>
              Any unauthorised access or suspicious activity should be reported to us immediately at{" "}
              <a
                href="mailto:hello@theexperts.in"
                className="text-amber-600 hover:underline font-medium"
              >
                hello@theexperts.in
              </a>
              .
            </li>
            <li>
              We reserve the right to suspend or terminate accounts that violate these terms,
              misuse the platform, or engage in fraudulent activity.
            </li>
          </ul>
        </Section>

        <Section index={6} title="Code of Conduct">
          <p>
            We are committed to providing a welcoming, safe, and respectful environment for all
            clients and staff. We ask that all visitors:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>Treat all staff and fellow clients with courtesy and respect.</li>
            <li>Refrain from using abusive, discriminatory, or offensive language.</li>
            <li>Respect the salon's hygiene and safety guidelines at all times.</li>
            <li>
              Not record or photograph staff or other clients without explicit consent.
            </li>
          </ul>
          <p className="mt-2">
            We reserve the right to refuse or discontinue service to any individual who violates
            these standards.
          </p>
        </Section>

        <Section index={7} title="Intellectual Property">
          <p>
            All content on our digital platform — including text, images, logos, design elements,
            and software code — is the exclusive property of The Experts Hair Salon or its licensed
            contributors. You may not reproduce, distribute, or create derivative works from any
            content without our prior written consent.
          </p>
        </Section>

        <Section index={8} title="Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law, The Experts Hair Salon shall not be
            liable for:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>
              Any indirect, incidental, or consequential damages arising from the use of our
              services or platform.
            </li>
            <li>
              Loss of data, revenue, or business resulting from platform downtime or technical
              issues.
            </li>
            <li>
              Allergic reactions or adverse effects from services, provided that we were not
              informed of relevant medical conditions or allergies prior to the service.
            </li>
          </ul>
          <p className="mt-2">
            Our total liability, in any case, shall not exceed the amount paid by you for the
            specific service in question.
          </p>
        </Section>

        <Section index={9} title="Governing Law">
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of{" "}
            <strong className="text-stone-600">India</strong>. Any disputes arising out of or in
            connection with these terms shall be subject to the exclusive jurisdiction of the courts
            in <strong className="text-stone-600">Bengaluru, Karnataka</strong>.
          </p>
        </Section>

        <Section index={10} title="Changes to These Terms">
          <p>
            We may update these Terms of Service from time to time. The revised terms will be
            posted on this page with an updated "Last updated" date. Your continued use of our
            services following any update constitutes acceptance of the revised terms. We recommend
            reviewing this page periodically.
          </p>
        </Section>

        <Section index={11} title="Contact Us">
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-none space-y-1 mt-1">
            <li>
              <strong className="text-stone-600">The Experts Hair Salon</strong>
            </li>
            <li>Near: Sunrise Motel, Sirhind Road Patial, Punjab 147004</li>
            <li>
              Phone:{" "}
              <a href="tel:+919814830550" className="text-amber-600 hover:underline font-medium">
                +91 98148 30550
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:hello@theexperts.in"
                className="text-amber-600 hover:underline font-medium"
              >
                theexpertssalon@gmail.com
              </a>
            </li>
          </ul>
        </Section>
      </main>

      {/* Footer strip */}
      <div
        className="py-8 text-center"
        style={{ background: "linear-gradient(160deg, #2a1a0e 0%, #1c120a 60%, #140d06 100%)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">The Experts</span>
        </div>
        <p className="text-[11px] text-white/30 tracking-wide">
          © {new Date().getFullYear()} The Experts Hair Salon · All rights reserved
        </p>
      </div>
    </AppLayout>
  );
}

/**
 * @file AboutPage.tsx
 * @description Public About Us page for The Experts Hair Salon.
 */

import { motion } from "framer-motion";
import { Sparkles, Award, Heart, Clock } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

const highlights = [
  {
    icon: Award,
    title: "Expert Stylists",
    description:
      "Our team of certified professionals brings years of experience and a passion for perfection to every visit.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    description:
      "We listen, we care, and we deliver. Your satisfaction is our top priority every single time.",
  },
  {
    icon: Clock,
    title: "Zero Wait Time",
    description:
      "Walk in on schedule, walk out looking your best. Our digital visit system means no long waits.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description:
      "We exclusively use salon-grade products from trusted international brands for the best results.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function AboutPage() {
  return (
    <AppLayout subtitle="About Us">
      <div className="mx-auto max-w-4xl w-full px-6 pt-16 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-300/60 bg-white/80 backdrop-blur-sm shadow-sm mb-5 text-xs font-semibold text-stone-500 tracking-[0.18em] uppercase">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-stone-900 leading-tight mb-4">
            About <span className="text-amber-600">The Experts</span>
          </h1>
          <p className="text-lg text-stone-500 font-light max-w-2xl mx-auto leading-relaxed">
            Founded with a vision to redefine the salon experience in Bengaluru,
            The Experts combines skilled artistry with modern technology to deliver
            exceptional grooming services.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-stone-200/80 bg-white shadow-sm p-8 sm:p-10 mb-12"
        >
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-[0.15em] mb-3">
            Our Mission
          </h2>
          <p className="text-stone-700 text-base leading-relaxed">
            To provide world-class hair and grooming services in a welcoming,
            professional environment — making every client feel confident and
            valued. We believe great hair changes everything, and our expert team
            is dedicated to crafting looks that suit your personality and
            lifestyle.
          </p>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {highlights.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-stone-200/80 bg-white shadow-sm p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-stone-400 text-sm">
            Ready to experience the difference?{" "}
            <a
              href="/signin"
              className="text-amber-600 font-semibold hover:underline"
            >
              Sign in
            </a>{" "}
            and book your visit today.
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}

// components/ContactForm.tsx

"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent successfully!", {
          description: "We will get back to you as soon as possible.",
          duration: 5000,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message", {
          description: data.error || "Please try again later.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-[5px] flex flex-col gap-5 py-12 px-6 shadow-sm">
      <h2 className="text-[18px] font-medium leading-5.75">Contact Me</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full text-[14px]"
      >
        <div className="flex flex-col md:flex-row md:justify-between gap-3 w-full">
          <motion.input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
          />

          <motion.input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
          />

          <motion.input
            type="tel"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
          />
        </div>

        <motion.textarea
          name="message"
          placeholder="Your Message *"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full border border-gray-200 py-2 px-4 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          rows={7}
          whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="bg-black rounded-[5px] text-white w-full md:w-34.75 py-3 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? "Sending..." : "Send Email"}
        </motion.button>
      </form>
    </div>
  );
}

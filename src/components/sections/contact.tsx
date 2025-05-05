"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Linkedin, Github } from "lucide-react";

const MySwal = withReactContent(Swal);

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For overlay effect
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlay) return;
      const rect = overlay.getBoundingClientRect();
      const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
      const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build FormData for web3forms
    const formData = {
      ...formState,
      access_key: "a433efb8-2030-459e-a196-13d70a2ea920",
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => r.json());

    setIsSubmitting(false);
    if (res.success) {
      MySwal.fire({
        title: "Thank you!",
        text: "We have received your message.",
        icon: "success",
        confirmButtonColor: "#60a5fa", // Tailwind blue-400
      });
      setFormState({ name: "", email: "", message: "" });
    } else {
      MySwal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 bg-muted/30 overflow-hidden"
    >
      {/* Overlay for mouse effect */}
      <div
        ref={overlayRef}
        className="network-overlay pointer-events-none absolute inset-0 z-0 transition-all"
        style={{ background: "rgba(0,0,0,0)" }}
      />
      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact <span className="text-primary">Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground">
            If you have any questions or just want to say hello, feel free to
            drop me a message!
          </p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-5/12"
          >
            <Card className="h-full">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-muted-foreground">
                  If you have any questions or just want to say hello, feel free
                  to drop me a message!
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Follow me on social media
                </p>
                <div className="flex space-x-3">
                  <a
                    href="https://www.linkedin.com/in/yash-hulle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:w-7/12"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Form</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

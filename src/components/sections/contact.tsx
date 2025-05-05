"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Phone,
  SendIcon,
  LinkedinIcon,
  GithubIcon,
  ChevronRight,
  Loader2
} from "lucide-react";
import { getBasicInfo, getSocialLinks } from "@/lib/resume";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <GithubIcon className="h-5 w-5" />,
  LinkedIn: <LinkedinIcon className="h-5 w-5" />,
  Email: <Mail className="h-5 w-5" />,
};

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { email, phone, location } = getBasicInfo();
  const socialLinks = getSocialLinks();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Form initialization
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // In a real scenario, you would call your API endpoint here
      console.log("Form submitted:", data);

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });

      form.reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden z-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-dotted-grid opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-80 bg-primary/5 rounded-tl-full -z-10 blur-3xl" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h4 className="text-primary font-medium mb-2">GET IN TOUCH</h4>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or an opportunity to discuss? Feel free to reach out. I'm always open to new ideas and collaborations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left side - Contact info */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-card p-6 rounded-lg border border-border/50 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href={`mailto:${email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a
                        href={`tel:${phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">{location}</p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-8 pt-8 border-t border-border/30">
                  <h4 className="font-medium mb-4">Connect with me</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card hover:bg-primary/10 border border-border/50 p-3 rounded-full text-muted-foreground hover:text-primary transition-all"
                        aria-label={link.platform}
                      >
                        {socialIcons[link.platform] || null}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10">
                <h3 className="font-bold mb-3">Looking for a web developer?</h3>
                <p className="text-muted-foreground mb-4">
                  I'm currently available for freelance work and full-time positions. Let's build something amazing together!
                </p>
                <Button variant="outline" className="gap-2 group" asChild>
                  <a href="/resume/Yash_Hulle_Frontend_Developer.pdf" target="_blank" rel="noreferrer">
                    Download Resume
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right side - Contact form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3"
            >
              <div className="bg-card p-6 md:p-8 rounded-lg border border-border/50 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Inquiry / Job Opportunity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Hello Yash, I'd like to discuss a project idea..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <SendIcon className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

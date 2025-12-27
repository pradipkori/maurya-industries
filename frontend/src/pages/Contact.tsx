import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Navigation,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
     const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/enquiries`,
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.subject} - ${formData.message}`,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Inquiry Submitted!",
        description: "Our team will contact you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mt-2 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Whether you need a quote, technical support, or just want to chat about your next project — we're here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding bg-background">
        <div className="container-industrial grid lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div className="space-y-8">
            <h2 className="font-heading font-bold text-3xl">
              Contact Information
            </h2>

            <Info icon={<MapPin />} title="Address">
              Gala No. 1, Amarnath Industrial Estate, Vasai (E), Palghar – 401208
            </Info>

            <Info icon={<Phone />} title="Phone">
              <div className="space-y-1">
                <a href="tel:+919930418261" className="hover:text-primary block">
                  +91 99304 18261
                </a>
                <a href="tel:+919307766923" className="hover:text-primary block">
                  +91 93077 66923
                </a>
              </div>
            </Info>

            <Info icon={<Mail />} title="Email">
              <a
                href="mailto:mauryaindustries1978@gmail.com"
                className="hover:text-primary"
              >
                mauryaindustries1978@gmail.com
              </a>
            </Info>

            <Info icon={<Clock />} title="Business Hours">
              Mon – Sat : 9:00 AM – 6:00 PM
            </Info>

            {/* MAP */}
            <div className="rounded-xl overflow-hidden border shadow-md">
              <iframe
                title="Maurya Industries Location"
                src="https://www.google.com/maps?q=Amarnath%20Industrial%20Estate%20Vasai%20East&output=embed"
                className="w-full h-72"
                loading="lazy"
              />
            </div>

            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Amarnath+Industrial+Estate+Vasai+East"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 w-4 h-4" />
                Get Directions
              </a>
            </Button>
          </div>

          {/* RIGHT – CONTACT FORM (RESTORED ✅) */}
          <div className="bg-card rounded-2xl shadow-xl p-8 border">
            <h2 className="font-heading font-bold text-2xl mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Your Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <InputField
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <InputField
                label="Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <Textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                variant="industrial"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                <Send className="mr-2 w-5 h-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t space-y-2">
              {["Quick Response", "No Obligation Quote", "Expert Consultation"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- HELPERS ---------------- */

function Info({
  icon,
  title,
  children,
}: {
  icon: JSX.Element;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-bold">{title}</h3>
        <p className="text-muted-foreground">{children}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  ...props
}: {
  label: string;
} & React.ComponentProps<typeof Input>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <Input className="h-12" {...props} />
    </div>
  );
}

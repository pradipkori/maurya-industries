import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/enquiries", {
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
        description:
          "Thank you for your inquiry. We will get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 -mt-32 md:-mt-40 pt-48 md:pt-56">
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
              Have questions about our products or services? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-heading font-bold text-2xl">
                Contact Information
              </h2>

              <Info icon={<MapPin />} title="Address">
                Gala No. 1, Amarnath Industrial Estate, Vasai (E), Palghar – 401208
              </Info>

              <Info icon={<Phone />} title="Phone">
                +91 98765 43210
              </Info>

              <Info icon={<Mail />} title="Email">
                info@mauryaindustries.com
              </Info>

              <Info icon={<Clock />} title="Business Hours">
                Mon–Sat: 9 AM – 6 PM
              </Info>
            </div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2 bg-card rounded-lg shadow-lg p-8 border"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
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
                    required
                  />
                  <InputField
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="industrial"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t">
                {["Quick Response", "No Obligation Quote", "Expert Consultation"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                      {item}
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// 🔹 Small helpers
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

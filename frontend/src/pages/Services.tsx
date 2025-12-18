import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Factory, PenTool, Wrench, Package, CheckCircle, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description:
      'We manufacture high-quality plastic granulator machines using state-of-the-art equipment and precision engineering. Our manufacturing process ensures consistent quality and performance.',
    features: [
      'CNC precision machining',
      'Quality control at every stage',
      'ISO certified processes',
      'Skilled workforce',
    ],
  },
  {
    icon: PenTool,
    title: 'Custom Machine Design',
    description:
      'Need a machine tailored to your specific requirements? Our engineering team can design and build custom plastic processing solutions that meet your exact specifications.',
    features: [
      'Custom capacity options',
      'Special blade configurations',
      'Integration capabilities',
      'Technical consultation',
    ],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description:
      'We provide comprehensive maintenance and support services to ensure your machines operate at peak performance. Our team is available for scheduled maintenance and emergency repairs.',
    features: [
      'Preventive maintenance',
      'Emergency repair service',
      'Performance optimization',
      'Remote diagnostics',
    ],
  },
  {
    icon: Package,
    title: 'Spare Parts',
    description:
      'We stock a complete range of spare parts for all our machines. Quick delivery ensures minimal downtime for your operations.',
    features: [
      'Original spare parts',
      'Quick delivery',
      'Competitive pricing',
      'Expert guidance',
    ],
  },
];

const processSteps = [
  { step: '01', title: 'Consultation', description: 'We understand your requirements and recommend the best solution.' },
  { step: '02', title: 'Design', description: 'Our engineers create detailed designs and specifications.' },
  { step: '03', title: 'Manufacturing', description: 'Precision manufacturing with quality checks at every stage.' },
  { step: '04', title: 'Delivery & Installation', description: 'Safe delivery and professional installation at your facility.' },
];

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container-industrial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mt-2 mb-4">
              Complete Industrial Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              From manufacturing to maintenance, we offer comprehensive services to support your
              plastic processing operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-card rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted">
        <div className="container-industrial">
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-2xl text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="absolute top-10 -right-3 w-6 h-6 text-secondary hidden md:block" />
                )}
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* WHY CHOOSE US (RESTORED EXACTLY) */}
      <section className="section-padding bg-primary">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>

              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mt-2 mb-6">
                Your Trusted Partner for Industrial Machinery
              </h2>

              <p className="text-primary-foreground/80 mb-8">
                With over 20 years of experience in manufacturing plastic granulator machines,
                we have the expertise and resources to deliver solutions that meet your needs.
              </p>

              <ul className="space-y-4">
                {[
                  '20+ years of industry experience',
                  'ISO certified manufacturing processes',
                  '500+ machines delivered across India',
                  'Dedicated after-sales support team',
                  'Competitive pricing and flexible payment options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground">
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '500+', label: 'Machines Delivered' },
                { value: '200+', label: 'Happy Clients' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-primary-foreground/10 p-6 rounded-lg text-center"
                >
                  <div className="font-heading font-bold text-4xl text-secondary">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/70 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background text-center">
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contact us today to discuss your requirements and get a free consultation.
        </p>
        <Button variant="industrial" size="lg" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </section>
    </>
  );
}
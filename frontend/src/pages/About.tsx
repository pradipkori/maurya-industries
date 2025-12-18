import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, Wrench, CheckCircle } from 'lucide-react';
import factoryExterior from '@/assets/factory-exterior.jpg';
import heroIndustrial from '@/assets/hero-industrial.jpg';

const values = [
  { icon: Award, title: 'Quality First', description: 'We never compromise on the quality of our products and services.' },
  { icon: Users, title: 'Customer Focus', description: 'Our customers are at the heart of everything we do.' },
  { icon: Wrench, title: 'Innovation', description: 'We continuously improve our processes and products.' },
  { icon: CheckCircle, title: 'Integrity', description: 'We conduct business with honesty and transparency.' },
];

const milestones = [
  { year: '2013', title: 'Company Founded', description: 'Maurya Industries was established in Palghar, Maharashtra.' },
  { year: '2015', title: 'First 100 Machines', description: 'Successfully delivered our first 100 plastic granulator machines.' },
  { year: '2018', title: 'ISO Certification', description: 'Achieved ISO certification for quality management.' },
  { year: '2020', title: 'Pan-India Presence', description: 'Expanded operations to serve clients across India.' },
  { year: '2023', title: '500+ Machines', description: 'Crossed the milestone of 500+ machines delivered.' },
];

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src={heroIndustrial}
            alt="Manufacturing Floor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="container-industrial relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mt-2 mb-6">
              Engineering Excellence Since 2013
            </h1>
            <p className="text-xl text-primary-foreground/80">
              A decade of delivering high-quality plastic granulator machines and industrial solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
                Your Trusted Partner in Industrial Machinery
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Maurya Industries is a premier manufacturer of Plastic Granulator Machines and industrial
                  machinery, headquartered in Palghar, Maharashtra, India. Founded in 2013, we have grown
                  to become one of the most trusted names in the plastic processing machinery industry.
                </p>
                <p>
                  Our state-of-the-art manufacturing facility is equipped with modern machinery and skilled
                  technicians who ensure every machine meets the highest standards of quality and performance.
                </p>
                <p>
                  With a commitment to innovation and customer satisfaction, we continue to expand our
                  product range and services to meet the evolving needs of the plastic recycling and
                  processing industry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={factoryExterior}
                alt="Maurya Industries Facility"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-muted">
        <div className="container-industrial grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-card p-8 rounded-lg shadow-lg border-l-4 border-secondary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Eye className="w-7 h-7 text-secondary" />
              <h3 className="font-heading font-bold text-2xl">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To be the leading manufacturer of plastic processing machinery in India, recognized for
              innovative solutions, superior quality, and sustainable manufacturing practices.
            </p>
          </motion.div>

          <motion.div
            className="bg-card p-8 rounded-lg shadow-lg border-l-4 border-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Target className="w-7 h-7 text-primary" />
              <h3 className="font-heading font-bold text-2xl">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To design, manufacture, and deliver high-quality plastic granulator machines that meet
              diverse customer needs through innovation and service excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-industrial">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mt-2">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center p-6 bg-card rounded-lg border hover:border-secondary hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones (UNCHANGED & RESTORED) */}
      <section className="section-padding bg-primary">
        <div className="container-industrial">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mt-2">
              Key Milestones
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-secondary/30 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-primary-foreground/10 p-6 rounded-lg">
                      <span className="text-secondary font-heading font-bold text-xl">
                        {milestone.year}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-primary-foreground mt-1">
                        {milestone.title}
                      </h3>
                      <p className="text-primary-foreground/70 mt-2">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-secondary rounded-full border-4 border-primary z-10 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-background">
        <div className="container-industrial grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {_toggleStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="font-heading font-bold text-5xl text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

const _toggleStats = [
  { value: '20+', label: 'Years Experience' },
  { value: '200+', label: 'Machines Delivered' },
  { value: '200+', label: 'Happy Clients' },
  { value: '24/7', label: 'Support Available' },
];

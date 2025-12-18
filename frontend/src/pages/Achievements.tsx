import { useState } from "react";
import { achievements } from "@/data/achievementsData";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Achievements() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <section className="relative bg-background pt-32 pb-28 overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-industrial relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">Our</span>{" "}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Maurya Industries has actively participated in{" "}
            <span className="text-primary font-medium">
              leading plastic industry exhibitions
            </span>{" "}
            such as Plastasia, Plastvision, and Plastindia—strengthening our
            market presence, innovation mindset, and long-term partnerships.
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Years of Experience", value: "20+" },
            { label: "Exhibitions Attended", value: "15+" },
            { label: "Industry Segments", value: "10+" },
            { label: "Trusted Clients", value: "500+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition-shadow p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-primary">
                {stat.value}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TIMELINE */}
        <div className="relative border-l-2 border-primary/30 pl-10 space-y-16">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelected(item)}
              className="relative cursor-pointer"
            >
              {/* DOT */}
              <div className="absolute -left-[11px] top-4 w-5 h-5 rounded-full bg-primary border-4 border-background" />

              {/* CARD */}
              <div className="bg-white rounded-2xl shadow-md border hover:shadow-2xl transition-shadow overflow-hidden">
                {/* IMAGE MORE WIDE THAN TEXT */}
                <div className="grid md:grid-cols-[3fr_2fr]">
                  {/* IMAGE (WIDER COLUMN + PER-IMAGE SIZE CONTROL) */}
                  <div
                    className={`bg-muted flex items-center justify-center p-6 ${item.imageBoxClass}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-semibold text-primary mt-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-2">
                      {item.description}
                    </p>

                    <p className="mt-3 text-sm font-medium text-foreground">
                      {item.highlight}
                    </p>

                    <span className="inline-block mt-4 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
              >
                <X size={20} />
              </button>

              {/* MODAL IMAGE */}
              <div className="h-80 bg-muted flex items-center justify-center p-6">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary">
                  {selected.title}
                </h3>

                <p className="text-muted-foreground mt-3">
                  {selected.description}
                </p>

                <p className="mt-4 font-medium text-foreground">
                  {selected.highlight}
                </p>

                <div className="flex gap-2 mt-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 text-xs rounded-full">
                    {selected.year}
                  </span>
                  <span className="bg-orange-500/10 text-orange-600 px-3 py-1 text-xs rounded-full">
                    {selected.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
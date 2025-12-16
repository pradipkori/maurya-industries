import { achievements } from "@/data/achievementsData";
import { motion } from "framer-motion";

export default function Achievements() {
  return (
    <section className="bg-background py-16">
      <div className="container-industrial grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border"
          >
            {/* IMAGE */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary">
                {item.title}
              </h3>

              <p className="text-muted-foreground mt-2 text-sm">
                {item.description}
              </p>

              <span className="inline-block mt-4 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {item.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

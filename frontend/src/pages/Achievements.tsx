import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, TrendingUp, Users, Calendar, ChevronRight, Sparkles, MapPin, Trophy } from "lucide-react";
import plastasia from "@/assets/achievements/plastasia.jpeg";
import plastasiaAward from "@/assets/achievements/plastasiaaward.jpeg";
import plastvision from "@/assets/achievements/plastivision.jpeg";
import recyclingExpo from "@/assets/achievements/recycling-expo.jpeg";
import manufacturingUnit from "@/assets/achievements/manufacturing-unit.jpeg";

// Achievement data - replace with your actual data from achievementsData
const achievements = [
  {
    id: 1,
    year: "2025",
    category: "Exhibition",
    title: "Plastasia 2025",
    description:
      "Successfully showcased our innovative plastic solutions at India's premier plastics exhibition.",
    highlight:
      "Attracted over 500+ visitors to our booth and secured 50+ business leads",
    image: plastasia,
    imageBoxClass: "",
  },

  {
    id: 2,
    year: "2022",
    category: "Award",
    title: "Excellence in Manufacturing",
    description: "Recognized for outstanding quality standards and sustainable manufacturing practices in the plastics industry.",
    highlight: "First in our category for environmental compliance and quality management",
    image: plastasiaAward,
    imageBoxClass: ""
  },
  {
    id: 3,
    year: "2023",
    category: "Exhibition",
    title: "Plastvision India",
    description: "Demonstrated cutting-edge automation in plastic processing machinery with live demonstrations.",
    highlight: "Launched 3 new product lines with automated quality control systems",
    image: plastvision,
    imageBoxClass: ""
  },
  {
    id: 4,
    year: "2022",
    category: "Milestone",
    title: "20 Years of Excellence",
    description: "Celebrated two decades of innovation and customer satisfaction in the plastic industry.",
    highlight: "Serving 200+ satisfied clients worldwide across 10+ industry segments",
    image: recyclingExpo,
  },
  {
    id: 5,
    year: "2021",
    category: "Exhibition",
    title: "Plastindia 2021",
    description: "Participated in Asia's largest plastics trade fair with innovative product demonstrations.",
    highlight: "Connected with 100+ international distributors and partners",
    image: manufacturingUnit,

    imageBoxClass: ""
  },
  
];

export default function Achievements() {
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Exhibition", "Award", "Milestone"];

  const filteredAchievements = filter === "All" 
    ? achievements 
    : achievements.filter(a => a.category === filter);

  // Get gradient class based on index
  const getGradientClass = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-green-500"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-32 pb-28 overflow-hidden">
      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* HEADER WITH FLOATING ELEMENTS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <Sparkles className="w-10 h-10 text-orange-500 mx-auto" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-primary">Our</span>{" "}
            <span className="bg-gradient-to-r from-primary via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed px-4">
            Maurya Industries has actively participated in{" "}
            <span className="text-primary font-semibold">
              leading plastic industry exhibitions
            </span>{" "}
            such as Plastasia, Plastvision, and Plastindia—strengthening our
            market presence, innovation mindset, and long-term partnerships.
          </p>
        </motion.div>

        {/* ANIMATED STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {[
            { label: "Years of Experience", value: "20+", icon: Calendar, bgColor: "bg-blue-100", iconColor: "text-blue-600", textColor: "text-blue-600" },
            { label: "Exhibitions Attended", value: "15+", icon: Trophy, bgColor: "bg-purple-100", iconColor: "text-purple-600", textColor: "text-purple-600" },
            { label: "Industry Segments", value: "10+", icon: TrendingUp, bgColor: "bg-orange-100", iconColor: "text-orange-600", textColor: "text-orange-600" },
            { label: "Trusted Clients", value: "200+", icon: Users, bgColor: "bg-green-100", iconColor: "text-green-600", textColor: "text-green-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300" />
              <div className="relative p-6 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className={`inline-block p-3 rounded-xl ${stat.bgColor} mb-3`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </motion.div>
                <h3 className={`text-3xl sm:text-4xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FILTER TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-16 flex-wrap"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ACHIEVEMENTS GRID */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((item, index) => {
              const gradientClass = getGradientClass(index);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                    {/* GRADIENT OVERLAY */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* IMAGE */}
                    <div className="relative h-48 md:h-52
 overflow-hidden bg-slate-100">
                      <motion.img
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* FLOATING BADGE */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                        className="absolute top-4 right-4"
                      >
                        <span className={`inline-block bg-gradient-to-r ${gradientClass} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
                          {item.year}
                        </span>
                      </motion.div>

                      {/* CATEGORY TAG */}
                      <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="absolute bottom-4 left-4"
                      >
                        <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          <MapPin className="w-3 h-3" />
                          {item.category}
                        </span>
                      </motion.div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-xl mb-4">
                        <Award className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-orange-800 line-clamp-2">{item.highlight}</span>
                      </div>

                      <motion.div
                        className="flex items-center text-primary font-medium text-sm gap-2 group-hover:gap-3 transition-all"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
              <Award className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No achievements found</h3>
            <p className="text-slate-600">Try selecting a different category</p>
          </motion.div>
        )}
      </div>

      {/* ENHANCED MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* CLOSE BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <X size={20} className="text-slate-800" />
              </motion.button>

              {/* MODAL IMAGE WITH GRADIENT */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-slate-100">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* FLOATING BADGES */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-6 left-6 flex gap-3 flex-wrap"
                >
                  <span className={`inline-block bg-gradient-to-r ${getGradientClass(achievements.findIndex(a => a.id === selected.id))} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {selected.year}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    <MapPin className="w-4 h-4" />
                    {selected.category}
                  </span>
                </motion.div>
              </div>

              <div className="p-6 sm:p-8 md:p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                    {selected.title}
                  </h3>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                    {selected.description}
                  </p>

                  <div className="flex items-start gap-3 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">KEY HIGHLIGHT</p>
                      <p className="font-semibold text-slate-800">
                        {selected.highlight}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
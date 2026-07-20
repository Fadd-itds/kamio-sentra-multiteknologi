"use client";
import { motion } from "framer-motion";

const services = [
  { title: "System Integration", desc: "Menghubungkan ekosistem teknologi Anda menjadi satu kesatuan yang kohesif." },
  { title: "Digital Innovation", desc: "Solusi aplikasi yang dirancang untuk efisiensi dan skalabilitas tinggi." },
  { title: "Advanced Infrastructure", desc: "Membangun fondasi teknologi yang tangguh, aman, dan siap untuk masa depan." }
];

export default function Capabilities() {
  return (
    <section className="py-24 px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4 text-center"
        >
          Our Capabilities
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {services.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="p-8 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-black">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
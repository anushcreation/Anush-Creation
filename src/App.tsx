import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  ArrowUpRight, 
  Mail, 
  Instagram, 
  Twitter, 
  Youtube, 
  ArrowRight, 
  Star, 
  Menu,
  X,
  Github,
  Linkedin,
  MapPin,
  Phone
} from 'lucide-react';

// --- Animation Components ---

const TextReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <div className={`mask-reveal ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  year: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'High-Conversion Gaming Thumbnails',
    category: 'Thumbnail Strategy',
    imageUrl: 'https://picsum.photos/seed/thumb1/1200/800',
    description: 'Strategic visual design for top-tier gaming creators, focusing on CTR and audience retention.',
    year: '2024'
  },
  {
    id: '2',
    title: 'Educational Content Branding',
    category: 'Visual Identity',
    imageUrl: 'https://picsum.photos/seed/thumb2/1200/800',
    description: 'Developing cohesive visual systems for educational channels to build authority and trust.',
    year: '2023'
  },
  {
    id: '3',
    title: 'Vlog Narrative Covers',
    category: 'Thumbnail Design',
    imageUrl: 'https://picsum.photos/seed/thumb3/1200/800',
    description: 'Capturing the essence of storytelling through high-impact digital covers for lifestyle creators.',
    year: '2023'
  },
  {
    id: '4',
    title: 'Creator Growth Framework',
    category: 'Consulting',
    imageUrl: 'https://picsum.photos/seed/thumb4/1200/800',
    description: 'Data-driven approaches to visual content strategy and channel growth optimization.',
    year: '2022'
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-8 md:px-16 py-6 flex justify-between items-center transition-all duration-700 ${
      scrolled ? 'bg-paper/80 backdrop-blur-xl py-4 border-b border-ink/5' : 'bg-transparent'
    }`}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-serif text-2xl tracking-tight font-medium"
      >
        Anush Creation.
      </motion.div>
      
      <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
        {['Work', 'About', 'Contact'].map((item, i) => (
          <motion.a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="hover:opacity-100 transition-opacity relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-ink transition-all group-hover:w-full"></span>
          </motion.a>
        ))}
      </div>

      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:hidden" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-paper z-40 flex flex-col items-center justify-center gap-8 text-6xl"
          >
            {['Work', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="hover:italic transition-all">
                {item}
              </a>
            ))}
            <div className="flex gap-8 mt-16">
              <Twitter size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
              <Instagram size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
              <Github size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-paper text-ink selection:bg-accent/20 smooth-scroll">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden">
        <motion.div style={{ y, opacity }} className="max-w-5xl z-10">
          <FadeIn>
            <span className="font-serif italic text-xl md:text-2xl text-accent mb-6 block">Creative Designer & Thumbnail Strategist</span>
          </FadeIn>
          
          <div className="space-y-2">
            <TextReveal className="text-7xl md:text-[11rem] leading-[0.85] font-serif">
              Anush
            </TextReveal>
            <TextReveal className="text-7xl md:text-[11rem] leading-[0.85] font-serif" delay={0.1}>
              <span className="serif-italic ml-[0.1em]">Creation</span>
            </TextReveal>
            <TextReveal className="text-7xl md:text-[11rem] leading-[0.85] font-serif" delay={0.2}>
              Portfolio.
            </TextReveal>
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-12">
            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl max-w-md opacity-60 leading-relaxed font-medium">
                Based in Nepal, working globally. I help creators and brands stand out in the digital noise through intentional design.
              </p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <a 
                href="#work" 
                className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold"
              >
                Explore Work 
                <div className="w-14 h-14 rounded-full border border-ink/10 flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all duration-500 group-hover:rotate-45">
                  <ArrowRight size={20} />
                </div>
              </a>
            </FadeIn>
          </div>
        </motion.div>

        {/* Decorative Background Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute right-[-10%] top-[20%] text-[40vw] font-serif pointer-events-none select-none italic"
        >
          A
        </motion.div>
      </section>

      {/* Featured Work */}
      <section id="work" className="py-40 px-8 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-8">
          <div>
            <TextReveal className="text-5xl md:text-8xl mb-4">Selected</TextReveal>
            <TextReveal className="text-5xl md:text-8xl serif-italic" delay={0.1}>Projects</TextReveal>
          </div>
          <FadeIn>
            <div className="font-serif italic text-2xl opacity-30">01 — 04</div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-40">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-card mb-10 rounded-sm">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 right-8 w-14 h-14 bg-paper rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={24} />
                </div>
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3 block font-bold">{project.category}</span>
                  <h3 className="text-3xl md:text-5xl leading-tight">{project.title}</h3>
                </div>
                <span className="font-serif italic text-xl opacity-30 mt-1">{project.year}</span>
              </div>
              <p className="opacity-50 max-w-sm text-lg leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-8 md:px-24 bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[3/4]"
          >
            <img 
              src="https://picsum.photos/seed/portrait/800/1000" 
              alt="Portrait" 
              className="w-full h-full object-cover rounded-sm grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
          
          <div className="space-y-12">
            <div>
              <FadeIn>
                <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-8 block">The Designer</span>
              </FadeIn>
              <TextReveal className="text-5xl md:text-7xl leading-tight mb-4">Driven by</TextReveal>
              <TextReveal className="text-5xl md:text-7xl serif-italic leading-tight" delay={0.1}>Curiosity</TextReveal>
              <TextReveal className="text-5xl md:text-7xl leading-tight" delay={0.2}>& Craft.</TextReveal>
            </div>
            
            <FadeIn delay={0.4}>
              <div className="space-y-8 opacity-60 text-xl leading-relaxed font-medium">
                <p>
                  I believe that every digital touchpoint is an opportunity to tell a story. My approach combines strategic thinking with a meticulous eye for detail.
                </p>
                <p>
                  With over 5 years in the creative industry, I've had the privilege of working with creators who are shaping the future of digital media.
                </p>
              </div>
            </FadeIn>
            
            <div className="pt-12 border-t border-ink/10 grid grid-cols-2 gap-12">
              <FadeIn delay={0.6}>
                <div className="font-serif text-5xl mb-2">12M+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">Views Impacted</div>
              </FadeIn>
              <FadeIn delay={0.7}>
                <div className="font-serif text-5xl mb-2">50+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">Global Clients</div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-8 md:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal className="text-7xl md:text-[10rem] mb-16">Let's <span className="serif-italic">Talk.</span></TextReveal>
          
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl opacity-50 mb-20 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to new collaborations and interesting ideas.
            </p>
          </FadeIn>
          
          <div className="flex flex-col items-center gap-12">
            <motion.a 
              whileHover={{ x: 10 }}
              href="mailto:anushgfx1@gmail.com" 
              className="text-3xl md:text-6xl font-serif border-b border-ink/10 hover:border-accent transition-colors pb-4 flex items-center gap-6"
            >
              anushgfx1@gmail.com <ArrowUpRight size={32} className="opacity-20" />
            </motion.a>

            <motion.a 
              whileHover={{ x: 10 }}
              href="tel:+9779805370948"
              className="text-2xl md:text-4xl font-serif opacity-60 flex items-center gap-4 hover:text-ink transition-colors"
            >
              <Phone size={24} className="opacity-30" /> +977 9805370948
            </motion.a>
          </div>

          <div className="mt-32 flex flex-wrap justify-center gap-16 text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
            {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((social) => (
              <a key={social} href="#" className="hover:opacity-100 transition-opacity hover:text-accent">
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-24 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-12 opacity-30 text-[10px] uppercase tracking-[0.3em] font-bold">
        <div className="flex items-center gap-3">
          <MapPin size={14} /> Kathmandu, Nepal
        </div>
        <div>© 2026 Anush Creation. All Rights Reserved.</div>
        <div className="flex gap-10">
          <a href="#" className="hover:text-ink transition-colors">Privacy</a>
          <a href="#" className="hover:text-ink transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}

import React from 'react'
import { useEffect, useState } from "react";

function Portfolio() {
  return (
    <div>
      <PortfolioContent/>
    </div>
  )
}

function PortfolioContent (){
    const words = [
  "Crafting Modern Web Experiences",
  "Passionate Full Stack Developer",
  "Building Fast & Scalable Applications",
  "Problem Solver & Continuous Learner",
  "Ready to Contribute and Grow",
  "Turning Ideas Into Digital Solutions"
];

const [text, setText] = useState("");
const [wordIndex, setWordIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
const [showFeedbackForm, setShowFeedbackForm] = useState(false);
const [feedbacks, setFeedbacks] = useState([]);
const [rating, setRating] = useState(0);
const [mobileMenu, setMobileMenu] = useState(false);


const [formData, setFormData] = useState({
  name: "",
  rating,
  message: ""
});
const handleStarClick = (value) => {
  setFormData(prev => ({
    ...prev,
    rating: value
  }));
};

const GetFeedbacks = async () => {
  try {
    let response = await fetch(
      "https://portfolio-ga6t.onrender.com/getfeedback"
    );

    let data = await response.json();

    if (data.success) {
      setFeedbacks(data.feedbacks);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  GetFeedbacks();
}, []);

const AddFeedback = async (e) => {
  e.preventDefault();

  try {
    let res = await fetch(
      "https://portfolio-ga6t.onrender.com/addfeedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    let data = await res.json();

    if (data.success) {
      alert("Feedback Added");

      setFormData({
        name: "",
        rating: 5,
        message: ""
      });
       console.log(res.data);

      setShowForm(false);

      GetFeedbacks();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const currentWord = words[wordIndex];

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      setText(currentWord.substring(0, text.length + 1));

      if (text === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    } else {
      setText(currentWord.substring(0, text.length - 1));

      if (text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, isDeleting ? 50 : 100);

  return () => clearTimeout(timeout);
}, [text, isDeleting, wordIndex]);
    return(
        <>
          <div>
  {/* Navigation */}
  <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.1)] h-20 transition-all duration-200 cubic-bezier(0.4,0,0.2,1)">
    <div className="flex justify-between items-center max-w-container-max mx-auto px-gutter h-full">
    <span
  
  style={{
    background: "linear-gradient(90deg, #4cd7f6, #ddb7ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
  className="font-bold text-5xl md:text-5xl"
>
    &lt;DJ /&gt;
</span>
      <div className="hidden md:flex items-center gap-8">
        <a className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-all" href="#home">Home</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#about">About</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#projects">Projects</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#experience">Experience</a>
        <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#contact">Contact</a>
        <a className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(76,215,246,0.3)]"  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer">
          Resume
        </a>
      </div>
      {/* Mobile Menu Toggle */}
     <button
  className="md:hidden text-primary"
  onClick={() => setMobileMenu(!mobileMenu)}
>
  <span className="material-symbols-outlined">
    {mobileMenu ? "close" : "menu"}
  </span>
</button>
{mobileMenu && (
  <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-t border-white/10 z-50">
    <div className="flex flex-col items-center py-6 gap-6">

      <a href="#home" onClick={() => setMobileMenu(false)}>
        Home
      </a>

      <a href="#about" onClick={() => setMobileMenu(false)}>
        About
      </a>

      <a href="#projects" onClick={() => setMobileMenu(false)}>
        Projects
      </a>

      <a href="#experience" onClick={() => setMobileMenu(false)}>
        Experience
      </a>

      <a href="#contact" onClick={() => setMobileMenu(false)}>
        Contact
      </a>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-on-primary px-6 py-3 rounded-full"
      >
        Resume
      </a>

    </div>
  </div>
)}
    </div>
  </nav>
  {/* Hero Section */}
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
    <div className="relative z-10 max-w-container-max mx-auto px-gutter grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Available for Full Stack Roles</span>
          <h1 className="font-display-xl text-display-xl">
            Divyani <span className="text-primary">Joshi</span>
          </h1>
          <p className="font-headline-md text-headline-md text-on-surface-variant">
            Full Stack Developer | MERN Stack
          </p>
          <div className="font-body-lg text-body-lg text-on-surface-variant max-w-lg min-h-[3em]">
           <span className="typing-cursor">
  {text}
</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a className="bg-primary from-primary to-primary-container text-on-primary px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform" href="#projects">
            View Projects <span className="material-symbols-outlined">arrow_forward</span>
          </a>
          <a className="border border-primary/30 bg-white/5 backdrop-blur-sm text-on-surface px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors" href="#contact">
            Get in Touch
          </a>
        </div>
      </div>
      <div className="md:block relative"> <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full" /> <div className="glass-card p-4 rounded-2xl float-animation"> <img className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700" data-alt="A professional studio portrait of a modern female developer in a high-tech dark environment with subtle cyan rim lighting, reflecting the professional and premium Cyanide Glass design system. She has a confident expression, and the background is a dark, atmospheric workstation with blurred screens displaying lines of code in shades of blue and purple. The overall mood is sophisticated, technical, and high-end." src="/profile.jpeg" /> </div> </div>
    </div></section>
  {/* About Section */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low" id="about">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-display-lg text-display-lg text-primary">About Me</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            I am a <span className="text-primary font-bold">Full Stack Developer</span> specializing in the MERN stack, focused on building scalable web applications and solving complex engineering challenges. From designing responsive React interfaces to developing secure REST APIs and optimizing database performance, I enjoy transforming technical requirements into reliable, high-performance solutions.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <span className="text-primary font-bold font-display-lg block">20+</span>
              <span className="text-on-surface-variant font-label-caps uppercase tracking-wider">APIs DEVELOPED</span>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold font-display-lg block">50+</span>
              <span className="text-on-surface-variant font-label-caps uppercase tracking-wider">Git COMMITS</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">deployed_code</span>
            </div>
            <span className="font-bold font-body-md text-body-md">React Ecosystem</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-3xl">http</span>
            </div>
            <span className="font-bold font-body-md text-body-md">REST APIs</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-3xl">database</span>
            </div>
            <span className="font-bold font-body-md text-body-md">MongoDB Atlas</span>
          </div>
          <div className="glass-card p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-3xl">account_tree</span>
            </div>
            <span className="font-bold font-body-md text-body-md">Version control</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Skills Section */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-background">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="text-center mb-16 space-y-4">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Expertise</span>
        <h2 className="font-display-lg text-display-lg">Technical Stack</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {/* Frontend */}
        <div className="glass-card p-8 rounded-2xl group">
          <h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">web</span> Frontend
          </h3>
          <ul className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> HTML5</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Tailwind CSS</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> React.js</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Javascript (ES6+)</li>
          </ul>
        </div>
        {/* Backend */}
        <div className="glass-card p-8 rounded-2xl group">
          <h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">dns</span> Backend
          </h3>
          <ul className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Node.js</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Express</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary" /> JWT Authentication</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-secondary" /> REST APIs</li>
          </ul>
        </div>
        {/* Database */}
        <div className="glass-card p-8 rounded-2xl group">
          <h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary">database</span> Databases
          </h3>
          <ul className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> MongoDB</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> MongoDB Atlas</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Mongoose</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> MySQL</li>
          </ul>
        </div>
        {/* Tools */}
        <div className="glass-card p-8 rounded-2xl group">
          <h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container">build</span> Tools
          </h3>
          <ul className="space-y-4 text-on-surface-variant font-body-md text-body-md">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Git</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> GitHub</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Postman</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-container" /> Vercel / Render</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* Projects Section */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="projects">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-4">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="font-display-lg text-display-lg">Featured Projects</h2>
        </div>
        <div className="hidden md:block">
          <a className="text-primary hover:underline flex items-center gap-2" href="#">View all work <span className="material-symbols-outlined">trending_flat</span></a>
        </div>
      </div>
      <div className="grid gap-16">
        {/* EthniWear Rental */}
        <div className="group grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 rounded-2xl overflow-hidden glass-card p-2">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
              <img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" data-alt="A high-fidelity website interface for an ethnic wear rental platform named EthniWear Rental. The UI features a premium dark theme with rich gold and deep navy accents, showcasing high-resolution product images of traditional Indian bridal and festive wear. The layout is a sophisticated bento-style grid with glassmorphism filters, elegant typography, and a modern booking interface. The atmosphere is luxurious and technologically advanced." src="/ethniwear.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <span className="font-label-code text-label-code text-primary bg-primary/10 px-3 py-1 rounded">MERN Stack • Vercel • Render</span>
            <h3 className="font-display-lg text-display-lg">EthniWear Rental Platform</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              A full-stack ethnic wear rental platform where users can explore collections, check outfit availability, and submit rental bookings for weddings, festivals, and special occasions. Built with the MERN stack and deployed using Vercel and Render.
            </p>
            <div className="flex gap-4">
              <a className="bg-primary/20 text-primary border border-primary/30 px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2" href="https://ethniwear-rental-platform.vercel.app/">
                <span className="material-symbols-outlined">launch</span> Live Demo
              </a>
              <a className="bg-white/5 border border-white/10 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center gap-2" href="https://github.com/divyani-joshi/ethniwear-rental-platform.git">
                <span className="material-symbols-outlined">code</span> Github
              </a>
            </div>
          </div>
        </div>
        {/* AI Call Agent */}
        <div className="group grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-6">
            <span className="font-label-code text-label-code text-primary bg-primary/10 px-3 py-1 rounded">MERN Stack • Vercel • Render</span>
            <h3 className="font-display-lg text-display-lg">HiR Atelier</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              A modern full-stack web application for showcasing and booking creative services, including Mehendi, Fashion Design, and Craft Work. Users can explore service collections, browse galleries, read blogs, and submit booking inquiries, while an admin dashboard enables efficient content and service management.
            </p>
            <div className="flex gap-4">
              <a className="bg-primary/20 text-primary border border-primary/30 px-6 py-3 rounded-lg font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center gap-2" href="https://hir-atelier.vercel.app/">
                <span className="material-symbols-outlined">launch</span> Live Demo
              </a>
              <a className="bg-white/5 border border-white/10 px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center gap-2" href="https://github.com/divyani-joshi/hir_atelier.git">
                <span className="material-symbols-outlined">code</span> Github
              </a>
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 rounded-2xl overflow-hidden glass-card p-2">
            <div className="relative rounded-xl overflow-hidden aspect-[16/9]">
              <img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" data-alt="A futuristic dashboard for an AI Call Agent application. The interface shows real-time waveform animations, sentiment analysis gauges, and live transcription windows. The design is sleek with a dark palette, glowing cyan accents, and blurred semi-transparent panels. It looks like a high-end enterprise software interface for managing conversational artificial intelligence, emphasizing technical precision and modern aesthetic." src="/hir.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Experience Section */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-background overflow-hidden" id="experience">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="text-center mb-20 space-y-4">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">My Journey</span>
        <h2 className="font-display-lg text-display-lg">Professional Experience</h2>
      </div>
      <div className="relative timeline-line">
        {/* 2025 */}
        <div className="relative grid md:grid-cols-2 gap-12 mb-20">
          <div className="md:text-right flex flex-col justify-center">
            <span className="font-display-lg text-display-lg text-primary/30">2026</span>
            <h4 className="font-headline-md text-headline-md">MERN Stack Developer Intern</h4>
            <p className="text-on-surface-variant font-body-md">Infolabz IT Services</p>
          </div>
          <div className="glass-card p-8 rounded-2xl relative">
            <div className="absolute top-1/2 -left-3 md:-left-1.5 w-6 h-6 rounded-full bg-primary border-4 border-background -translate-y-1/2" />
            <ul className="space-y-4 font-body-md text-on-surface-variant">
              <li>• Developed full-stack applications using the MERN stack.</li>
              <li>• Designed and consumed REST APIs for seamless frontend-backend communication.</li>
              <li>• Built real-world projects including booking systems, blogs, and admin dashboards.</li>
            </ul>
          </div>
        </div>
        {/* 2024 */}
        <div className="relative grid md:grid-cols-2 gap-12">
          <div className="md:order-2 flex flex-col justify-center">
            <span className="font-display-lg text-display-lg text-primary/30">2025</span>
            <h4 className="font-headline-md text-headline-md">React.js Intern</h4>
            <p className="text-on-surface-variant font-body-md">Infolabz IT Services</p>
          </div>
          <div className="md:order-1 glass-card p-8 rounded-2xl relative">
            <div className="absolute top-1/2 -right-3 md:-right-1.5 w-6 h-6 rounded-full bg-primary border-4 border-background -translate-y-1/2" />
            <ul className="space-y-4 font-body-md text-on-surface-variant">
              <li>• Learned React fundamentals including components, hooks, and state management.</li>
              <li>• Developed responsive user interfaces using React and modern CSS frameworks.</li>
              <li>• Collaborated on mini-projects and gained practical frontend development experience.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* GitHub & Stats Showcase */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="glass-card p-10 rounded-3xl grid md:grid-cols-3 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h3 className="font-display-lg text-display-lg">GitHub Profile</h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Passionate about building full-stack applications, exploring modern web technologies,
            and continuously improving through hands-on projects and open-source learning.
          </p>
          <a href="https://github.com/divyani-joshi" target="_blank" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            Visit GitHub
            <span className="material-symbols-outlined">north_east</span>
          </a>
        </div>
        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          {/* GitHub Stats */}
          <div className="bg-white/5 rounded-xl p-4">
            <img src="https://github-readme-stats.vercel.app/api?username=divyani-joshi&show_icons=true&theme=transparent&hide_border=true" alt="GitHub Stats" className="w-full rounded-lg" />
          </div>
          {/* GitHub Streak */}
          <div className="bg-white/5 rounded-xl p-4">
            <img src="https://github-readme-streak-stats.herokuapp.com?user=divyani-joshi&theme=transparent&hide_border=true" alt="GitHub Streak" className="w-full rounded-lg" />
          </div>
          {/* Top Languages */}
          <div className="bg-white/5 rounded-xl p-4">
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=divyani-joshi&layout=compact&theme=transparent&hide_border=true" alt="Top Languages" className="w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Testimonials */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-background">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="text-center mb-16">
        <h2 className="font-display-lg text-display-lg">Words of Appreciation</h2>
      </div>
       
        <div className="grid md:grid-cols-3 gap-8">
  {feedbacks.map((item) => (
    <div
      key={item._id}
      className="glass-card p-8 rounded-2xl space-y-6"
    >
    <div className="flex">
  {[...Array(item.rating)].map((_, i) => (
    <span key={i} className="text-yellow-400">★</span>
  ))}
</div>

      <p className="italic text-on-surface-variant break-words overflow-hidden">
        "{item.message}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          {item.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-sm text-on-surface-variant">
            Verified Visitor
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
      
    </div>
    <div className="flex justify-center mt-12">
  <button
    onClick={() => setShowFeedbackForm(true)}
    className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:brightness-110 transition-all"
  >
    Add Feedback
  </button>
</div>
  </section>
  {/* Contact Section */}
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="contact">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="font-display-lg text-display-lg">Let's build something <span className="text-primary">extraordinary</span> together.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            I'm currently available for freelance opportunities and long-term collaborations. If you have a project in mind or just want to say hi, feel free to reach out!
          </p>
          <div className="space-y-6 pt-4">
            <a className="flex items-center gap-4 group" href="mailto:hello@divyanijoshi.dev">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <span className="font-body-lg text-body-lg">hello@divyanijoshi.dev</span>
            </a>
            <a className="flex items-center gap-4 group" href="#">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">link</span>
              </div>
              <span className="font-body-lg text-body-lg">linkedin.com/in/divyanijoshi</span>
            </a>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <span className="font-body-lg text-body-lg">Remote / Worldwide</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-caps text-on-surface-variant">Name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-caps text-on-surface-variant">Email</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-on-surface-variant">Subject</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Project Inquiry" type="text" />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-on-surface-variant">Message</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Tell me about your project..." rows={4} defaultValue={""} />
            </div>
            <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2" type="submit">
              Send Message <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="bg-surface py-section-padding-mobile md:py-16 border-t border-white/5">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-gutter">
      <div className="mb-8 md:mb-0">
        <a className="font-display-lg text-display-lg text-primary block mb-2" href="#">Divyani Joshi</a>
        <p className="text-on-surface-variant font-body-md text-body-md">© 2026 Divyani Joshi. Built with precision.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 text-on-surface-variant font-body-md text-body-md">
        <a className="hover:text-primary transition-colors" href="#">GitHub</a>
        <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
        <a className="hover:text-primary transition-colors" href="mailto:hello@divyanijoshi.dev">Email</a>
      </div>
    <button
  className="mt-8 md:mt-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
  onClick={() =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
>
  <span className="material-symbols-outlined">arrow_upward</span>
</button>
    </div>
  </footer>
</div>
{
  showFeedbackForm && (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-xl p-8 rounded-3xl relative">

        {/* Close Button */}
        <button
          onClick={() => setShowFeedbackForm(false)}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3 className="font-display-lg text-primary mb-6">
          Share Your Feedback
        </h3>

        <form className="space-y-5" onSubmit={AddFeedback}>

          <div>
            <label className="block mb-2 text-on-surface-variant">
              Name
            </label>
            <input
             value={formData.name}
      onChange={(e)=>
        setFormData({
          ...formData,
          name:e.target.value
        })
      }
              type="text"
              placeholder="Your Name"
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block mb-2 text-on-surface-variant">
              Rating
            </label>


<div className="flex gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => handleStarClick(star)}
      className={`cursor-pointer text-3xl ${
        star <= formData.rating
          ? "text-yellow-400"
          : "text-gray-400"
      }`}
    >
      ★
    </span>
  ))}
</div>
          </div>

          <div>
            <label className="block mb-2 text-on-surface-variant">
              Feedback
            </label>

            <textarea
             value={formData.message}
      onChange={(e)=>
        setFormData({
          ...formData,
          message:e.target.value
        })
      }
              rows="4"
              placeholder="Write your experience..."
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:brightness-110 transition-all"
          >
            Submit Feedback
          </button>

        </form>
      </div>
    </div>
  )
}

        </>
    )
}

export default Portfolio

import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .ha-root { font-family: 'Inter', system-ui, sans-serif; background: #050d1a; color: #fff; overflow-x: hidden; }
  .ha-root a { text-decoration: none; color: inherit; }

  .ha-nav { position: sticky; top: 0; z-index: 200; background: rgba(5,13,26,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; padding: 0 6%; height: 68px; }
  .ha-nav-logo { font-size: 22px; font-weight: 800; background: linear-gradient(135deg,#fff 0%,#a8d0ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .ha-nav-links { display: flex; gap: 28px; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.6); }
  .ha-nav-links a:hover { color: #fff; transition: color .2s; }
  .ha-nav-cta { background: linear-gradient(135deg,#1a6fff,#0a3fa8); color: #fff; font-size: 13px; font-weight: 600; padding: 9px 22px; border-radius: 50px; }

  .ha-hero { position: relative; height: 700px; display: flex; align-items: center; overflow: hidden; }
  .ha-hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
  .ha-hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80') center/cover no-repeat; opacity: 0.18; }
  .ha-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg,rgba(5,13,26,0.92) 0%,rgba(10,30,80,0.75) 100%); }
  .ha-hero-content { position: relative; z-index: 10; padding: 0 8%; max-width: 700px; }
  .ha-hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(26,111,255,0.15); border: 1px solid rgba(26,111,255,0.35); color: #7eb8ff; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 50px; margin-bottom: 24px; }
  .ha-pulse { width: 6px; height: 6px; background: #1a6fff; border-radius: 50%; animation: ha-pulse 2s infinite; }
  @keyframes ha-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.5} }
  .ha-hero h1 { font-size: 56px; font-weight: 800; line-height: 1.05; margin-bottom: 20px; letter-spacing: -1px; }
  .ha-gradient-text { background: linear-gradient(135deg,#4da3ff 0%,#a78bfa 50%,#f0a500 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .ha-hero p { font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 36px; max-width: 560px; }
  .ha-hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .ha-btn-glow { background: linear-gradient(135deg,#1a6fff,#0a3fa8); color: #fff; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px; box-shadow: 0 0 30px rgba(26,111,255,0.5); transition: transform .2s,box-shadow .2s; display: inline-block; }
  .ha-btn-glow:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(26,111,255,0.7); }
  .ha-btn-ghost { border: 1.5px solid rgba(255,255,255,0.25); color: #fff; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 15px; transition: border-color .2s,background .2s; display: inline-block; }
  .ha-btn-ghost:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.07); }

  .ha-stats-bar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.08); display: grid; grid-template-columns: repeat(4,1fr); }
  .ha-stat { padding: 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
  .ha-stat:last-child { border-right: none; }
  .ha-stat-num { font-size: 28px; font-weight: 800; background: linear-gradient(135deg,#4da3ff,#a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .ha-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 2px; }

  .ha-section { padding: 90px 8%; }
  .ha-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #1a6fff; margin-bottom: 12px; }
  .ha-heading { font-size: 42px; font-weight: 800; line-height: 1.1; letter-spacing: -0.5px; margin-bottom: 16px; color: #fff; }
  .ha-sub { font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.75; max-width: 580px; }

  .ha-about { background: linear-gradient(180deg,#050d1a 0%,#081428 100%); }
  .ha-about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; margin-top: 20px; }
  .ha-about-img-wrap { position: relative; }
  .ha-about-img-frame { width: 100%; height: 380px; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
  .ha-img-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg,#0a2040,#1a3a6a); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; font-size: 40px; }
  .ha-img-placeholder span { font-size: 13px; color: rgba(255,255,255,0.25); text-align: center; }
  .ha-about-badge { position: absolute; bottom: -16px; right: -16px; background: linear-gradient(135deg,#1a6fff,#0a3fa8); border-radius: 16px; padding: 16px 20px; box-shadow: 0 20px 40px rgba(26,111,255,0.4); }
  .ha-about-badge-num { font-size: 32px; font-weight: 800; }
  .ha-about-badge-lbl { font-size: 12px; color: rgba(255,255,255,0.7); }
  .ha-values { display: flex; flex-direction: column; gap: 20px; margin-top: 28px; }
  .ha-val { display: flex; gap: 16px; align-items: flex-start; }
  .ha-val-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(26,111,255,0.12); border: 1px solid rgba(26,111,255,0.25); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .ha-val-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .ha-val-desc { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; }

  .ha-academics { background: #050d1a; position: relative; overflow: hidden; }
  .ha-academics::before { content:''; position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle,rgba(26,111,255,0.08) 0%,transparent 70%); pointer-events: none; }
  .ha-prog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
  .ha-prog-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; transition: transform .3s,border-color .3s,box-shadow .3s; }
  .ha-prog-card:hover { transform: translateY(-6px); border-color: rgba(26,111,255,0.4); box-shadow: 0 20px 60px rgba(26,111,255,0.15); }
  .ha-prog-icon { width: 52px; height: 52px; border-radius: 14px; background: rgba(26,111,255,0.1); border: 1px solid rgba(26,111,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 18px; }
  .ha-prog-card h3 { font-size: 17px; font-weight: 700; margin-bottom: 8px; color: #fff; }
  .ha-prog-card p { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }

  .ha-facilities { background: linear-gradient(180deg,#050d1a 0%,#081428 100%); }
  .ha-fac-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
  .ha-fac-card { border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07); transition: transform .3s; }
  .ha-fac-card:hover { transform: scale(1.02); }
  .ha-fac-img { height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; font-size: 32px; }
  .ha-fac-lbl { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 1px; text-transform: uppercase; }
  .ha-fac-body { padding: 18px 20px; background: rgba(255,255,255,0.04); }
  .ha-fac-body h4 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .ha-fac-body p { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.5; }

  .ha-news { background: #050d1a; }
  .ha-news-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 48px; }
  .ha-news-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; overflow: hidden; transition: transform .3s,border-color .3s; }
  .ha-news-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,0.15); }
  .ha-news-img { height: 160px; display: flex; align-items: center; justify-content: center; font-size: 28px; opacity: 0.3; }
  .ha-news-tag { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; padding: 4px 12px; border-radius: 50px; background: rgba(240,165,0,0.15); color: #f0a500; border: 1px solid rgba(240,165,0,0.3); margin-bottom: 10px; }
  .ha-news-body { padding: 20px; }
  .ha-news-body h4 { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.4; }
  .ha-news-body p { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }
  .ha-news-date { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 12px; }

  .ha-admissions { background: linear-gradient(135deg,#050d1a 0%,#0a1f50 50%,#050d1a 100%); position: relative; overflow: hidden; text-align: center; }
  .ha-adm-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 800px; height: 400px; background: radial-gradient(ellipse,rgba(26,111,255,0.12) 0%,transparent 70%); pointer-events: none; }
  .ha-adm-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 48px; }
  .ha-adm-step { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 28px; }
  .ha-adm-num { font-size: 56px; font-weight: 900; background: linear-gradient(135deg,rgba(26,111,255,0.4),rgba(167,139,250,0.2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 16px; }
  .ha-adm-step h4 { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
  .ha-adm-step p { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }
  .ha-adm-cta { margin-top: 48px; }

  .ha-contact { background: #050d1a; }
  .ha-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 48px; }
  .ha-contact-info { display: flex; flex-direction: column; gap: 20px; }
  .ha-ci { display: flex; gap: 16px; align-items: flex-start; }
  .ha-ci-ico { width: 46px; height: 46px; border-radius: 12px; background: rgba(26,111,255,0.1); border: 1px solid rgba(26,111,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .ha-ci strong { font-size: 14px; color: #fff; display: block; margin-bottom: 2px; }
  .ha-ci span { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.6; }
  .ha-contact-form { display: flex; flex-direction: column; gap: 14px; }
  .ha-contact-form input, .ha-contact-form textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 18px; font-size: 14px; color: #fff; font-family: inherit; outline: none; transition: border-color .2s,background .2s; width: 100%; }
  .ha-contact-form input::placeholder, .ha-contact-form textarea::placeholder { color: rgba(255,255,255,0.3); }
  .ha-contact-form input:focus, .ha-contact-form textarea:focus { border-color: rgba(26,111,255,0.6); background: rgba(26,111,255,0.05); }
  .ha-contact-form textarea { height: 130px; resize: vertical; }
  .ha-submit-btn { background: linear-gradient(135deg,#1a6fff,#0a3fa8); color: #fff; border: none; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 700; cursor: pointer; align-self: flex-start; transition: transform .2s,box-shadow .2s; font-family: inherit; }
  .ha-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(26,111,255,0.5); }

  .ha-footer { background: #030a14; padding: 40px 8%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
  .ha-footer-logo { font-size: 20px; font-weight: 800; background: linear-gradient(135deg,#fff,#a8d0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .ha-footer-links { display: flex; gap: 24px; font-size: 13px; color: rgba(255,255,255,0.35); }
  .ha-footer-links a:hover { color: #fff; }
  .ha-footer-copy { font-size: 12px; color: rgba(255,255,255,0.2); }

  .ha-reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
  .ha-reveal.ha-visible { opacity: 1; transform: translateY(0); }
`;

function useCountUp(target, suffix, duration, start) {
  const [value, setValue] = useState("0" + suffix);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const step = target / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setValue(Math.round(current) + suffix);
    }, duration / 60);
    return () => clearInterval(interval);
  }, [start]);
  return value;
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(init) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.drift = (Math.random() - 0.5) * 0.3;
        const r = Math.random();
        this.color = r < 0.6
          ? `rgba(77,163,255,${this.opacity})`
          : r < 0.8
          ? `rgba(167,139,250,${this.opacity})`
          : `rgba(240,165,0,${this.opacity})`;
      }
      reset() {
        this.x = Math.random() * W;
        this.y = H + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.drift = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.y -= this.speed;
        this.x += this.drift;
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 80) { this.x += (dx / d) * 1.5; this.y += (dy / d) * 1.5; }
        if (this.y < -5 || this.x < -5 || this.x > W + 5) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < 160; i++) particles.push(new Particle(true));

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(77,163,255,${0.12 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    const handleMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ha-hero-canvas" />;
}

function RevealSection({ children, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("ha-visible"); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`ha-reveal ${className || ""}`}>{children}</div>;
}

export default function HorizonAcademy() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const timer = setTimeout(() => setStatsStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const stat1 = useCountUp(98, "%", 1500, statsStarted);
  const stat2 = useCountUp(1200, "", 1500, statsStarted);
  const stat3 = useCountUp(40, "+", 1500, statsStarted);
  const stat4 = useCountUp(38, "", 1500, statsStarted);

  const programs = [
    { icon: "🔬", title: "Science & Technology", desc: "Hands-on labs, coding workshops, and robotics competitions." },
    { icon: "📐", title: "Mathematics", desc: "From foundational skills to advanced calculus and statistics." },
    { icon: "📚", title: "Humanities & Languages", desc: "Literature, history, and three modern languages offered." },
    { icon: "🎨", title: "Creative Arts", desc: "Music, drama, visual arts, and a dedicated performance stage." },
    { icon: "🌍", title: "Social Studies", desc: "Civics, economics, geography, and current global affairs." },
    { icon: "🏃", title: "Physical Education", desc: "Athletics, yoga, team sports, and wellness education." },
  ];

  const facilities = [
    { icon: "🔬", label: "Add science lab photo", bg: "linear-gradient(135deg,#0a2040,#1a3a6a)", title: "Science Labs", desc: "Six fully equipped labs for biology, chemistry, and physics." },
    { icon: "📖", label: "Add library photo", bg: "linear-gradient(135deg,#0a2830,#1a4a5a)", title: "Library & Media Centre", desc: "30,000+ volumes, e-resources, and quiet study pods." },
    { icon: "🏊", label: "Add sports complex photo", bg: "linear-gradient(135deg,#1a1a0a,#3a3010)", title: "Multi-sport Complex", desc: "Courts, 400m track, swimming pool, and cricket nets." },
    { icon: "🎭", label: "Add auditorium photo", bg: "linear-gradient(135deg,#0a1a0a,#1a3a1a)", title: "Performing Arts Hall", desc: "600-seat auditorium for recitals, plays, and annual day." },
    { icon: "💻", label: "Add tech hub photo", bg: "linear-gradient(135deg,#1a0a2a,#2a1a4a)", title: "Technology & Innovation Hub", desc: "Maker spaces, 3D printers, and a coding lab with 80 stations." },
    { icon: "🍽️", label: "Add cafeteria photo", bg: "linear-gradient(135deg,#1a0a0a,#3a1a1a)", title: "Student Cafeteria", desc: "Nutritionist-designed menus with diverse dietary options." },
  ];

  const news = [
    { icon: "🏆", bg: "linear-gradient(135deg,#0a2040,#1a3a6a)", tag: "Achievement", title: "Horizon wins national science olympiad for the third year", desc: "Our Grade 11 team brought home gold in Biology and Physics categories.", date: "June 2, 2026" },
    { icon: "🎉", bg: "linear-gradient(135deg,#1a1a0a,#3a3010)", tag: "Event", title: "Annual Day 2026 "Horizons Unlimited" set for July 18", desc: "Performances, project exhibitions, and senior class graduation ceremony.", date: "May 28, 2026" },
    { icon: "📝", bg: "linear-gradient(135deg,#0a1a30,#1a3050)", tag: "Admissions", title: "Applications for 2026–27 are now open", desc: "Attend our Open House on June 28 to tour the campus and meet faculty.", date: "May 20, 2026" },
  ];

  const admSteps = [
    { num: "01", title: "Submit enquiry", desc: "Fill the online form — our team responds within 48 hours." },
    { num: "02", title: "Campus visit", desc: "Attend an Open House or book a private tour." },
    { num: "03", title: "Assessment", desc: "A short written test and informal faculty interview." },
    { num: "04", title: "Offer & enrolment", desc: "Successful applicants receive a formal offer online." },
  ];

  return (
    <div className="ha-root">
      <style>{styles}</style>

      {/* Nav */}
      <nav className="ha-nav">
        <div className="ha-nav-logo">✦ Horizon Academy</div>
        <div className="ha-nav-links">
          <a href="#">About</a>
          <a href="#">Academics</a>
          <a href="#">Facilities</a>
          <a href="#">News</a>
          <a href="#">Admissions</a>
        </div>
        <a href="#" className="ha-nav-cta">Apply Now →</a>
      </nav>

      {/* Hero */}
      <section className="ha-hero">
        <div className="ha-hero-bg" />
        <div className="ha-hero-overlay" />
        <ParticleCanvas />
        <div className="ha-hero-content">
          <div className="ha-hero-tag"><span className="ha-pulse" />Admissions Open 2026–27</div>
          <h1>Where Curious Minds Become <span className="ha-gradient-text">Confident Leaders</span></h1>
          <p>Horizon Academy offers a world-class environment for grades 6–12, blending rigorous academics with vibrant co-curricular life.</p>
          <div className="ha-hero-btns">
            <a href="#" className="ha-btn-glow">Explore Admissions</a>
            <a href="#" className="ha-btn-ghost">Virtual Tour ↗</a>
          </div>
        </div>
        <div className="ha-stats-bar">
          <div className="ha-stat"><div className="ha-stat-num">{stat1}</div><div className="ha-stat-lbl">University acceptance</div></div>
          <div className="ha-stat"><div className="ha-stat-num">{stat2}</div><div className="ha-stat-lbl">Students enrolled</div></div>
          <div className="ha-stat"><div className="ha-stat-num">{stat3}</div><div className="ha-stat-lbl">Clubs & activities</div></div>
          <div className="ha-stat"><div className="ha-stat-num">{stat4}</div><div className="ha-stat-lbl">Years of excellence</div></div>
        </div>
      </section>

      {/* About */}
      <RevealSection className="ha-about ha-section">
        <div className="ha-eyebrow">About Us</div>
        <div className="ha-about-inner">
          <div className="ha-about-img-wrap">
            <div className="ha-about-img-frame">
              <div className="ha-img-placeholder">
                🏫
                <span>Replace with your school<br />campus photo</span>
              </div>
            </div>
            <div className="ha-about-badge">
              <div className="ha-about-badge-num">38</div>
              <div className="ha-about-badge-lbl">Years of Excellence</div>
            </div>
          </div>
          <div>
            <div className="ha-heading" style={{ fontSize: 34 }}>Built on curiosity,<br />driven by character</div>
            <p className="ha-sub">Founded in 1987, Horizon Academy has been shaping young minds for over three decades with a commitment to academic excellence and holistic growth.</p>
            <div className="ha-values">
              {[
                { icon: "🎯", title: "Academic Excellence", desc: "Rigorous curriculum aligned with international standards" },
                { icon: "🌱", title: "Holistic Development", desc: "Sports, arts, and co-curriculars alongside academics" },
                { icon: "🤝", title: "Inclusive Culture", desc: "A diverse, welcoming community for every learner" },
              ].map((v) => (
                <div className="ha-val" key={v.title}>
                  <div className="ha-val-icon">{v.icon}</div>
                  <div>
                    <div className="ha-val-title">{v.title}</div>
                    <div className="ha-val-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Academics */}
      <RevealSection className="ha-academics ha-section">
        <div className="ha-eyebrow">Academics</div>
        <div className="ha-heading">Programs that stretch<br />every student</div>
        <p className="ha-sub">From STEM to the arts, our faculty bring deep expertise and genuine passion to every classroom.</p>
        <div className="ha-prog-grid">
          {programs.map((p) => (
            <div className="ha-prog-card" key={p.title}>
              <div className="ha-prog-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Facilities */}
      <RevealSection className="ha-facilities ha-section">
        <div className="ha-eyebrow">Facilities</div>
        <div className="ha-heading">Built for learning<br />and life</div>
        <p className="ha-sub">Our campus supports every dimension of student development — academic, athletic, artistic, and social.</p>
        <div className="ha-fac-grid">
          {facilities.map((f) => (
            <div className="ha-fac-card" key={f.title}>
              <div className="ha-fac-img" style={{ background: f.bg }}>
                {f.icon}
                <div className="ha-fac-lbl">{f.label}</div>
              </div>
              <div className="ha-fac-body">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* News */}
      <RevealSection className="ha-news ha-section">
        <div className="ha-eyebrow">News & Events</div>
        <div className="ha-heading">What's happening<br />at Horizon</div>
        <div className="ha-news-grid">
          {news.map((n) => (
            <div className="ha-news-card" key={n.title}>
              <div className="ha-news-img" style={{ background: n.bg }}>{n.icon}</div>
              <div className="ha-news-body">
                <span className="ha-news-tag">{n.tag}</span>
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
                <div className="ha-news-date">{n.date}</div>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* Admissions */}
      <RevealSection className="ha-admissions ha-section">
        <div className="ha-adm-glow" />
        <div style={{ position: "relative" }}>
          <div className="ha-eyebrow">Admissions</div>
          <div className="ha-heading">Join the Horizon<br />community</div>
          <p className="ha-sub" style={{ margin: "0 auto" }}>We welcome applications from students in grades 6–12. Our process is transparent, supportive, and designed to find the right fit.</p>
        </div>
        <div className="ha-adm-grid">
          {admSteps.map((s) => (
            <div className="ha-adm-step" key={s.num}>
              <div className="ha-adm-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="ha-adm-cta">
          <a href="#" className="ha-btn-glow">Start Your Application →</a>
        </div>
      </RevealSection>

      {/* Contact */}
      <RevealSection className="ha-contact ha-section">
        <div className="ha-eyebrow">Contact</div>
        <div className="ha-heading">Get in touch</div>
        <div className="ha-contact-grid">
          <div className="ha-contact-info">
            {[
              { icon: "📍", label: "Address", value: "12 Horizon Way, Sector 7, New Delhi 110001" },
              { icon: "📞", label: "Phone", value: "+91 11 2345 6789" },
              { icon: "✉️", label: "Email", value: "admissions@horizonacademy.edu.in" },
              { icon: "🕐", label: "Office Hours", value: "Mon–Fri: 8:00 AM – 4:00 PM" },
            ].map((c) => (
              <div className="ha-ci" key={c.label}>
                <div className="ha-ci-ico">{c.icon}</div>
                <div><strong>{c.label}</strong><span>{c.value}</span></div>
              </div>
            ))}
          </div>
          <div className="ha-contact-form">
            <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
            <textarea placeholder="Your message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <button className="ha-submit-btn" onClick={() => alert("Message sent!")}>Send Message</button>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <footer className="ha-footer">
        <div className="ha-footer-logo">✦ Horizon Academy</div>
        <div className="ha-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Careers</a>
          <a href="#">Parent Portal</a>
        </div>
        <div className="ha-footer-copy">© 2026 Horizon Academy. All rights reserved.</div>
      </footer>
    </div>
  );
}

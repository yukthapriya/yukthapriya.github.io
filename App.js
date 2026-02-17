// src/App.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

const App = () => {
  const hologramRef = useRef(null);
  const voiceBarsRef = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Three.js Hologram Setup
  useEffect(() => {
    if (!hologramRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      hologramRef.current.clientWidth / hologramRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(hologramRef.current.clientWidth, hologramRef.current.clientHeight);
    hologramRef.current.appendChild(renderer.domElement);

    // Torus Knot Geometry (futuristic hologram look)
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 120, 16, 2, 3);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const hologram = new THREE.Mesh(geometry, material);
    scene.add(hologram);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      hologram.rotation.x += 0.001;
      hologram.rotation.y += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!hologramRef.current) return;
      camera.aspect = hologramRef.current.clientWidth / hologramRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(hologramRef.current.clientWidth, hologramRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (hologramRef.current && renderer.domElement) {
        hologramRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Voice Synthesis Functions
  const animateBars = (playing) => {
    voiceBarsRef.current.forEach((bar) => {
      if (bar) {
        bar.style.animationPlayState = playing ? 'running' : 'paused';
        bar.style.transform = playing ? '' : 'scaleY(1)';
      }
    });
  };

  const speakIntroduction = () => {
    if (!('speechSynthesis' in window)) {
      alert("Your browser doesn't support speech synthesis.");
      return;
    }

    window.speechSynthesis.cancel();

    const introText = `
      Greetings. I am your autonomous interface.
      Yuktha Priya Masupalli builds agentic AI systems — 
      autonomous agents capable of goal decomposition, multi-step planning, 
      tool usage, reflection, memory persistence, and multimodal reasoning.
      Her work includes vision-language agents with CLIP, voice-activated interfaces,
      secure Rust-based frameworks, and publications in medical imaging robustness.
      Explore her agentic creations now.
    `;

    const utterance = new SpeechSynthesisUtterance(introText.trim());
    utterance.rate = 0.94;
    utterance.pitch = 1.08;
    utterance.volume = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.toLowerCase().includes('samantha') || 
      v.name.toLowerCase().includes('google us english female')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      animateBars(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      animateBars(false);
    };

    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      setIsPlaying(false);
      animateBars(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      animateBars(false);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      animateBars(true);
    } else {
      speakIntroduction();
    }
  };

  const replaySpeech = () => {
    window.speechSynthesis.cancel();
    speakIntroduction();
  };

  // Wait for voices to load (Safari/iOS fix)
  useEffect(() => {
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        // voices loaded — can be used in speakIntroduction
      });
    }
  }, []);

  return (
    <div className="app-wrapper">
      <div className="background-glow"></div>

      <header className="hero">
        <div className="container">
          <div className="hologram-wrapper" ref={hologramRef}></div>

          <h1 className="main-title">Yuktha Priya Masupalli</h1>
          <h2 className="subtitle">Architect of Autonomous Intelligence</h2>

          <div className="agentic-tags">
            <span>Agentic AI</span>
            <span>Tool-Augmented Agents</span>
            <span>Multimodal Reasoning</span>
            <span>Voice-Controlled Agents</span>
            <span>Self-Reflection Loops</span>
          </div>

          <div className="voice-activator">
            <div className="voice-wave">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="voice-bar"
                  ref={(el) => (voiceBarsRef.current[i] = el)}
                />
              ))}
            </div>

            <p className="voice-label">
              Activate JARVIS-style agent interface
            </p>

            <div className="voice-controls">
              <button
                className={`voice-btn ${isPlaying ? 'active' : ''}`}
                onClick={toggleSpeech}
                aria-label={isPlaying ? "Pause voice" : "Play voice introduction"}
              >
                <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
              </button>

              <button
                className="voice-btn replay-btn"
                onClick={replaySpeech}
                aria-label="Replay introduction"
              >
                <i className="fas fa-redo"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="section evolution">
          <div className="container">
            <h2>My Evolution</h2>
            <div className="content">
              <p>
                From Diploma in Computer Engineering (S.V Govt. Polytechnic) to B.Tech (JNTUA College of Engineering), 
                and now pursuing MS in Computer Science at Texas A&M University-San Antonio (GPA 3.87/4.0).
              </p>
              <p>
                As Graduate Research Assistant, I design autonomous agentic systems. 
                At Digitalsoft AI Solutions, I engineered Generative AI assistants using LangChain.
              </p>
            </div>
          </div>
        </section>

        <section className="section agentic">
          <div className="container">
            <h2>Agentic Creations</h2>
            <div className="content">
              <p>
                I architect goal-directed agents that plan, use tools, reflect, remember, 
                and act across multimodal inputs (vision + language + voice).
              </p>
              <p>
                Projects include CLIP-powered multimodal coaches (JagCoach), graph-based recommendation agents (Neo4j + planning), 
                and real-time health monitoring agents — deployed on AWS/GCP/Kubernetes.
              </p>
            </div>
          </div>
        </section>

        <section className="section publications">
          <div className="container">
            <h2>Published Research</h2>
            <div className="pub-grid">
              <div className="pub-card">
                <h3>Improving Medical Imaging Model Calibration through Probabilistic Embedding</h3>
                <p className="venue">IEEE Big Data Conference</p>
                <a
                  href="https://ieeexplore.ieee.org/document/10825661/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-link"
                >
                  Read Paper →
                </a>
              </div>

              <div className="pub-card">
                <h3>Benchmarking the Robustness of Contrastive Learning Models</h3>
                <p className="venue">AAAI Conference</p>
                <a
                  href="https://arxiv.org/abs/2501.09134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-link"
                >
                  Read Paper →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section connect">
          <div className="container">
            <h2>Connect in the Digital Realm</h2>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a
                href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-graduation-cap"></i> Google Scholar
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Yuktha Priya Masupalli — Agentic Intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

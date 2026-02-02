// // src/App.js
// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import './App.css';

// const App = () => {
//   const hologramRef = useRef(null);
//   const voiceBars = useRef([]);
//   const [isPlaying, setIsPlaying ] = useState(false);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(300, 300);
//     hologramRef.current.appendChild(renderer.domElement);

//     const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
//     const material = new THREE.MeshBasicMaterial({ color: 0x1E90FF, wireframe: true, transparent: true, opacity: 0.7 });
//     const hologram = new THREE.Mesh(geometry, material);
//     scene.add(hologram);

//     camera.position.z = 5;
//     const controls = new THREE.OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.05;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       hologram.rotation.y += 0.002;
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(300, 300); // Keep fixed size for hologram
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       hologramRef.current.removeChild(renderer.domElement);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const toggleSpeech = () => {
//     if (window.speechSynthesis.speaking) {
//       window.speechSynthesis.pause();
//       setIsPlaying(false);
//       animateBars(false);
//     } else if (window.speechSynthesis.paused) {
//       window.speechSynthesis.resume();
//       setIsPlaying(true);
//       animateBars(true);
//     } else {
//       speakIntroduction();
//     }
//   };

//   const replaySpeech = () => {
//     window.speechSynthesis.cancel();
//     speakIntroduction();
//   };

//   const animateBars = (playing) => {
//     voiceBars.current.forEach(bar => {
//       bar.style.animationPlayState = playing ? 'running' : 'paused';
//       bar.style.transform = playing ? '' : 'scaleY(1)';
//     });
//   };

//   const speakIntroduction = () => {
//     window.speechSynthesis.cancel();
//     const introText = "Hello, I'm Yuktha Priya Masupalli, pronounced Yook-tha Pree-ya Ma-su-pa-li. " +
//       "A Master's student at Texas A&M University-San Antonio, I specialize in agentic AI, " +
//       "designing systems that autonomously process multimodal data and optimize performance. " +
//       "My research, including IEEE publications, drives innovations in medical imaging and data pipelines. " +
//       "Explore my work to see the future of intelligent automation. Recorded at 03:34 AM CDT, October 01, 2025.";
//     const utterance = new SpeechSynthesisUtterance(introText);
//     const voices = window.speechSynthesis.getVoices();
//     const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('samantha'));
//     if (femaleVoice) utterance.voice = femaleVoice;
//     utterance.rate = 0.95;
//     utterance.pitch = 1.1;
//     utterance.onstart = () => { setIsPlaying(true); animateBars(true); };
//     utterance.onend = () => { setIsPlaying(false); animateBars(false); };
//     utterance.onerror = () => { setIsPlaying(false); animateBars(false); alert('Speech failed.'); };
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="container">
//       <header className="header">
//         <div className="header-content">
//           <div className="hologram-container" ref={hologramRef}></div>
//           <h1 className="title">Yuktha Priya Masupalli</h1>
//           <p className="subtitle">Architect of Autonomous Intelligence</p>
//           <div className="cyber-tags">
//             <span className="cyber-tag">Agentic AI</span>
//             <span className="cyber-tag">Multimodal Learning</span>
//             <span className="cyber-tag">Data Engineering</span>
//             <span className="cyber-tag">Medical Innovation</span>
//           </div>
//           <div className="voice-intro">
//             <div className="voice-player">
//               <div className="voice-wave">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <div key={index} className="voice-bar" ref={el => voiceBars.current[index] = el}></div>
//                 ))}
//               </div>
//               <p>Touch to awaken my voice assistant, inspired by JARVIS, to guide you through my world.</p>
//               <div className="voice-controls">
//                 <button className="voice-btn" onClick={toggleSpeech}>
//                   <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
//                 </button>
//                 <button className="voice-btn" onClick={replaySpeech}>
//                   <i class="fas fa-redo"></i>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <section className="section">
//         <h2 className="section-title">My Evolution</h2>
//         <div className="content">
//           <p>My path is one of relentless innovation, from a Diploma in Computer Engineering at S.V Govt. Polytechnic to a B.Tech at JNTUA College of Engineering, and now pursuing an MS at Texas A&M University-San Antonio. As a Graduate Research Assistant, I infuse autonomy into systems, drawing from a year at Digitalsoft AI Solutions where I orchestrated GenAI assistants with LangChain.</p>
//           <p>My multimodal explorations with CLIP and diffusion models reduce latency and enhance semantic accuracy, as seen in my JagCoach AI assistant. With Rust, I engineer secure, vulnerability-resistant frameworks, blending machine learning for high-accuracy detection—embodying the robotic era's essence.</p>
//         </div>
//       </section>

//       <section class="section">
//         <h2 class="section-title">Agentic Creations</h2>
//         <div class="content">
//           <p>In this robotic era, my creations come alive. I architect agentic AI that autonomously navigates multimodal data, optimizing pipelines with AWS and GCP. My systems, like the University Recommendation with Neo4j and KNN, calculate personalized paths, while the Public HealthCare Monitoring uses NLP for predictive insights.</p>
//           <p>Exploring advanced ML and Kubernetes, I scale intelligent solutions, seeking collaborations on open-source AI-cybersecurity fusions and vision-language models. For guidance, I delve into serverless designs to amplify autonomy.</p>
//         </div>
//       </section>

//       <section class="section">
//         <h2 class="section-title">Published Visions</h2>
//         <div class="content">
//           <p>My insights illuminate the future. ‘Improving Medical Imaging Model Calibration through Probabilistic Embedding,’ featured at IEEE Big Data, refines multimodal accuracy. ‘Benchmarking the Robustness of Contrastive Learning Models,’ accepted at AAAI, tests resilience in occluded environments.</p>
//           <p><a href="https://ieeexplore.ieee.org/document/10825661/" target="_blank">IEEE Vision</a> | <a href="https://arxiv.org/abs/2501.09134" target="_blank">AAAI Insight</a></p>
//         </div>
//       </section>

//       <section class="section">
//         <h2 class="section-title">Connect in the Digital Realm</h2>
//         <div class="content">
//           <p>Join me on LinkedIn for professional insights, GitHub for code explorations, or Google Scholar for research dives.</p>
//           <div class="social-links">
//             <a href="https://www.linkedin.com/in/yukthapriya" class="social-link">LinkedIn</a>
//             <a href="https://github.com/yukthapriya" class="social-link">GitHub</a>
//             <a href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ" class="social-link">Google Scholar</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

const App = () => {
  const hologramRef = useRef(null);
  const voiceBars = useRef([]);
  const [isPlaying, setIsPlaying ] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    hologramRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0x1E90FF, wireframe: true, transparent: true, opacity: 0.7 });
    const hologram = new THREE.Mesh(geometry, material);
    scene.add(hologram);

    camera.position.z = 5;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const animate = () => {
      requestAnimationFrame(animate);
      hologram.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(300, 300); // Keep fixed size for hologram
    };
    window.addEventListener('resize', handleResize);

    return () => {
      hologramRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSpeech = () => {
    if (window.speechSynthesis.speaking) {
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

  const animateBars = (playing) => {
    voiceBars.current.forEach(bar => {
      if (bar) {
        bar.style.animationPlayState = playing ? 'running' : 'paused';
        bar.style.transform = playing ? '' : 'scaleY(1)';
      }
    });
  };

  const speakIntroduction = () => {
    window.speechSynthesis.cancel();
    // REPLACED: 30-second script
    const introText = "Hello — I’m Yuktha Priya, a full‑stack software engineer. I design and build high‑performance web applications and cloud systems. On the front end I focus on UX, performance, and accessibility; on the backend I build resilient APIs, data pipelines, and cost‑efficient deployments. I enjoy turning complex requirements into simple, maintainable solutions. Check out my case studies to see the results and technical details.";
    const utterance = new SpeechSynthesisUtterance(introText);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('samantha'));
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.onstart = () => { setIsPlaying(true); animateBars(true); };
    utterance.onend = () => { setIsPlaying(false); animateBars(false); };
    utterance.onerror = () => { setIsPlaying(false); animateBars(false); alert('Speech failed.'); };
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="hologram-container" ref={hologramRef}></div>
          <h1 className="title">Yuktha Priya Masupalli</h1>
          <p className="subtitle">Architect of Autonomous Intelligence</p>
          <div className="cyber-tags">
            <span className="cyber-tag">Agentic AI</span>
            <span className="cyber-tag">Multimodal Learning</span>
            <span className="cyber-tag">Data Engineering</span>
            <span className="cyber-tag">Medical Innovation</span>
          </div>
          <div className="voice-intro">
            <div className="voice-player">
              <div className="voice-wave">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="voice-bar" ref={el => voiceBars.current[index] = el}></div>
                ))}
              </div>
              <p>Touch to awaken my voice assistant, inspired by JARVIS, to guide you through my world.</p>
              <div className="voice-controls">
                <button className="voice-btn" onClick={toggleSpeech}>
                  <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                </button>
                <button className="voice-btn" onClick={replaySpeech}>
                  <i className="fas fa-redo"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <h2 className="section-title">My Evolution</h2>
        <div className="content">
          <p>My path is one of relentless innovation, from a Diploma in Computer Engineering at S.V Govt. Polytechnic to a B.Tech at JNTUA College of Engineering, and now pursuing an MS at Texas A&M University-San Antonio. As a Graduate Research Assistant, I infuse autonomy into systems, drawing from a year at Digitalsoft AI Solutions where I orchestrated GenAI assistants with LangChain.</p>
          <p>My multimodal explorations with CLIP and diffusion models reduce latency and enhance semantic accuracy, as seen in my JagCoach AI assistant. With Rust, I engineer secure, vulnerability-resistant frameworks, blending machine learning for high-accuracy detection—embodying the robotic era's essence.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Agentic Creations</h2>
        <div className="content">
          <p>In this robotic era, my creations come alive. I architect agentic AI that autonomously navigates multimodal data, optimizing pipelines with AWS and GCP. My systems, like the University Recommendation with Neo4j and KNN, calculate personalized paths, while the Public HealthCare Monitoring uses NLP for predictive insights.</p>
          <p>Exploring advanced ML and Kubernetes, I scale intelligent solutions, seeking collaborations on open-source AI-cybersecurity fusions and vision-language models. For guidance, I delve into serverless designs to amplify autonomy.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Published Visions</h2>
        <div className="content">
          <p>My insights illuminate the future. ‘Improving Medical Imaging Model Calibration through Probabilistic Embedding,’ featured at IEEE Big Data, refines multimodal accuracy. ‘Benchmarking the Robustness of Contrastive Learning Models,’ accepted at AAAI, tests resilience in occluded environments.</p>
          <p><a href="https://ieeexplore.ieee.org/document/10825661/" target="_blank" rel="noopener noreferrer">IEEE Vision</a> | <a href="https://arxiv.org/abs/2501.09134" target="_blank" rel="noopener noreferrer">AAAI Insight</a></p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Connect in the Digital Realm</h2>
        <div className="content">
          <p>Join me on LinkedIn for professional insights, GitHub for code explorations, or Google Scholar for research dives.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/yukthapriya" className="social-link">LinkedIn</a>
            <a href="https://github.com/yukthapriya" className="social-link">GitHub</a>
            <a href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ" className="social-link">Google Scholar</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

import './App.css'
import { useState, useRef } from 'react'
import logoFullNexto from './assets/logo_full_nexto.png'
import logoSmallNexto from './assets/logo_small_nexto.png'
import faviconNexto from './assets/favicon_io/favicon-32x32.png'

function App() {
  const [openMilestone, setOpenMilestone] = useState(null)
  const [openQA, setOpenQA] = useState(null)
  const [currentPersona, setCurrentPersona] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false)

  const heroRef = useRef(null)
  const visionRef = useRef(null)
  const productRef = useRef(null)
  const benchmarkRef = useRef(null)
  const personasRef = useRef(null)
  const businessRef = useRef(null)
  const milestonesRef = useRef(null)
  const qaRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleMilestone = (id) => {
    setOpenMilestone(openMilestone === id ? null : id)
  }

  const toggleQA = (id) => {
    setOpenQA(openQA === id ? null : id)
  }

  const personas = [
    {
      emoji: "👩‍⚖️",
      name: "Fatima, 21 ans",
      story: "Étudiante en droit ambitieuse, Fatima cherche un partenaire respectueux qui partage ses valeurs. Lassée de la superficialité des apps classiques, elle utilise NexTo et ses NexCoins pour booster sa visibilité sans barrière payante, privilégiant enfin la sincérité."
    },
    {
      emoji: "👩‍💼",
      name: "Julie, 34 ans",
      story: "Employée de bureau à Lille, Julie est désabusée par les relations superficielles. Elle veut construire quelque chose de sérieux et durable. NexTo lui offre une expérience calme, transparente et bienveillante, sans pression ni artifices."
    },
    {
      emoji: "👨‍🎓",
      name: "Kevin, 20 ans",
      story: "Étudiant en BTS sociable et très actif sur mobile, Kevin aime flirter et s'amuser. Il a besoin d'une expérience dynamique, fluide et surtout gratuite. Sur NexTo, il visionne volontiers des publicités rewardées pour continuer à swiper sans limite."
    },
    {
      emoji: "👨‍🌾",
      name: "Charles, 26 ans",
      story: "Ouvrier agricole en Dordogne, Charles a peu d'opportunités locales. Il veut faire de vraies rencontres sans contrainte géographique. NexTo lui donne accès à plus de profils réels et engagés, et il privilégie les discussions longues et authentiques."
    }
  ]

  const anglePerPersona = 360 / personas.length

  const nextPersona = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPersona((prev) => (prev + 1) % personas.length)
    setRotation((prev) => prev - anglePerPersona)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const prevPersona = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPersona((prev) => (prev - 1 + personas.length) % personas.length)
    setRotation((prev) => prev + anglePerPersona)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToPersona = (index) => {
    if (isAnimating || index === currentPersona) return
    setIsAnimating(true)
    const diff = index - currentPersona
    const personasCount = personas.length
    
    // Choose shortest rotation path
    let rotationDiff
    if (Math.abs(diff) <= personasCount / 2) {
      rotationDiff = -diff
    } else {
      rotationDiff = diff > 0 ? personasCount - diff : -(personasCount + diff)
    }
    
    setCurrentPersona(index)
    setRotation((prev) => prev + rotationDiff * anglePerPersona)
    setTimeout(() => setIsAnimating(false), 800)
  }

  // Handle horizontal scroll
  const handleWheel = (e) => {
    if (isAnimating) return
    
    // Detect horizontal scroll with better sensitivity
    const deltaX = Math.abs(e.deltaX)
    const deltaY = Math.abs(e.deltaY)
    
    // Only trigger if horizontal movement is significant
    if (deltaX > 5 || (e.shiftKey && deltaY > 5)) {
      e.preventDefault()
      e.stopPropagation()
      
      const delta = e.deltaX || (e.shiftKey ? e.deltaY : 0)
      
      if (delta > 5) {
        // Scroll right -> next persona
        nextPersona()
      } else if (delta < -5) {
        // Scroll left -> previous persona
        prevPersona()
      }
    }
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoSmallNexto} alt="NexTo" />
          <span>NexTo</span>
        </div>
        <ul className="navbar-links">
          <li><a onClick={() => scrollToSection(heroRef)}>Home</a></li>
          <li><a onClick={() => scrollToSection(visionRef)}>Vision</a></li>
          <li><a onClick={() => scrollToSection(productRef)}>Product</a></li>
          <li><a onClick={() => scrollToSection(benchmarkRef)}>Benchmark</a></li>
          <li><a onClick={() => scrollToSection(personasRef)}>Personas</a></li>
          <li><a onClick={() => scrollToSection(businessRef)}>Business</a></li>
          <li><a onClick={() => scrollToSection(milestonesRef)}>Roadmap</a></li>
          <li><a onClick={() => scrollToSection(qaRef)}>Q&A</a></li>
        </ul>
      </nav>

      <button 
        className="accessibility-button" 
        onClick={() => setShowAccessibilityModal(true)}
        aria-label="Accessibility information"
      >
        ♿
      </button>

      {showAccessibilityModal && (
        <div className="accessibility-modal-overlay" onClick={() => setShowAccessibilityModal(false)}>
          <div className="accessibility-modal" onClick={(e) => e.stopPropagation()}>
            <button className="accessibility-modal-close" onClick={() => setShowAccessibilityModal(false)}>×</button>
            <div className="accessibility-modal-emoji">♿</div>
            <h2>Why Accessibility Matters</h2>
            <p><strong>Accessibility is not optional — it's essential.</strong> Digital apps should be usable by everyone, regardless of ability, age, or context.</p>
            <p><strong>Inclusive design</strong> means creating experiences that work for people with visual, auditory, motor, or cognitive differences. It's about ensuring no one is left behind.</p>
            <p><strong>Better for everyone:</strong> Features like clear navigation, readable text, and keyboard support don't just help people with disabilities — they improve the experience for all users.</p>
            <p><strong>Legal & ethical responsibility:</strong> Many countries require digital accessibility compliance. Beyond compliance, it's simply the right thing to do.</p>
            <p><strong>At NexTo,</strong> we're committed to building an app that's welcoming, intuitive, and accessible to everyone — because real connections should be available to all.</p>
          </div>
        </div>
      )}
      {/* HERO */}
      <section ref={heroRef} className="page-section" style={{ background: "linear-gradient(135deg, #F28A72 0%, #992F70 100%)" }}>
        <div className="content">
          <div className="logo-hero">
            <img src={logoSmallNexto} alt="NexTo Logo" />
          </div>
          <h1 className="title">Welcome to NexTo</h1>
          <p className="subtitle">Match. Love. Delete.</p>
          <p className="description">A free, authentic and respectful dating experience designed for real connections.</p>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="page-section" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" }}>
        <div className="content">
          <div className="emoji">👋</div>
          <h1 className="title">Bienvenue sur NexTo</h1>
          <p className="subtitle">L'application de rencontres pensée pour vous</p>
          <p className="description">
            NexTo est une application de rencontres 100% gratuite, conçue pour favoriser des connexions authentiques et sincères. Fini les profils faux, les paywalls frustrants et les algorithmes opaques — NexTo met l'humain au cœur de chaque interaction.
          </p>
          <div className="features">
            <div className="feature">💬 Discussions vraies</div>
            <div className="feature">🔒 Profils vérifiés</div>
            <div className="feature">🎯 Matching par valeurs</div>
            <div className="feature">🆓 Totalement gratuit</div>
          </div>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* VISION & SOLUTION */}
      <section ref={visionRef} className="page-section" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
        <div className="content">
          <div className="emoji">💡</div>
          <h1 className="title">Vision & Solution</h1>
          <p className="subtitle">The problem</p>
          <p className="description">Dating apps have become expensive, frustrating, and filled with fake profiles.</p>
          <p className="subtitle">The solution</p>
          <p className="description">NexTo is a 100% free dating app with verified profiles and ethical monetization — built for real connections.</p>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* PRODUCT EXPERIENCE */}
      <section ref={productRef} className="page-section" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
        <div className="content">
          <div className="emoji">✨</div>
          <h1 className="title">Product Experience</h1>
          <div className="features">
            <div className="feature">✓ Verified profiles</div>
            <div className="feature">✓ Value-based matching</div>
            <div className="feature">✓ Clean & inclusive design</div>
            <div className="feature">✓ No paywalls</div>
          </div>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* BENCHMARK */}
      <section ref={benchmarkRef} className="page-section" style={{ background: "linear-gradient(135deg, #F28A72 0%, #992F70 100%)" }}>
        <div className="content">
          <div className="emoji">🎯</div>
          <h1 className="title">Benchmark</h1>
          <p className="subtitle">Clear differentiation</p>
          <div className="table-container">
            <table className="benchmark-table">
              <thead>
                <tr>
                  <th style={{padding: '1rem'}}>Critères clés</th>
                  <th>Apps traditionnelles</th>
                  <th>NexTo</th>
                </tr>
              </thead>
            </table>
            <div className="table-scroll">
              <table className="benchmark-table">
                <tbody>
                  <tr><td>Cœur de cible</td><td>❌ Large & flou</td><td>✅ 20–35 ans</td></tr>
                  <tr><td>Gratuité réelle</td><td>❌ Limitée</td><td>✅ 100% gratuit</td></tr>
                  <tr><td>Monnaie interne</td><td>❌ Payante</td><td>✅ NexCoins (gratuits)</td></tr>
                  <tr><td>Publicité</td><td>❌ Intrusive</td><td>✅ Native & rewardée</td></tr>
                  <tr><td>Faux profils</td><td>❌ Fréquents</td><td>✅ Quasi inexistants</td></tr>
                  <tr><td>Vérification</td><td>❌ Basique</td><td>✅ IA dès l'inscription</td></tr>
                  <tr><td>Algorithme</td><td>❌ Opaque</td><td>✅ Transparent</td></tr>
                </tbody>
              </table>
            </div>
          </div>
            <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* TARGETS & PERSONAS */}
      <section ref={personasRef} className="page-section" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
        <div className="content">
          <div className="emoji">👥</div>
          <h1 className="title">Targets & Personas</h1>
          <p className="subtitle">Jeunes adultes 20–35 ans à la recherche de relations sincères</p>
          
          <div className="personas-carousel">
            <button className="carousel-arrow left" onClick={prevPersona} disabled={isAnimating}>
              ‹
            </button>
            
            <div className="personas-container">
              <div className="carousel-3d">
                {(() => {
                  const prevIndex = (currentPersona - 1 + personas.length) % personas.length
                  const nextIndex = (currentPersona + 1) % personas.length
                  
                  return [prevIndex, currentPersona, nextIndex].map((index) => {
                    const persona = personas[index]
                    const isActive = index === currentPersona
                    
                    return (
                      <div
                        key={index}
                        className={`persona-card-3d ${isActive ? 'active' : ''}`}
                        onClick={() => !isActive && goToPersona(index)}
                      >
                        <div className="persona-card-content">
                          <div className="persona-emoji">{persona.emoji}</div>
                          <h3>{persona.name}</h3>
                          {isActive && <p>{persona.story}</p>}
                        </div>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>
            
            <button className="carousel-arrow right" onClick={nextPersona} disabled={isAnimating}>
              ›
            </button>
          </div>

          <div className="carousel-dots">
            {personas.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentPersona ? 'active' : ''}`}
                onClick={() => goToPersona(index)}
              />
            ))}
          </div>

          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section ref={businessRef} className="page-section" style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)" }}>
        <div className="content">
          <div className="emoji">💰</div>
          <h1 className="title">Business Model</h1>
          <p className="subtitle">Gratuit pour les utilisateurs, modèle économique durable et éthique</p>
          <div className="business-items">
            <div className="business-item">
              <h3>📢 Publicité in-app</h3>
              <p>Publicités natives, rewardées et contextuelles</p>
            </div>
            <div className="business-item">
              <h3>🪙 NexCoins</h3>
              <p>Monnaie interne gratuite gagnée via engagement</p>
            </div>
            <div className="business-item">
              <h3>🤝 Partenariats</h3>
              <p>Bars, événements, marques ciblant 20–35 ans</p>
            </div>
          </div>
          <p className="description">Scalable & sustainable</p>
          <p className="description">Designed to scale globally through cloud infrastructure, ethical advertising, and strong user engagement.</p>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* MILESTONES */}
      <section ref={milestonesRef} className="page-section" style={{ background: "linear-gradient(135deg, #F28A72 0%, #992F70 100%)" }}>
        <div className="content">
          <div className="emoji">🚀</div>
          <h1 className="title">Milestones & Roadmap</h1>
          <p className="subtitle">Built for progressive growth — designed to scale</p>
          <div className="roadmap">
            <div className="milestone">
              <div className="milestone-header" onClick={() => toggleMilestone(1)}>
                <h3>🚀 Phase 1 — Founding & Bootstrapped</h3>
                <span className="toggle-icon">{openMilestone === 1 ? '−' : '+'}</span>
              </div>
              {openMilestone === 1 && (
                <div className="milestone-content">
                  <p className="milestone-intro">Ideation, prototyping & vision validation</p>
                  <ul>
                    <li>Étude marché & benchmark</li>
                    <li>Définition des personas</li>
                    <li>UX/UI design & Figma interactif</li>
                    <li>Prototype cliquable + vidéo démo</li>
                  </ul>
                  <p className="objective">🎯 Objectif : valider le concept et l'expérience utilisateur</p>
                </div>
              )}
            </div>
            <div className="milestone">
              <div className="milestone-header" onClick={() => toggleMilestone(2)}>
                <h3>🧪 Phase 2 — MVP & Market Testing</h3>
                <span className="toggle-icon">{openMilestone === 2 ? '−' : '+'}</span>
              </div>
              {openMilestone === 2 && (
                <div className="milestone-content">
                  <p className="milestone-intro">Build, test & iterate</p>
                  <ul>
                    <li>Développement MVP fonctionnel</li>
                    <li>Implémentation du système de vérification des profils</li>
                    <li>Lancement bêta auprès d'un cercle d'utilisateurs</li>
                    <li>Collecte de feedback et itérations produit</li>
                  </ul>
                  <p className="objective">🎯 Objectif : prouver l'usage et l'engagement réel</p>
                </div>
              )}
            </div>
            <div className="milestone">
              <div className="milestone-header" onClick={() => toggleMilestone(3)}>
                <h3>📈 Phase 3 — Launch & Early Growth</h3>
                <span className="toggle-icon">{openMilestone === 3 ? '−' : '+'}</span>
              </div>
              {openMilestone === 3 && (
                <div className="milestone-content">
                  <p className="milestone-intro">Public launch & first revenue streams</p>
                  <ul>
                    <li>Lancement public sur stores (iOS / Android)</li>
                    <li>Acquisition utilisateurs ciblée (20–35 ans)</li>
                    <li>Publicité native & rewardée active</li>
                    <li>Premiers partenariats locaux</li>
                  </ul>
                  <p className="objective">🎯 Objectif : valider le modèle économique et la traction</p>
                </div>
              )}
            </div>
            <div className="milestone">
              <div className="milestone-header" onClick={() => toggleMilestone(4)}>
                <h3>🌍 Phase 4 — Scale & Expansion</h3>
                <span className="toggle-icon">{openMilestone === 4 ? '−' : '+'}</span>
              </div>
              {openMilestone === 4 && (
                <div className="milestone-content">
                  <p className="milestone-intro">Geographic expansion & preparation for funding</p>
                  <ul>
                    <li>Déploiement multi-villes / pays</li>
                    <li>Optimisation de l'infrastructure cloud</li>
                    <li>Accélération de la croissance utilisateur</li>
                    <li>Préparation à une levée de fonds / programme Google Startup</li>
                  </ul>
                  <p className="objective">🎯 Objectif : passer à l'échelle tout en consolidant la base utilisateur et la monétisation</p>
                </div>
              )}
            </div>
          </div>
          <div className="scroll-indicator"><div className="scroll-arrow">↓</div></div>
        </div>
      </section>

      {/* Q&A */}
      <section ref={qaRef} className="page-section" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
        <div className="content">
          <div className="emoji">❓</div>
          <h1 className="title">Q&A</h1>
          <div className="qa-items">
            <div className="qa-item" onClick={() => toggleQA(1)}>
              <div className="qa-header">
                <h3>Is it free?</h3>
                <span className="toggle-icon">{openQA === 1 ? '−' : '+'}</span>
              </div>
              {openQA === 1 && <p>Yes, 100% free. No paywalls, no hidden fees.</p>}
            </div>
            <div className="qa-item" onClick={() => toggleQA(2)}>
              <div className="qa-header">
                <h3>How are profiles verified?</h3>
                <span className="toggle-icon">{openQA === 2 ? '−' : '+'}</span>
              </div>
              {openQA === 2 && <p>Through AI verification at signup — ensuring only real users can interact.</p>}
            </div>
            <div className="qa-item" onClick={() => toggleQA(3)}>
              <div className="qa-header">
                <h3>How do you monetize?</h3>
                <span className="toggle-icon">{openQA === 3 ? '−' : '+'}</span>
              </div>
              {openQA === 3 && <p>Ethical advertising & partnerships.</p>}
            </div>
            <div className="qa-item" onClick={() => toggleQA(4)}>
              <div className="qa-header">
                <h3>How do you ensure safety and quality?</h3>
                <span className="toggle-icon">{openQA === 4 ? '−' : '+'}</span>
              </div>
              {openQA === 4 && <p>Profiles are verified via AI at signup, plus a moderation system for ongoing protection.</p>}
            </div>
            <div className="qa-item" onClick={() => toggleQA(5)}>
              <div className="qa-header">
                <h3>How will NexTo grow?</h3>
                <span className="toggle-icon">{openQA === 5 ? '−' : '+'}</span>
              </div>
              {openQA === 5 && <p>We plan a phased rollout: MVP testing, public launch, targeted acquisition, and scaling geographically while optimizing user experience.</p>}
            </div>
            <div className="qa-item" onClick={() => toggleQA(6)}>
              <div className="qa-header">
                <h3>Why NexTo?</h3>
                <span className="toggle-icon">{openQA === 6 ? '−' : '+'}</span>
              </div>
              {openQA === 6 && <p>Because authenticity matters.</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

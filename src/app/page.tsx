export default function Home() {
  return (
    <main className="hero">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Kevin's Portfolio</h1>
        <p>
          I am a passionate software engineer crafting beautiful and functional digital experiences.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn btn-primary">View My Work</button>
          <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
            Get In Touch
          </button>
        </div>
      </div>
    </main>
  );
}

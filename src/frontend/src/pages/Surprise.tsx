import { useEffect, useRef, useState } from "react";

export default function SurprisePage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [confettiStarted, setConfettiStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const confettiParticles = useRef<
    {
      x: number;
      y: number;
      r: number;
      d: number;
      color: string;
      tilt: number;
      tiltAngle: number;
    }[]
  >([]);
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null);

  const COLORS = [
    "#ff4081",
    "#ff9a9e",
    "#ffecd2",
    "#a18cd1",
    "#fbc2eb",
    "#fddb92",
    "#d1c4e9",
    "#f8bbd9",
    "#80deea",
    "#fff9c4",
  ];

  function startConfetti() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    confettiParticles.current = [];
    for (let i = 0; i < 160; i++) {
      confettiParticles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 3,
        d: Math.random() * 160,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
      });
    }
    setConfettiStarted(true);
  }

  useEffect(() => {
    if (!confettiStarted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;
      confettiParticles.current.forEach((c, i) => {
        c.tiltAngle += 0.1;
        c.y += Math.cos(angle + c.d) + 2;
        c.x += Math.sin(angle) * 1.5;
        c.tilt = Math.sin(c.tiltAngle) * 12;
        if (c.y > canvas.height) {
          confettiParticles.current[i].y = -10;
          confettiParticles.current[i].x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();
      });
      animFrameRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [confettiStarted]);

  function handleShowSurprise() {
    setPopupVisible(true);
    startConfetti();
  }

  function handleClosePopup() {
    setPopupVisible(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setConfettiStarted(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    confettiParticles.current = [];
  }

  const moments = [
    { emoji: "❤️", text: "Our first meet" },
    { emoji: "😂", text: "Crazy fun days" },
    { emoji: "💪", text: "Supporting each other" },
    { emoji: "💖", text: "Endless memories" },
  ];

  const quotes = [
    {
      q: "A best friend is not just a person, they are a whole world.",
      e: "🌍",
    },
    { q: "Friends like you make life brighter and happier.", e: "✨" },
    { q: "No matter where life takes us, our bond will never break.", e: "💖" },
    { q: "You are my partner in crime and my forever support.", e: "😄" },
    { q: "True friendship is when silence feels comfortable.", e: "🤝" },
    {
      q: "We didn't realize we were making memories, we were just having fun.",
      e: "🎉",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: "#333",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Header */}
      <header
        style={{
          padding: "40px 20px 30px",
          background: "linear-gradient(135deg, #ff4081 0%, #f50057 100%)",
          boxShadow: "0 4px 20px rgba(255,64,129,0.4)",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
        <h1
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            letterSpacing: 1,
          }}
        >
          Surprise for My Best Friend
        </h1>
        <div style={{ fontSize: 48, marginTop: 8 }}>🎉</div>
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 16px 60px" }}>
        {/* Note card */}
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            margin: "32px auto 0",
            padding: "32px 40px",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(255,64,129,0.15)",
            border: "2px solid rgba(255,64,129,0.1)",
          }}
        >
          <h2 style={{ fontSize: 26, color: "#ff4081", marginBottom: 16 }}>
            Dear Best Friend ❤️
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: "#555",
              margin: 0,
            }}
          >
            Thank you for always being there for me. You are not just my friend,
            you are my family. Every moment with you is special and
            unforgettable. I am lucky to have you in my life.
          </p>
        </div>

        {/* Special Moments */}
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            margin: "24px auto 0",
            padding: "28px 40px",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(255,64,129,0.12)",
          }}
        >
          <h3 style={{ fontSize: 22, color: "#ff4081", marginBottom: 20 }}>
            ✨ Special Moments
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {moments.map((m) => (
              <div
                key={m.text}
                style={{
                  background: "linear-gradient(135deg, #fff0f3, #fff8fb)",
                  borderRadius: 16,
                  padding: "20px 12px",
                  border: "1.5px solid #ffd6e0",
                  transition: "transform 0.2s",
                  cursor: "default",
                  transform:
                    hoveredMoment === m.text ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredMoment(m.text)}
                onMouseLeave={() => setHoveredMoment(null)}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{m.emoji}</div>
                <div
                  style={{ fontSize: 15, fontWeight: 600, color: "#c2185b" }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quotes */}
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            margin: "24px auto 0",
            padding: "28px 40px",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(255,64,129,0.12)",
          }}
        >
          <h3 style={{ fontSize: 22, color: "#ff4081", marginBottom: 20 }}>
            💬 Quotes for You
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {quotes.map((item) => (
              <div
                key={item.q.slice(0, 20)}
                style={{
                  background: "linear-gradient(90deg, #fff0f3, #fff8fb)",
                  borderLeft: "4px solid #ff4081",
                  borderRadius: "0 12px 12px 0",
                  padding: "14px 20px",
                  textAlign: "left",
                  fontSize: 15,
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ fontSize: 20, marginRight: 8 }}>{item.e}</span>
                <em>&ldquo;{item.q}&rdquo;</em>
              </div>
            ))}
          </div>
        </div>

        {/* Surprise Button */}
        <div style={{ margin: "36px 0 8px" }}>
          <button
            type="button"
            onClick={handleShowSurprise}
            style={{
              padding: "18px 40px",
              fontSize: 20,
              fontWeight: 700,
              border: "none",
              borderRadius: 50,
              background: "linear-gradient(135deg, #ff4081, #f50057)",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(255,64,129,0.5)",
              letterSpacing: 0.5,
            }}
          >
            🎁 Click for Surprise
          </button>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 48,
            color: "#c2185b",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Made with ❤️ by your best friend
        </footer>
      </div>

      {/* Popup */}
      {popupVisible && (
        <>
          <div
            role="button"
            tabIndex={0}
            aria-label="Close surprise popup"
            onClick={handleClosePopup}
            onKeyDown={(e) => e.key === "Enter" && handleClosePopup()}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 100,
            }}
          />
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "40px 48px",
              borderRadius: 24,
              boxShadow: "0 12px 48px rgba(255,64,129,0.4)",
              textAlign: "center",
              zIndex: 200,
              maxWidth: 420,
              width: "90%",
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 12 }}>💖</div>
            <h2
              style={{
                fontSize: 28,
                color: "#ff4081",
                marginBottom: 16,
                fontWeight: 800,
              }}
            >
              Surprise!
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#666",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              You guys are my best team ever! Thank you for all the memories,
              laughter, and support. I&apos;m lucky to have you all ❤️
            </p>
            <button
              type="button"
              onClick={handleClosePopup}
              style={{
                padding: "12px 32px",
                fontSize: 16,
                fontWeight: 700,
                border: "none",
                background: "linear-gradient(135deg, #ff4081, #f50057)",
                color: "white",
                borderRadius: 50,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255,64,129,0.4)",
              }}
            >
              Close ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}

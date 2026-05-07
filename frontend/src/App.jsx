import { useState, useRef } from "react"
import axios from "axios"

function App() {
  const [file, setFile] = useState(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [citations, setCitations] = useState([])
  const [confidence, setConfidence] = useState(0)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const fileInputRef = useRef()

  const handleAsk = async () => {
    if (!file || !question) return
    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("question", question)
    try {
      const response = await axios.post("http://localhost:8000/ask", formData)
      setAnswer(response.data.answer)
      setCitations(response.data.citations || [])
      setConfidence(response.data.confidence || 0)
      setHistory(prev => [question, ...prev.slice(0, 4)])
    } catch (error) {
      setAnswer("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  const colors = darkMode ? {
    bg: "#09090B",
    card: "#18181B",
    border: "rgba(99,102,241,0.2)",
    text: "#F8FAFC",
    subtext: "#94A3B8",
    accent: "#6366F1",
    navBg: "rgba(9,9,11,0.8)"
  } : {
    bg: "#F8FAFC",
    card: "#FFFFFF",
    border: "rgba(99,102,241,0.15)",
    text: "#0F172A",
    subtext: "#64748B",
    accent: "#6366F1",
    navBg: "rgba(248,250,252,0.8)"
  }

  // LANDING PAGE
  if (!file) {
    return (
      <div style={{
        minHeight: "100vh",
        background: darkMode ? "#09090B" : "#F8FAFC",
        fontFamily: "'Segoe UI', sans-serif",
        color: colors.text
      }}>

        {/* Navbar */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          background: colors.navBg,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${colors.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              background: colors.accent,
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "18px"
            }}>📄</div>
            <span style={{ fontWeight: "700", fontSize: "18px" }}>Ask My Docs</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <a href="#how-it-works" style={{
              cursor: "pointer",
              color: colors.subtext,
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "'Segoe UI', sans-serif"
            }}>How it works</a>
            <a href="#privacy" style={{
              cursor: "pointer",
              color: colors.subtext,
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "'Segoe UI', sans-serif"
            }}>Privacy</a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: darkMode ? "#27272A" : "#F1F5F9",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => fileInputRef.current.click()}
              style={{
                background: colors.accent,
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Upload PDF
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", padding: "100px 48px 60px" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: darkMode ? "#18181B" : "white",
            borderRadius: "999px",
            padding: "6px 16px",
            fontSize: "13px",
            marginBottom: "32px",
            border: `1px solid ${colors.border}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
          }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
              display: "inline-block"
            }}></span>
            <span style={{ color: colors.subtext }}>Now powered by Groq · 10× faster retrieval</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "64px",
            fontWeight: "800",
            lineHeight: 1.1,
            margin: "0 0 24px",
            letterSpacing: "-1px"
          }}>
            Upload any document.<br />
            Ask{" "}
            <span style={{
              fontStyle: "italic",
              color: colors.accent
            }}>
              anything.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "18px",
            color: colors.subtext,
            maxWidth: "560px",
            margin: "0 auto 56px",
            lineHeight: 1.7
          }}>
            Drop a PDF and get grounded, cited answers in seconds.
            Every claim links back to the exact page — no hallucinations.
          </p>

          {/* Upload Box */}
          <div
            onClick={() => fileInputRef.current.click()}
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              background: darkMode ? "#18181B" : "white",
              border: `2px dashed ${colors.accent}`,
              borderRadius: "16px",
              padding: "48px",
              cursor: "pointer",
              boxShadow: darkMode
                ? "0 0 0 1px rgba(99,102,241,0.1)"
                : "0 4px 24px rgba(99,102,241,0.08)"
            }}
          >
            <div style={{
              background: colors.accent,
              borderRadius: "12px",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "24px"
            }}>⬆️</div>
            <p style={{
              fontWeight: "700",
              fontSize: "20px",
              margin: "0 0 8px",
              color: colors.text
            }}>
              Drop your PDF here
            </p>
            <p style={{
              color: colors.subtext,
              fontSize: "14px",
              margin: "0 0 24px"
            }}>
              or click to browse · PDF only
            </p>
            <button style={{
              background: colors.accent,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer"
            }}>
              Choose a file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "20px",
              fontSize: "12px",
              color: colors.subtext
            }}>
              <span>✓ End-to-end encrypted</span>
              <span>✓ Never used for training</span>
              <span>✓ Auto-deleted in 24h</span>
            </div>
          </div>

          {/* Sample Docs */}
          <div style={{ marginTop: "40px" }}>
            <p style={{
              fontSize: "11px",
              color: colors.subtext,
              letterSpacing: "1.5px",
              marginBottom: "16px"
            }}>
              OR TRY A SAMPLE DOCUMENT
            </p>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap"
            }}>
              {[
                { name: "EU AI Act — Final Text", tag: "REGULATION" },
                { name: "Tesla 10-K 2025", tag: "FINANCIAL" },
                { name: "Attention Is All You Need", tag: "RESEARCH" },
              ].map((doc, i) => (
                <div key={i} style={{
                  background: darkMode ? "#18181B" : "white",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: colors.text,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                  📄 {doc.name}
                  <span style={{
                    fontSize: "10px",
                    color: colors.accent,
                    fontWeight: "700"
                  }}>
                    {doc.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div id="how-it-works" style={{ padding: "80px 48px" }}>
          <h2 style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "48px",
            color: colors.text
          }}>
            How it works
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {[
              {
                icon: "⬆️",
                num: "1",
                title: "Upload your PDF",
                desc: "Drag and drop any document — research papers, contracts, manuals, financial reports."
              },
              {
                icon: "⚡",
                num: "2",
                title: "We index it instantly",
                desc: "Your document is chunked and embedded in seconds using LangChain retrieval pipelines."
              },
              {
                icon: "🔍",
                num: "3",
                title: "Ask anything",
                desc: "Get cited answers with the exact page and passage. Verify every claim in one click."
              }
            ].map((step, i) => (
              <div key={i} style={{
                background: darkMode ? "#18181B" : "white",
                borderRadius: "16px",
                padding: "28px",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    background: darkMode ? "#27272A" : "#EEF2FF",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "20px"
                  }}>{step.icon}</div>
                  <span style={{
                    fontSize: "40px",
                    fontWeight: "800",
                    color: colors.accent,
                    opacity: 0.15
                  }}>{step.num}</span>
                </div>
                <h3 style={{
                  margin: "0 0 8px",
                  fontSize: "16px",
                  color: colors.text
                }}>{step.title}</h3>
                <p style={{
                  margin: 0,
                  color: colors.subtext,
                  fontSize: "13px",
                  lineHeight: 1.6
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{ padding: "0 48px 80px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            {[
              { icon: "🔒", title: "Private by default", desc: "Files never leave your session" },
              { icon: "📌", title: "Cited answers", desc: "Page-level source attribution" },
              { icon: "⚡", title: "Sub-second latency", desc: "Powered by Groq inference" },
              { icon: "📄", title: "Up to 500 pages", desc: "Long-context retrieval" },
            ].map((f, i) => (
              <div key={i} style={{
                background: darkMode ? "#18181B" : "white",
                borderRadius: "12px",
                padding: "20px",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)"
              }}>
                <div style={{
                  background: darkMode ? "#27272A" : "#EEF2FF",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "20px",
                  display: "inline-block",
                  marginBottom: "12px"
                }}>{f.icon}</div>
                <p style={{
                  margin: "0 0 4px",
                  fontWeight: "600",
                  fontSize: "13px",
                  color: colors.text
                }}>{f.title}</p>
                <p style={{
                  margin: 0,
                  color: colors.subtext,
                  fontSize: "12px"
                }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div id="privacy" style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 48px",
          borderTop: `1px solid ${colors.border}`,
          fontSize: "13px",
          color: colors.subtext
        }}>
          <span>© 2026 Ask My Docs</span>
          <span>Powered by <strong style={{ color: colors.accent }}>Groq + LangChain</strong></span>
        </div>
      </div>
    )
  }

  // MAIN APP
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: "280px",
        background: colors.accent,
        color: "white",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <div>
          <h2 style={{ margin: 0, color: "white" }}>📄 Ask My Docs</h2>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
            Document Q&A
          </p>
        </div>

        <div>
          <p style={{ margin: "0 0 8px", fontWeight: "600", fontSize: "12px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>
            DOCUMENT
          </p>
          <div style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
            padding: "12px"
          }}>
            <p style={{ margin: 0, fontSize: "13px" }}>📄 {file.name}</p>
            <p style={{ margin: "4px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
              ✅ Document ready
            </p>
          </div>
          <button
            onClick={() => { setFile(null); setAnswer(""); setHistory([]); setCitations([]); setConfidence(0) }}
            style={{
              marginTop: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Upload Different PDF
          </button>
        </div>

        {history.length > 0 && (
          <div>
            <p style={{ margin: "0 0 8px", fontWeight: "600", fontSize: "12px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px" }}>
              RECENT QUESTIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {history.map((q, i) => (
                <div
                  key={i}
                  onClick={() => setQuestion(q)}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    cursor: "pointer",
                    opacity: i === 0 ? 1 : 0.7,
                    borderLeft: i === 0 ? "3px solid white" : "3px solid transparent"
                  }}
                >
                  {q.length > 40 ? q.slice(0, 40) + "..." : q}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: "auto", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          Powered by Groq + LangChain
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "48px",
        background: "#F8FAFC",
        overflowY: "auto"
      }}>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#0F172A",
          marginBottom: "8px"
        }}>
          Ask anything about{" "}
          <span style={{ color: colors.accent, fontStyle: "italic" }}>
            your document.
          </span>
        </h1>
        <p style={{ color: "#64748B", marginBottom: "32px" }}>
          Grounded answers with citations. Powered by hybrid retrieval + reranking.
        </p>

        {/* Question Input */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "16px 20px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          border: `1px solid ${colors.border}`
        }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask a question about your document..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#0F172A",
              background: "transparent"
            }}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{
              background: colors.accent,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Thinking..." : "Ask →"}
          </button>
        </div>

        {/* Answer + Confidence + Citations */}
        {answer && (
          <div style={{ marginTop: "24px" }}>

            {/* Confidence Bar */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px 24px",
              marginBottom: "16px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              border: `1px solid ${colors.border}`
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "13px",
                color: "#64748B"
              }}>
                <span>CONFIDENCE</span>
                <span style={{ fontWeight: "700", color: colors.accent }}>{confidence}%</span>
              </div>
              <div style={{
                background: "#F1F5F9",
                borderRadius: "999px",
                height: "6px"
              }}>
                <div style={{
                  background: colors.accent,
                  borderRadius: "999px",
                  height: "6px",
                  width: `${confidence}%`,
                  transition: "width 0.5s ease"
                }}></div>
              </div>
            </div>

            {/* Answer */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
              borderLeft: `4px solid ${colors.accent}`,
              marginBottom: "16px"
            }}>
              <p style={{
                fontSize: "12px",
                fontWeight: "700",
                color: colors.accent,
                marginBottom: "12px",
                letterSpacing: "1px"
              }}>
                ✦ ANSWER
              </p>
              <p style={{
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#0F172A",
                whiteSpace: "pre-wrap",
                margin: 0
              }}>
                {answer}
              </p>
            </div>

            {/* Citations */}
            {citations.length > 0 && (
              <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                border: `1px solid ${colors.border}`
              }}>
                <p style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#64748B",
                  marginBottom: "16px",
                  letterSpacing: "1px"
                }}>
                  CITATIONS · {citations.length} SOURCES
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {citations.map((c, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                      padding: "16px",
                      background: "#F8FAFC",
                      borderRadius: "8px",
                      border: `1px solid ${colors.border}`
                    }}>
                      <div style={{
                        background: colors.accent,
                        color: "white",
                        borderRadius: "8px",
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "13px",
                        flexShrink: 0
                      }}>
                        {c.chunk}
                      </div>
                      <div>
                        <p style={{
                          margin: "0 0 6px",
                          fontSize: "12px",
                          color: "#64748B"
                        }}>
                          Page · <strong>{c.page + 1}</strong> · Score: {c.score}%
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: "13px",
                          color: "#334155",
                          lineHeight: 1.6
                        }}>
                          {c.excerpt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
import LoginButton from "./components/LoginButton";
import { useState } from "react";

export default function App() {
  const [note, setNote] = useState<string>("");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        fontFamily: "Inter, system-ui, sans-serif",
        background: "#0a132b",
        color: "#e5f4ff",
        display: "grid",
        gap: 24
      }}
    >
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>Axodus Academy — Multichain Login</h1>
        <small style={{ opacity: 0.8 }}>EVM (AppKit) + Solana (Phantom)</small>
      </header>

      <section
        style={{
          display: "grid",
          gap: 16,
          maxWidth: 720,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          padding: 16
        }}
      >
        <p style={{ margin: 0, opacity: 0.9 }}>
          Conecte sua carteira <strong>EVM</strong> (via Reown AppKit) ou <strong>Solana</strong> (via Phantom) e faça login.
          O backend emitirá um <strong>JWT curto</strong> com claims <code>sub</code>, <code>net</code>, <code>kind</code> e, no caso EVM, <code>chainId</code>.
        </p>

        <LoginButton />

        {note && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              opacity: 0.85,
              background: "rgba(255,255,255,0.05)",
              padding: 12,
              borderRadius: 8
            }}
          >
            <strong>Note:</strong> {note}
          </div>
        )}
      </section>

      <section style={{ fontSize: 12, opacity: 0.8 }}>
        <p style={{ margin: 0 }}>
          Dica: após logar, o token é aplicado como <code>Authorization: Bearer &lt;jwt&gt;</code> no cliente API.
          Quando adicionarmos as rotas protegidas (ex.: <code>/signed-url</code>, <code>/pointers</code>), já estará pronto.
        </p>
      </section>
    </div>
  );
}

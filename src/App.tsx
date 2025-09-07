import LoginButton from "./components/LoginButton";
import { api } from "./services/api";
import { useState } from "react";

export default function App() {
  const [putUrl, setPutUrl] = useState<string>();
  const [uri, setUri] = useState<string>();
  const [dl, setDl] = useState<string>();

  async function createUpload() {
    const key = `videos/demo-${Date.now()}.mp4`; // demo
    const { data } = await api.post("/upload", { key, size: 1 });
    setPutUrl(data.putUrl);
    setUri(data.uri);
  }

  async function getSignedUrl() {
    if (!uri) return;
    const { data } = await api.post("/signed-url", { uri, op: "get" });
    setDl(data.url);
  }

  return (
    <div style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif", color: "#e5f4ff", background: "#0a132b", minHeight: "100vh" }}>
      <h1>Axodus Academy</h1>
      <LoginButton />

      <hr style={{ margin: "24px 0", opacity: 0.2 }} />

      <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
        <button onClick={createUpload}>Create Upload (signed PUT)</button>
        {putUrl && <div><strong>PUT URL:</strong> <code style={{ fontSize: 12 }}>{putUrl}</code></div>}
        {uri && <div><strong>URI:</strong> <code>{uri}</code></div>}

        <button onClick={getSignedUrl} disabled={!uri}>Get Download URL (on-chain access)</button>
        {dl && <div><strong>Download URL:</strong> <a href={dl} target="_blank">{dl.slice(0,80)}...</a></div>}
      </div>
    </div>
  );
}

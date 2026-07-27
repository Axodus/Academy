import { useMemo, useState } from "react";
import { api, setBearer } from "../services/api";
import { appKit, connectEvm, connectSolana, signSolanaMessage, CHAIN_IDS } from "../services/appkit";

type NetKind = "evm" | "solana";

const EVM_CHAINS = [
  { id: CHAIN_IDS.ethereum, label: "Ethereum" },
  { id: CHAIN_IDS.arbitrum, label: "Arbitrum" },
  { id: CHAIN_IDS.bnb, label: "BNB Smart Chain" },
  { id: CHAIN_IDS.opbnb, label: "opBNB" },
  { id: CHAIN_IDS.harmony, label: "Harmony (opt)" }
].filter((c) => !!c.id);

export default function LoginButton() {
  const [net, setNet] = useState<NetKind>("evm");
  const [evmChainId, setEvmChainId] = useState<number>(CHAIN_IDS.ethereum);
  const [address, setAddress] = useState<string>();
  const [pubkey, setPubkey] = useState<string>();
  const [jwt, setJwt] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [log, setLog] = useState<string>("");

  const evmChainOptions = useMemo(() => EVM_CHAINS as { id: number; label: string }[], []);

  async function handleLogin() {
    setLoading(true);
    setLog("");
    try {
      if (net === "evm") {
        const { address: addr, chainId } = await connectEvm();
        setAddress(addr);

        const { data: nonceRes } = await api.post("/auth/nonce", {
          network: "evm",
          address: addr,
          chainId
        });
        const message: string = nonceRes.message;

        // @ts-ignore
        const sig: string = await window.ethereum.request({
          method: "personal_sign",
          params: [message, addr]
        });

        const { data: verifyRes } = await api.post("/auth/verify", {
          network: "evm",
          address: addr,
          chainId,
          nonce: nonceRes.nonce,
          signature: sig
        });

        setBearer(verifyRes.jwt);
        setJwt(verifyRes.jwt);
        setLog(JSON.stringify(verifyRes.user));
      }

      if (net === "solana") {
        const { pubkey: pk } = await connectSolana();
        setPubkey(pk);

        const { data: nonceRes } = await api.post("/auth/nonce", {
          network: "solana",
          pubkey: pk
        });

        const message: string = nonceRes.message;

        const signatureB64 = await signSolanaMessage(message);

        const { data: verifyRes } = await api.post("/auth/verify", {
          network: "solana",
          pubkey: pk,
          nonce: nonceRes.nonce,
          signature: signatureB64
        });

        setBearer(verifyRes.jwt);
        setJwt(verifyRes.jwt);
        setLog(JSON.stringify(verifyRes.user));
      }
    } catch (e: any) {
      console.error(e);
      setLog(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-3 text-sm text-slate-300">
      <div className="flex gap-4">
        <label className="flex min-h-10 cursor-pointer items-center gap-2">
          <input type="radio" name="net" value="evm" checked={net === "evm"} onChange={() => setNet("evm")} /> EVM
        </label>
        <label className="flex min-h-10 cursor-pointer items-center gap-2">
          <input type="radio" name="net" value="solana" checked={net === "solana"} onChange={() => setNet("solana")} /> Solana
        </label>
      </div>

      {net === "evm" && (
        <label className="grid gap-1.5">
          <span className="text-xs text-slate-400">Network</span>
          <select className="min-h-11 rounded-md border border-academy-line bg-[#071321] px-3 text-slate-200" value={evmChainId} onChange={(e) => setEvmChainId(Number(e.target.value))}>
            {evmChainOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
      )}

      <button className="academy-action w-full" onClick={handleLogin} disabled={loading}>
        {loading ? "Signing..." : net === "evm" ? "Connect & Login (EVM)" : "Connect & Login (Solana)"}
      </button>

      <div className="min-w-0 break-all text-xs text-slate-400">
        {address && <div>EVM addr: <code>{address}</code></div>}
        {pubkey && <div>Solana pk: <code>{pubkey}</code></div>}
        {jwt && <div>JWT: <code>{jwt.slice(0, 24)}...</code></div>}
        {log && (
          <div>
            <div>Result:</div>
            <pre className="mt-1 max-h-28 overflow-auto rounded-md bg-white/5 p-2 whitespace-pre-wrap">{log}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

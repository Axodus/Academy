import { useEffect, useState } from "react";
import { appKit } from "../services/appkit";
import { api, setBearer } from "../services/api";
import { TypedDataDomain } from "ethers";

type TypedData = {
  domain: TypedDataDomain;
  types: any;
  primaryType: string;
  message: any;
};

export default function LoginButton() {
  const [address, setAddress] = useState<string>();
  const [jwt, setJwt] = useState<string>();

  useEffect(() => {
    const unsub = appKit.subscribe((state) => {
      const a = state?.address;
      setAddress(a || undefined);
    });
    return () => unsub?.();
  }, []);

  async function signIn() {
    if (!address) {
      await appKit.open();
      return;
    }
    const { data: nonceRes } = await api.post("/auth/nonce", { wallet: address });
    const typed: TypedData = nonceRes.typedData;

    // @ts-ignore - injected provider via window.ethereum
    const sig: string = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [address, JSON.stringify(typed)]
    });

    const { data: verifyRes } = await api.post("/auth/verify", {
      wallet: address,
      signature: sig
    });

    setBearer(verifyRes.token);
    setJwt(verifyRes.token);
  }

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button onClick={signIn}>
        {address ? "Sign & Login" : "Connect Wallet"}
      </button>
      {address && <span style={{ opacity: 0.8 }}>Address: {address}</span>}
      {jwt && <span style={{ fontSize: 12, opacity: 0.7 }}>JWT: {jwt.slice(0,12)}...</span>}
    </div>
  );
}

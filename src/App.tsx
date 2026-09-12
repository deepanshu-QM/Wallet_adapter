
import {useState} from "react";

export function App(){
  const [wallets, setWallets] = useState<string[]>([]);
  return (
    <div>
      <b>
        <button onClick={function() {
          if (window.backpack) {
            setWallets(w => [...w, "backpack"])
          }
          if (window.solfare) {
            setWallets(w => [...w, "solfare"])
          }
          if (window.phantom) {
            setWallets(w => [...w, "phantom"])
          }
        }}>Connect with Your wallet</button>
      </b>
      {wallets.map(wallet => <button>{wallet}</button>)}
    </div>
  )
}
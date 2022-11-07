import {
  useAddress,
  useMetamask, 
  useContract,
  useClaimNFT,
  useNetwork,
  useNetworkMismatch,
  useUser,
  useLogin,
} from "@thirdweb-dev/react";

import { ChainId } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";

export default function Login() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  const [, switchNetwork] = useNetwork();
  const networkMismatch = useNetworkMismatch();

  const editionDropContract = useContract("0xDF9e9D5328eC0217f5Dc60CB28898e8c64EE6447");

  // const { mutate: claimNft, isLoading: isClaiming} =  useClaimNFT(editionDropContract);

  const login = useLogin();
  const { user } = useUser();

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <p>Welcome, {address.slice(0,6)}...</p>

          <button
            className={styles.mainButton}
            style={{ width: 256 }}
            onClick={login}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <button
            className={styles.mainButton}
            style={{ width: "fit-content", paddingRight: 16, paddingLeft: 16 }}
            onClick={() => connectWithMetamask()}
          >
            Connect with Metamask
          </button>
        </>

      )}
    </div>
  )
}

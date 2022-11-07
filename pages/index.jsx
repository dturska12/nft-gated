import React from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLogout } from "@thirdweb-dev/react";
import { getUser } from "../auth.config";
import checkBalance from "../util/checkBalance";
import styles from "../styles/Home.module.css";

export default function Home() {
  const logout = useLogout();

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Auth - NFT Gated Content</h1>
      <p className={styles.explain}>
      Restricted Access, Creator Pass holders only!
      </p>

      <button className={styles.mainButton} onClick={logout}>
        logout
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
    const user = await getUser(context.req);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
      },
    };
  }

  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("No private key found");
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY,
    "goerli"
  );

  const hasNft = await checkBalance(sdk, user.address);

  console.log("User", user.address, "doesnt have a creator pass! Redirecting...");
  if (!hasNft) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };

}
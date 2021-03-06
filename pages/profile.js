import Head from 'next/head'
import React from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from '../styles/Home.module.css'

import {
  createInstance
} from "@optimizely/optimizely-sdk";

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const userProfileService = {
    lookup: function() {
      const userFromStore = JSON.parse(localStorage.getItem("user_id")) || uuidv4();
      console.log("🚀 ~ file: profile.js ~  ~ userFromStore", userFromStore)

      return userFromStore;
    },
    save: function(data) {
      localStorage.setItem("user_id", JSON.stringify(data));
      console.log("🚀 ~ file: profile.js ~ line 21 ~ data", data)
    }
};

export default function Home() {

  const optimizelyClient = createInstance({
    sdkKey: sdkKey,
    userProfileService: userProfileService
  });

  optimizelyClient.onReady().then(() => {
    const optimizelyUserContext = optimizelyClient.createUserContext(uuidv4());
    const featureFlag = optimizelyUserContext?.decide('feature_flag');
    console.log("🚀 ~ file: profile.js ~ line 35 ~ optimizelyClient.onReady ~ featureFlag", featureFlag)
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>
          User Profile Store
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <h3 className={styles.title}>
         User Profile Store Example
        </h3>
      </main>
    </div>
  )
}

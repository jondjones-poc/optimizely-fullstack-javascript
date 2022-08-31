import Head from 'next/head'
import React from "react";
import { useRouter } from 'next/router'
import { createInstance } from "@optimizely/optimizely-sdk";
import dataFile from '../lib/optimizely/datafile.json'

// Sync Vs Async
// https://docs.developers.optimizely.com/full-stack/v2.1/docs/use-synchronous-or-asynchronous-initialization

import FeatureFlagComponent from "../component/FeatureFlagComponent";

export default function WebHook({...props}) {

  console.log(props);

  const router = useRouter()
  const { id } = router.query

  const optimizelyClient = createInstance({
    datafile: props.datafile,
  });

  const optimizelyUserContext = optimizelyClient.createUserContext(
    id,
  );

  const featureFlagTargetedDelivery = optimizelyUserContext?.decide('feature_flag');
  console.log('featureFlagTargetedDelivery', featureFlagTargetedDelivery?.enabled);

  const dynamicVariableExample = featureFlagTargetedDelivery?.variables.name;
  const isFeatureEnabled  = featureFlagTargetedDelivery?.enabled ?? false;

  return (
    <>
      <Head>
        <title>
          Real time data
        </title>
        <meta name="description" content="Generated by JonDJones" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="features">
        <div className="container" id="feature-container">

          {!id ? <header>
              <h2>Add user id as querystring &quot;id&quot;</h2>
            </header> : <>

              <header>

                <h2>
                  {dynamicVariableExample}
                </h2>

              </header>

              {isFeatureEnabled &&
                <FeatureFlagComponent userId={id} optimizelyClient={optimizelyClient} />
              }
            </>}
          </div>
        </section>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      datafile: dataFile
    }
  }
}

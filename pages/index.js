import Head from 'next/head'
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/router'

import ComponentA from "../component/Experimentation/ComponentA";
import ComponentB from "../component/Experimentation/ComponentB";

import {
  createInstance
} from "@optimizely/optimizely-sdk";

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
const dataFileUrl = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;

const optimizelyClient = createInstance({
  datafile: props?.datafile,
});

export default function Home({...props}) {

  const [ isFeatureEnabled, renderIsFeatureEnabled ] = useState(true);
  const [ componentName, setComponentName ] = useState('');
  const [ postData, setPostData ] = useState({});

  const router = useRouter()

  // Got user Id either via query-string, or, create a random one
  const { id, location } = router.query
  const userId = id || uuidv4();

  let optimizelyUserContext;

  optimizelyClient.onReady().then(() => {
    optimizelyUserContext = optimizelyClient.createUserContext(
      userId,
      {
        location: location || "london",
        deviceType: "ios"
      }
    );
  });

  useEffect(() => {

    optimizelyClient.onReady().then(() => {
      const featureFlagTargetedDelivery = optimizelyUserContext.decide('feature_flag');
      console.log('featureFlagTargetedDelivery', featureFlagTargetedDelivery.enabled);

      setComponentName(featureFlagTargetedDelivery.variables.name);
      renderIsFeatureEnabled(featureFlagTargetedDelivery.enabled);

      const usersBucketedExperimentKey = optimizelyClient.activate('a_b_test_multi-armed_bandit', userId);
      const api = optimizelyClient.getFeatureVariable('a_b_test', 'api_configuration', userId);

      const fetchData = async () => {
        const response = await fetch(api.url);
        const json = await response.json();

        console.log('posts', api.url, json);
        setPostData(json);
      }

      fetchData().catch(console.error);
    });
  }, [optimizelyUserContext]);

  const bannerClicked = () => {
    optimizelyClient.track('banner_click', userId);
  }

  return (
    <>
      <Head>

        <title>
          Optimizely Fullstack Javascript
        </title>

        <meta name="description" content="Generated by JonDJones" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="features">
        <div className="container" id="feature-container">
          <header>
            <h2>
              <strong>
                <a href="#">
                  {componentName}
                </a>
              </strong>
            </h2>
          </header>
        </div>
      </section>

      {isFeatureEnabled ?
        <ComponentA userId={userId} /> : <ComponentB />
      }

      <section id="main">
					<div className="container">
						<div className="row">

              <article className="box post" id="article">

                <header>
                  <h2>
                    {postData.title}
                  </h2>
                </header>

                <a href="#" className="image featured">
                  <img src={`./images/${postData.id}.png`} alt={postData.title} />
                </a>

                <p className="post-data">
                  {postData.body}
                </p>

                <ul className="actions">
                  <li>
                    <button className="button icon solid fa-file" onClick={bannerClicked}>
                      Buy Now
                    </button>
                  </li>
                </ul>

              </article>

            </div>
          </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch(dataFileUrl);
  const datafile = await response.json();

  return {
    props: {
      datafile
    }
  }
}

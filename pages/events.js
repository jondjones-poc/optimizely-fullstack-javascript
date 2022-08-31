import Head from 'next/head'
import { useRouter } from 'next/router'
import { createInstance } from "@optimizely/optimizely-sdk";
import { NOTIFICATION_TYPES } from "@optimizely/js-sdk-utils";
import { fetchDatafile } from '../utils/optimizelyDataFileHandlerClientSide';

import ABComponent from "../component/ABComponent";

import { onActivate, onTrack, onDecision } from '../utils/optimizelyNotificationHandler';

export default function Events({...props}) {

    const activateUser = (optimizelyClient, id) => {
        optimizelyClient.track('banner_click', id);
        console.log('activateUser')
    };

    const optimizelyClient = createInstance({
        datafile: props.dataFile,
    });

    optimizelyClient.notificationCenter.addNotificationListener(NOTIFICATION_TYPES.ACTIVATE, onActivate);
    optimizelyClient.notificationCenter.addNotificationListener(NOTIFICATION_TYPES.TRACK, onTrack);
    optimizelyClient.notificationCenter.addNotificationListener(NOTIFICATION_TYPES.DECISION, onDecision);

    const router = useRouter()
    const { id } = router.query;

    let backgroundColor, componentTitle, optimizelyUserContext;

    if (id) {
        optimizelyUserContext = optimizelyClient.createUserContext(id);
        const abTestFlag = optimizelyUserContext.decide('ab_test');
        backgroundColor = abTestFlag.variables.backgroundcolour;
        componentTitle = abTestFlag.variables.component_title;
    }

    return (
        <>
        <Head>
            <title>
            MyStore E-Commerce
            </title>

            <link rel="icon" href="/favicon.ico" />
        </Head>

        <section id="features">
        <div className="container" id="feature-container">

            {!id ?  <header>
                        <h2>Add user id as querystring &quot;id&quot;</h2>
                    </header> : <>

                    <ABComponent key={`${componentTitle}`} userId={id} optimizelyClient={optimizelyClient} backgroundColor={backgroundColor} componentTitle={componentTitle} />

                    <section id="main">
                        <button onClick={() => activateUser(optimizelyClient, id)}>
                            Click Me
                        </button>
                    </section>
            </>}
          </div>
        </section>
    </>
  )
}

export const getStaticProps = async () => {
  const dataFile = await fetchDatafile();

  return {
      props: {
        dataFile: dataFile,
      }
  }
}
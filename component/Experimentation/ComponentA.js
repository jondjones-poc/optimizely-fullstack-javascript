import React from 'react'
import {
    createInstance
  } from "@optimizely/optimizely-sdk";

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
const optimizelyClient = createInstance({
    sdkKey: sdkKey,

});

const ComponentA = ({...props}) => {

    const addEvent = () => {
        optimizelyClient.track('button_click', props.userId);
    }

    return (
        <div className="container">
            <header>
                <h2>
                    Feature Enabled
                </h2>
            </header>
            <div className="row aln-center">
                <div className="col-4 col-6-medium col-12-small">
                    <section>
                        <a href="#" className="image featured"><img src="images/pic01.jpg" alt="" /></a>
                        <header>
                            <h3>Okay, so what is this?</h3>
                        </header>
                        <p>This is <strong>Strongly Typed</strong>, a free, fully responsive site template
                        by <a href="http://html5up.net">HTML5 UP</a>. Free for personal and commercial use under the
                        <a href="http://html5up.net/license">CCA 3.0 license</a>.</p>
                    </section>
                </div>
                <div className="col-4 col-6-medium col-12-small">
                    <section>
                        <a href="#" className="image featured"><img src="images/pic02.jpg" alt="" /></a>
                        <header>
                            <h3>Nice! What is HTML5 UP?</h3>
                        </header>
                        <p><a href="http://html5up.net">HTML5 UP</a> is a side project of I started it as a way to both test my responsive tools and sharpen up my coding
                        and design skills a bit.</p>
                    </section>
                </div>
                <div className="col-4 col-6-medium col-12-small">
                    <section>
                        <a href="#" className="image featured"><img src="images/pic03.jpg" alt="" /></a>
                        <header>
                            <h3>What's this built with?</h3>
                        </header>
                        <p><strong>Responsive Tools</strong> is a simple set of tools for building responsive
                        sites and apps. All of my templates at <a href="http://html5up.net">HTML5 UP</a> are built using these tools.</p>
                    </section>
                </div>
                <div className="col-12">
                    <ul className="actions">
                        <li>
                            <button className="button icon solid fa-file" onClick={addEvent}>
                                Tell Me More
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ComponentA
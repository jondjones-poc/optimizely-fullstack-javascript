import React from 'react'

const sectionStyle = (client, imageId) => (
{
  width: '100%',
  backgroundImage: `url(images/${client}${imageId}.png)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '45vh',
  marginTop: '2rem',
  marginBottom: '2rem'
});

const MultiArmBanditComponent = ({...props}) => {

    const { userId, postId, title, body, optimizelyClient } = props;
    console.log("MAB", props);

    const bannerClicked = (optimizelyClient, postId) => {
        optimizelyClient.track('banner_click', userId, {variation: postId});
        console.log(`Banner ${postId} clicked`)
    }

    return (
        <section id="multi-arm" style={sectionStyle(process.env.NEXT_PUBLIC_CLIENT, postId)} >
            <div className="container">
                <header>
                    <h2>
                    <strong>
                        {`Multi-arm Bandit Variation ${postId}`}
                    </strong>
                    </h2>
                </header>

                <article className="box post" id="article">

                    <div className="image featured" onClick={() => bannerClicked(optimizelyClient, userId, postId)}>
                        <img src={`./images/${postId}.png`} alt={title} />
                    </div>

                    <p className="post-data">
                        <strong>${title}</strong>: {body}
                    </p>

                    <ul className="actions">
                        <li>
                            <button className="button icon solid fa-file" onClick={() => bannerClicked(optimizelyClient, userId, postId)}>
                                Buy Now
                            </button>
                        </li>
                    </ul>
                </article>
            </div>
        </section>
    )
}

export default MultiArmBanditComponent
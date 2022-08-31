import React from 'react'

const FeatureFlagComponent  = (({name}) => {
    return (
        <section id="banner" >
            <div className="container">
                <p>Welcome This Feature if Turned On<br /></p>
            </div>
		</section>)
})

export default FeatureFlagComponent
import React from 'react'

const ComponentB  = (({name}) => {
    return (
        <section id="banner" >
            <div className="container">
                <p>Welcome {name} to our store<br /></p>
            </div>
		</section>)
})

export default ComponentB
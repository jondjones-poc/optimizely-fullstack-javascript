import React from 'react'

const sectionStyle = (backgroundColor) => (
{
        width: '100%',
        backgroundColor : backgroundColor,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '300px',
        marginTop: '2rem',
        marginBottom: '2rem',
        color: 'black'
});


const titleStyle =  {
    color: 'black',
    margin: 'auto',
    fontSize: '3rem',
    textAlign: 'center',
    paddingTop: '35px'
};

const ABComponent = ({...props}) => {

    const { backgroundColor } = props;
    console.log("ABComponent", props);

    const addEvent = () => {
        console.log("AB Component Event Example")
        props.optimizelyClient.track('button_click', props.userId);
    }

    return (
        <section id="abtest" style={sectionStyle(backgroundColor)}>
            <div className="container">
                <header>
                    <h2 >
                        A/B Component
                    </h2>
                </header>

                <div className="container" id="component-a"   onClick={addEvent} >
                    <h1 style={titleStyle}>
                        {props.componentTitle}
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default ABComponent
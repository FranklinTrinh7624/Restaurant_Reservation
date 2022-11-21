import { Component } from 'react'
import './styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        return (
            <div className='Home'>
                <div className='hero'>
                    <div id='hero-bg'>
                        <div id='hero-text-container'>
                            <h1>The Bear Den</h1>
                            <h2>Steakhouse</h2>
                        </div>
                    </div>
                </div>
                <div className='main'>
                    <h2>The Best Place To Visit For Prime & Choice Western Beef, Seafood and Chicken.</h2>
                    <p>There's something about a steakhouse that just oozes sophistication.<br /><br />
                    Maybe it's the dark wood paneling, the leather booths, or the waiters in bow ties.<br /><br />
                    Whatever the reason, steakhouse dining feels special.<br /><br />
                    And the food lives up to the hype.<br /><br />
                    A good steakhouse will have dry-aged beef, which has a richer flavor than the wet-aged variety. The meat is cooked over a high heat, resulting in a crispy exterior and a juicy interior.
                    The sides are usually pretty simple, letting the steak be the star of the show. But that doesn't mean they're not delicious.<br /><br />
                    A steakhouse salad is usually a mix of crisp greens and tangy vinaigrette, while the mashed potatoes are smooth and creamy.<br /><br />
                    If you're looking for a truly indulgent meal, a steakhouse is the place to go.<br />Just be sure to save room for dessert. The chocolate lava cake is a must-try.</p>
                </div>
            </div>
        )
    }
}

export default Home

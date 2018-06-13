import React, {Component} from 'react';

const btnClassDefinition = 'btn btn-sm btn-outline-secondary';

class Mission extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filteredPayloads: this.props.payloads
        }
    }

    handleClick = (url) => {
        window.open(url, '_new');
    };

    render() {
        return (
            <div>
                {this.state.filteredPayloads.map((payload) => {
                    return (
                        <div key={payload.payload_id} className='mission'>

                            <div className='mission-patch-container'>
                                <img className='mission-patch' src={this.props.links.mission_patch}
                                     alt='Mission Patch' title='Mission Patch' />
                            </div>

                            <div className='mission-content'>

                                <div className='mission-details'>
                                    <div
                                        className='mission-name'>{this.props.rocket.rocket_name} - {payload.payload_id} {(!this.props.launch_success || !this.props.land_success) &&
                                        <span className='mission-failed-indicator'> - Failed Mission</span>}</div>
                                    <div
                                        className='mission-location'>Launched {new Date(this.props.launch_date_local).toUTCString()}</div>
                                </div>

                                <div className='mission-button-bar'>
                                    {this.props.links.reddit_campaign &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.reddit_campaign)}
                                                name='campaign'>Reddit Campaign
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.reddit_launch &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.reddit_launch)}
                                                name='launch'>Reddit Launch
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.reddit_recovery &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.reddit_recovery)}
                                                name='launch'>Reddit Recovery
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.reddit_media &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.reddit_media)}
                                                name='media'>Reddit Media
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.presskit &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.presskit)}
                                                name='press'>Press Kit
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.article_link &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.article_link)}
                                                name='article'>Article
                                        </button>
                                    </div>
                                    }
                                    {this.props.links.video_link &&
                                    <div className='mission-link-item'>
                                        <button className={btnClassDefinition} type='button'
                                                onClick={() => this.handleClick(this.props.links.video_link)}
                                                name='video'>Watch Video
                                        </button>
                                    </div>
                                    }
                                </div>

                            </div>

                            <div className='mission-flight-number'>
                                <div className='number' title='Flight number'>#{this.props.flight_number}</div>
                                <div className='text'>Flight Number</div>
                            </div>


                        </div>
                    )
                })}

            </div>
        );

    }
}

export default Mission
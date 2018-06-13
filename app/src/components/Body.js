import React, {Component} from 'react';
/*import MissionTable from './MissionTable';*/
import MissionFilter from './MissionFilter';
import DataSource from './DataSource';

class Body extends Component {

    constructor(props) {
        super(props);

        this.state = {
            launchPads: null,
            launches: null,
            filteredLaunches: null,
            serverError: null
        };

        this.dataSource = new DataSource();
    }

    /**
     * Sort missions in descending flight number order
     * @param a
     * @param b
     * @returns {number}
     * @private
     */
    _sortMissions(a, b) {
        if (b.flight_number < a.flight_number)
            return -1;
        if (b.flight_number > a.flight_number)
            return 1;
        return 0;
    }

    componentWillMount() {
        this.dataSource.getPads().then(success => {
            if (success.data) {

                this.dataSource.getLaunches().then(succezz => {
                    if (succezz.data) {
                        // assumption per mock-up: missions displayed by flight number decrementally
                        this.setState({
                            serverError: false,
                            launchPads: success.data,
                            launches: succezz.data.sort(this._sortMissions)
                        });
                    } else {
                        // no records
                    }
                }).catch(failstate => {
                    console.log('failed getting launches');
                    this.setState({serverError: true});
                    return false;
                });

            } else {
                // no records
            }
        }).catch(failure => {
            console.log('failed getting launch pads');
            this.setState({serverError: true});
            return false;
        });
    }

    render() {
        if (this.state.serverError !== null) {
            if (this.state.serverError === false) {
                return (
                    <div className='body'>
                        <div className='content'>
                            <MissionFilter pads={this.state.launchPads} launches={this.state.launches}/>}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className='body'>
                        <div className='content'>
                            <div className='server-error'>An error occurred. Please try again later.</div>
                            }
                        </div>
                    </div>
                );
            }

        } else {
            return null
        }
    }
}

export default Body;
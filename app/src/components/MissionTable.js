import React, {Component} from 'react';
import Mission from './Mission';

class MissionTable extends Component {

    render() {
        return (
            <div className='missionTable'>
                <div className='mission-table-count'>
                    {this.props.missionCount > 0 && `Showing ${this.props.missionCount} Missions`}
                    {this.props.missionCount < 1 && 'No Missions Found' }
                </div>
                {this.props.launches.map((launch) => {
                    return (<Mission key={launch.flight_number} {...launch}/>)
                })}
            </div>
        )

    }

}

export default MissionTable;
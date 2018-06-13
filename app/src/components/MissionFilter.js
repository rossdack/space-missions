import React, {Component} from 'react';

import MissionTable from './MissionTable';

class MissionFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            keywords: '',
            launchPad: undefined,
            minYear: undefined,
            maxYear: undefined,
            filterError: false,
            filteredLaunches: this.props.launches
        };

        this.years = [];

        this.props.launches.map((launch) => {
            return this.years.push(new Date(launch.launch_date_local).getFullYear());
        });

        // remove duplicates
        this.years = Array.from(new Set(this.years));

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, event) {
        this.setState({[name]: event.target.value});
    }

    applyFilter = (event) => {
        if (this.state.maxYear && (this.state.minYear > this.state.maxYear)) {
            this.setState({filterError: true});
        } else {
            this.setState({filterError: false});

            var that = this;
            let result = this.props.launches;

            if (that.state.keywords) {
                let filtered = result.filter((launch) => {
                    // TODO iterate over keywords

                    if (launch.rocket.rocket_name.toLowerCase().indexOf(that.state.keywords.toLowerCase()) > -1) {
                        return true;
                    } else {
                        // iterate payloads
                        let payloadIndicator = false;
                        for (let payload of launch.payloads) {
                            if (payloadIndicator === true) return true;
                            if (payload.payload_id.toLowerCase().indexOf(that.state.keywords.toLowerCase()) > -1) {
                                payloadIndicator = true;
                            }
                        }

                        return payloadIndicator;
                    }

                }, that);
                result = filtered;
            }

            if (that.state.launchPad) {
                result = result.filter((launch) => {
                    //let d = new Date(launch.launch_date_local);
                    return launch.launch_site.site_id === that.state.launchPad;
                }, that);
            }

            if (that.state.minYear) {
                result = result.filter((launch) => {
                    return new Date(launch.launch_date_local).getFullYear() >= that.state.minYear;
                }, that);
            }

            if (that.state.maxYear) {
                result = result.filter((launch) => {
                    return new Date(launch.launch_date_local).getFullYear() <= that.state.maxYear;
                }, that);
            }

            // filter launches
            this.setState({filteredLaunches: result});
        }
    };

    render() {

        // payload = mission
        var ctr = 0;
        this.state.filteredLaunches.forEach((mission) => {
            ctr += mission.payloads.length;
        });

        return (
            <React.Fragment>

                <div className='mission-filter-outer'>
                  <div className='mission-filter'>
                      <div name='keyword'>
                          <label htmlFor='keywordFilter'>Keyword</label>
                          <input name='keywordFilter' type='text' placeholder='eg Falcon'
                                 className='form-control form-control-sm'
                                 value={this.state.keywords}
                                 onChange={this.handleChange.bind(this, 'keywords')} />
                      </div>
                      <div name='launchpad'>
                          <label htmlFor='launchPadFilter'>Launch Pad</label>
                          <select value={this.state.launchPad} name='launchPadFilter' className='launchpad-select form-control form-control-sm' onChange={this.handleChange.bind(this, 'launchPad')}>
                              <option value="">Any</option>
                              {
                                    this.props.pads.map((pad) => {
                                        return <option key={pad.id} value={pad.id}>{pad.full_name}</option>;
                                    })
                              }
                          </select>
                      </div>
                      <div name='minyear' className='year-select'>
                          <label htmlFor='minYearFilter'>Min Year</label>
                          <select name='minYearFilter' className='form-control form-control-sm' onChange={this.handleChange.bind(this, 'minYear')}>
                              <option value="" >Any</option>
                              {
                                  this.years.map((year) => {
                                      return <option key={year}
                                                     value={year}>{year}</option>
                                  })
                              }
                          </select>
                      </div>
                      <div name='maxyear' className='year-select'>
                          <label htmlFor='maxYearFilter'>Max Year</label>
                          <select name='maxYearFilter' className='form-control form-control-sm' onChange={this.handleChange.bind(this, 'maxYear')}>
                              <option defaultValue='Any' value='' >Any</option>
                              {
                                  this.years.map((year) => {
                                      return <option key={year}
                                                     value={year}>{year}</option>
                                  })
                              }
                          </select>
                      </div>
                      <div name='apply'>
                          <label htmlFor='applyFilter'>&nbsp;</label>
                          <button className='form-control btn btn-sm btn-success' name='applyFilter'
                                  alt='Click to apply filters'
                                  onClick={this.applyFilter}>Apply
                          </button>
                      </div>

                  </div>

                   <div className='filter--error'>&nbsp;{this.state.filterError && 'Max Year must be the same or greater' +
                   ' than' +
                   ' Min Year'}</div>
                </div>

                <MissionTable launches={this.state.filteredLaunches} missionCount={ctr}/>

            </React.Fragment>
        );
    }
}

export default MissionFilter
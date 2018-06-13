import React, { Component } from 'react';

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            open: true
        }
    }

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        let buttonText = 'Click to ' + (this.state.open ? 'shrink' : 'expand') + ' header';
        return (

            <div className={this.state.open ? 'header--open' : 'header--hidden'}>
                <div className='header-top-text' onClick={this.handleClick}>
                    SPACE SAVVY
                </div>
                <div className='header-main-text-container'>
                    <div className='header-main-text'>Discover Space Missions</div>
                </div>
                <div className={this.state.open ? 'header-button' : 'header-button--open'} onClick={this.handleClick}
                     alt={buttonText} title={buttonText} />
            </div>
        );
    }
}
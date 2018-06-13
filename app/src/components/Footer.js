import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='footer-copyright-text'>Copyright &copy; {new Date().getFullYear()} Space Savvy</div>
                <div className='footer-link-text'><a href="#top">Back to top</a></div>
            </div>
        );
    }
}
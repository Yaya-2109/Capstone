import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

class Day extends React.Component {
  render() {
    return (
      <div className='m-4'>
        <table>
          <thead>
            <tr className='border-b border-black'>
              <th className='border-r border-black'>Times</th>
              <th>Activity/Event</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>7:00 - 8:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>8:00 - 9:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>9:00 - 10:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>11:00 - 12:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>1:00 - 2:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>2:00 - 3:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>3:00 - 4:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>5:00 - 6:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>6:00 - 7:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>7:00 - 8:00</td>
              <td></td>
            </tr>
            <tr className='border-b border-black'>
              <td className='border-r border-black'>8:00 - 9:00</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Day);

export default Day;

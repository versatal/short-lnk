import React from 'react';
import { Session } from 'meteor/session';
import { Links } from '../api/links';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: false
    }
  }
  componentDidMount() {
    console.log('componentDidMount LinksListFilters');
    this.visibilityTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    })        
  }
  componentWillUnmount() {
    console.log('componentDidUnmount LinksListfilters');
    this.visibilityTracker.stop();
  }
  
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
            Session.set('showVisible', !e.target.checked);          
          }}/>
          show hidden links
        </label>
      </div>
    )
  }
}
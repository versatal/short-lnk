import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';

class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({error: err.reason})
      } 
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }
  handleModalClose() {
    this.setState({
      url: '',
      isOpen: false,
      error: '' 
    })
  }  
  componentWillMount() {
    Modal.setAppElement('body');
  }
  render() {
    return (
      <div>
        <button className='button' onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add linkl"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error.length > 0 ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input 
              type="text" 
              placeholder="URL"
              ref="url" 
              value={this.state.url}
              onChange={this.onChange.bind(this)}              
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
            </form>
        </Modal>
      </div>
    );
  }
};

export default withRouter(AddLink);
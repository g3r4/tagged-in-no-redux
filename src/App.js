import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadFile from './components/file_reader';
import { Jumbotron } from 'react-bootstrap';
import ContactsList from './components/contacts_list';
import _ from 'lodash';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        contacts: {},
        loading: false
    }
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  addContacts = (contacts) => {
    this.setState({ contacts })
  }

  render() {
    const contactsList = this.state.loading ? <p> Loading contacts... </p>
    : <ContactsList  contacts={this.state.contacts} loading={this.state.loading} perPage={5}/>

    
    const uploadFile = _.isEmpty(this.state.contacts) ? <UploadFile addContacts={this.addContacts} startLoading={this.startLoading} stopLoading={this.stopLoading} />
    : <div />

    return (
      <div className="App">
        <header className="App-header">
          <div className="logo-title">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Tagged-in React</h1>
          </div>
        </header>
        <div className="centered">
          {uploadFile}
        </div>
        {contactsList}
      </div>
    );
  }
}

export default App;

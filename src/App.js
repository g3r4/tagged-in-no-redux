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
    : <ContactsList  contacts={this.state.contacts} loading={this.state.loading} perPage={10}/>

    
    const uploadFile = _.isEmpty(this.state.contacts) ? <UploadFile addContacts={this.addContacts} startLoading={this.startLoading} stopLoading={this.stopLoading} />
    : <div />

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div >
          <Jumbotron>
            <h1>Welcome to tagged in!</h1>
            <p>
              This application lets you upload a file with your contacts exported
              from a linked-in csv file so you can tag and organize them however you want!.
            </p>
          </Jumbotron>
          {uploadFile}
        </div>
        {contactsList}
      </div>
    );
  }
}

export default App;

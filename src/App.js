import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UploadFile from './components/file_reader';
import { Jumbotron } from 'react-bootstrap';
import ContactsList from './components/contacts_list';
import _ from 'lodash';
import TaggedInNav from './components/nav_bar';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        contacts: {},
        loading: false,
        searchterm: "",
        filteredContactsObj:{}
    }
  }

  setSearchTerm = (term) => {
    this.setState({
      searchterm: term
    })
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

    let filteredContacts = []

    if (this.state.searchterm !== ""){
      filteredContacts = _.filter(this.state.contacts, (contact) => {
           if (_.includes(contact, this.state.searchterm) ) return contact;
      })
    }

    const obj = filteredContacts.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
      debugger
    }, {}) //watch out the empty {}, which is passed as "result"

    console.log(obj);


    const contactsList = this.state.loading ? <p> Loading contacts... </p>
    : <ContactsList  contacts={this.state.contacts} loading={this.state.loading} perPage={24}/>

    
    const uploadFile = _.isEmpty(this.state.contacts) ? <UploadFile addContacts={this.addContacts} startLoading={this.startLoading} stopLoading={this.stopLoading} />
    : <div />

    return (
      <div className="App">
        <header className="App-header">
          <TaggedInNav setSearchTerm={this.setSearchTerm}/>
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

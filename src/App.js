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

    console.log(this.state.term)

    let filteredContacts = []

    if (term !== ""){
      filteredContacts = _.filter(this.state.contacts, (contact) => {
           if (_.includes(contact, term) ) return contact;
      })
    }

    const obj = filteredContacts.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {}) //watch out the empty {}, which is passed as "result"


    this.setState({
      searchterm: term,
      filteredContactsObj: obj
    })

    //console.log(obj);
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
          <ContactsList  contacts={this.state.searchterm === "" ? this.state.contacts : this.state.filteredContactsObj} loading={this.state.loading} perPage={24}/>
      </div>
    );
  }
}

export default App;

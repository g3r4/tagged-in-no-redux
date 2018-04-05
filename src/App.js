import React, { Component } from 'react';
import './App.css';
import UploadFile from './components/file_reader';
import ContactsList from './components/contacts_list';
import _ from 'lodash';
import TaggedInNav from './components/nav_bar';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        contacts: {},
        loading: false,
        searchterm: "",
        filteredContactsObj:{},
        perPage: 12
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
      result[index] = item; 
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

  setPerPage = (sliderValue) => {
    this.setState({ perPage : sliderValue})
  }

  render() {
    
    const uploadFile = _.isEmpty(this.state.contacts) ? 
      <div style={{ marginTop: 120, marginBottom: 80 }} >
        <UploadFile addContacts={this.addContacts} startLoading={this.startLoading} stopLoading={this.stopLoading} />
      </div>
    : <div />


    const results = this.state.searchterm === "" ? 
    Object.keys(this.state.contacts).length : Object.keys(this.state.filteredContactsObj).length
    
    const contacts_list = _.isEmpty(this.state.contacts) ? null : 
    <ContactsList  contacts={this.state.searchterm === "" ? this.state.contacts : this.state.filteredContactsObj} 
                  loading={this.state.loading} 
                  setPerPage={this.setPerPage} 
                  perPage={this.state.perPage}
                  results={results}/>

    return (
              <div className="App">

      <Layout>
              <TaggedInNav setSearchTerm={this.setSearchTerm} 
                          results={results}
                          contacts={this.state.contacts}/>
        <Content style={{ padding: '0 50px', marginTop: 70 }}>
            {uploadFile}
            {contacts_list}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        Tagged in ©2018 Created by Gerardo Maldonado for Bixal
      </Footer>
      </Layout>
      </div>

    );
  }
}

export default App;

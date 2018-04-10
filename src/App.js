import React, { Component } from 'react';
import './App.css';
import UploadFile from './components/file_reader';
import ContactsList from './components/contacts_list';
import _ from 'lodash';
import TaggedInNav from './components/nav_bar';
import TagsSider from './components/tags_sider';
import DemoHeroContacts from './demo/heroContacts.json'
import { Layout, message } from 'antd';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const { Content, Footer } = Layout;

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
        contacts: {},
        loading: false,
        searchterm: "",
        filteredContactsObj:{},
        perPage: 12, 
        tags: {},
        tagSearchTerm: "",
        filteredTags: {}
    }
  }

  addGlobalTag = (tag) => {
    this.setState({
      tags: {...this.state.tags, [tag] : tag }
    })
  }

  setSearchTerm = (term) => {

    let results = []
    // Changed this to for loops for perfomance gains in place of .maps and .filters
    for(let hash in this.state.contacts) {
      for(let key in this.state.contacts[hash]) {
        if( (typeof this.state.contacts[hash][key] === "string") && (this.state.contacts[hash][key].toLowerCase().indexOf(term.toLowerCase())!=-1)) {
          results[hash] = this.state.contacts[hash];
        }
      }
    }
        
    const obj = _.pick(this.state.contacts, Object.keys(results))

    this.setState({
      searchterm: term,
      filteredContactsObj: obj
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

  setPerPage = (sliderValue) => {
    this.setState({ perPage : sliderValue})
  }

  addTagtoContact = (id, tag) => {

    this.setState({
      contacts: {...this.state.contacts, [id]: {...this.state.contacts[id], tags: {...this.state.contacts[id].tags, [tag]: tag} } } 
    })

    // Update contact on filteredContacts if we have them to reflect new tags 
    if ((id in this.state.filteredContactsObj)){
      this.setState({
        filteredContactsObj: {...this.state.filteredContactsObj, [id]: this.state.contacts[id] }
      })
    }
  }

  addTagToDisplayedContacts = (tag, selectedContacts) => {


    let contactsToMapOver = selectedContacts.length === 0 ?  _.isEmpty(this.state.filteredContactsObj) ? this.state.contacts : this.state.filteredContactsObj : _.pick(this.state.contacts,selectedContacts)
     
    // _.reduce is _.map equivalence to return an object instead of an array _.filter and _.reject are _.pick and _.omit collections equivalences too
    const taggedContacts = _.reduce( contactsToMapOver,
         (result, value, key) => {
          contactsToMapOver[key] = {...contactsToMapOver[key], tags: {...contactsToMapOver[key].tags, [tag]:tag} };
          return contactsToMapOver;
        }, {});
        this.setState({
          contacts: {...this.state.contacts, ...taggedContacts},
        })

        // Update filtered contacts if we have them
        if(!_.isEmpty(this.state.filteredContactsObj)){
          this.setState({
            filteredContactsObj: {...this.state.filteredContactsObj, ...taggedContacts}
          })
        }
  }

  createDemoContacts = () =>{
    this.setState({"contacts": DemoHeroContacts,
                    "tags": {"Hero": "Hero", "Villian": "Villian", "Mutant": "Mutant", "Adamantium":"Adamantium", "Vibranium":"Vibranium"}
    })
    message.success('Hero demo contacts created successfully');
  }

  filterTags = (searchTagTerm) =>{

    const keysIncluded = Object.keys(this.state.tags).filter((value) => {
      return value.toLowerCase().includes(searchTagTerm.toLowerCase())
    })

    this.setState ({
      tagSearchTerm: searchTagTerm,
      filteredTags: _.pick(this.state.tags, keysIncluded)
    })

  }

  selectCard = (e, id) => {
    this.setState({
      contacts: {...this.state.contacts, [id] : {...this.state.contacts[id], checked: e.target.checked }}
    })
    // Update filtered contacts if we have them
    if(!_.isEmpty(this.state.filteredContactsObj)){
      this.setState({
        filteredContactsObj: {...this.state.filteredContactsObj, [id] : {...this.state.filteredContactsObj[id], checked: e.target.checked } }
      })
    }


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
                  results={results}
                  selectCard={this.selectCard}
    />

    return (
            <DragDropContextProvider backend={HTML5Backend}>

              <div className="App">

      <Layout>
        <TagsSider tags={this.state.tagSearchTerm === "" ? this.state.tags : this.state.filteredTags} 
                   addTagtoContact={this.addTagtoContact}
                   addTagToDisplayedContacts={this.addTagToDisplayedContacts}
                   filterTags={this.filterTags}
                   results={results}
                   contacts={this.state.contacts}
        />
          <Layout style={{ marginRight: 220 }}>
            <TaggedInNav setSearchTerm={this.setSearchTerm} 
                          addTag={this.addGlobalTag}
                          results={results}
                          contacts={this.state.contacts}
                          createDemoContacts={this.createDemoContacts}
            />
            <Content style={{ padding: '0 50px', marginTop: 70, minHeight: 800 }}>
              {uploadFile}
              {contacts_list}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Tagged in ©2018 Created by Gerardo Maldonado for Bixal
            </Footer>
          </Layout>
      </Layout>

      </div>
      </DragDropContextProvider>
    );
  }
}

export default App;

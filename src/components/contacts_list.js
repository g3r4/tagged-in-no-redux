import React, { Component } from 'react';
import _ from 'lodash';
import { Pagination } from 'antd';
import ContactCard from './contact_card';


export default class ContactsList extends Component{

    constructor(props){
        super(props)

        this.state = {
            data: {},
            offset: 0,
            contacts: {},
            contactsPerPage: 0,
            currentPage:1
        }
    }

    componentDidMount() {
        this.loadProfilesFromState();
    }

    componentDidUpdate(){
            if ( (this.state.contacts !== this.props.contacts) || (this.state.contactsPerPage !== this.props.perPage)){
                this.setState({
                    contacts: this.props.contacts,
                    offset: 0,
                    contactsPerPage: this.props.perPage
                }, this.loadProfilesFromState())    
            }
    }

    firstN = (obj, offset) => {
        return Object.keys(obj) //get the keys out
          .sort() //this will ensure consistent ordering of what you will get back.
          .slice(offset, offset+this.props.perPage) //get the first N to M
          .reduce(function(memo, current) { //generate a new object out of them
            memo[current] = obj[current]
            return memo;
          }, {})
      }

    loadProfilesFromState = (offset=0, page=1) => {
            this.setState({data: this.firstN(this.props.contacts, offset)})
    }

    renderCards = () => {
        return _.map(this.state.data, (contact) => {
            return (<ContactCard key={contact["Email Address"]} contact={contact} name={contact["First Name"]}/>)
        })
    }

    onShowSizeChange =(current, pageSize) => {
        this.setState({ currentPage: 1});
        this.props.setPerPage(pageSize)
      }

    handlePageClick = (page, pageSize) => {
        let selected = page-1;
        let offset = Math.ceil(selected * this.props.perPage);
        this.setState({offset: offset, currentPage: page});
        this.loadProfilesFromState(offset, page)};
      
    render(){
            const paginator = <Pagination 
                                        current = {this.state.currentPage}
                                        total={this.props.results} 
                                        onChange={this.handlePageClick} 
                                        pageSize={this.props.perPage}
                                        pageSizeOptions={['12', '24', '36', '48', '60', '72','84', '96']}
                                        showQuickJumper
                                        showSizeChanger 
                                        onShowSizeChange={this.onShowSizeChange}                                      
                                        />         
            return(
                        <div >
                            <div className="container-fluid">
                                <div className="card-decks">
                                            {this.renderCards()}
                                </div>
                            </div>             
                            {_.isEmpty(this.state.data)? <div /> : paginator}
                        </div>

            );
    }
  }
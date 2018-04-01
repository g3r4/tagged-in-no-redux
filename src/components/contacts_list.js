import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

import ContactCard from './contact_card';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, FormGroup, Input } from 'reactstrap';

  export default class ContactsList extends Component{

    constructor(props){
        super(props)

        this.state = {
            data: {},
            offset: 0,
            pageCount: 0
        }
    }

    componentDidMount() {
        this.loadProfilesFromState();
    }

    firstN = (obj, n) => {
        return Object.keys(obj) //get the keys out
          .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
          .slice(this.state.offset, this.state.offset+this.props.perPage) //get the first N
          .reduce(function(memo, current) { //generate a new object out of them
            memo[current] = obj[current]
            return memo;
          }, {})
      }

    loadProfilesFromState = () => {
            this.setState({data: this.firstN(this.props.contacts, this.props.perPage), 
                       pageCount: Math.ceil(Object.keys(this.props.contacts).length / this.props.perPage) });
      }

      handlePageClick = (event) => {
        let selected = event.selected;
        let offset = Math.ceil(selected * this.props.perPage);
    
        this.setState({offset: offset}, () => {
          this.loadProfilesFromState();
        });

      };

    renderCards = () => {
        console.log(this.state.data)
        return _.map(this.state.data, (contact) => {
            return (<ContactCard key={contact["Email Address"]} contact={contact}/>)
        })
    }

    render(){
        const paginator =         <Navbar color="dark" className="navbar-dark" fixed="bottom" expand="md">

        <Nav className="mx-auto" navbar>
        <ReactPaginate 
                            previousLabel={"<"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextLabel={">"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} 
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}/> 

        </Nav>
    </Navbar>
                                   
            return(
                <div className="contact-list">
                    <ul>
                        {this.renderCards()}
                    </ul>
                    {_.isEmpty(this.state.data)? <div /> : paginator}
                </div>
            );
    }
  }
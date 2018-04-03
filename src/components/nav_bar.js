import React from 'react';
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
  DropdownItem, FormGroup, Input, Badge, Button } from 'reactstrap';

export default class TaggedInNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  handleSearchBarChange = (event) => {
      console.log(event.target.value)
      this.props.setSearchTerm(event.target.value)
  }

  render() {
      console.log("navbar", this.props.results)
    return (
      <div>
        <Navbar color="dark" className="navbar-dark" fixed="top" expand="md">
            <NavbarBrand href="/">Tagged-in</NavbarBrand>
            <Input className="search-input" type="search" name="search" id="exampleSearch" placeholder="Search contacts" onChange={this.handleSearchBarChange}/>
            <div color="primary">
                Contacts <Badge color="primary">{this.props.results}</Badge>
            </div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>

                </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Tags
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Drupal
                  </DropdownItem>
                  <DropdownItem>
                    Javascript
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Government
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
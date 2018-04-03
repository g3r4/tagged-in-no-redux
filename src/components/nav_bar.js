import React from 'react';
import { Menu, Icon, Input, Badge } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

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
         <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
        >
            <Menu.Item key="app">
                Tagged <Icon type="linkedin" /> 
            </Menu.Item>
            <Menu.Item key="search">
            <Search
                onChange={this.handleSearchBarChange}
                style={{ width: 200 }}
                /> 
            </Menu.Item>
            <Menu.Item key="search">
                <Icon type="user" />            
                <Badge count={this.props.results} showZero overflowCount={9999} style={{ backgroundColor: '#1890ff' }}/>
            </Menu.Item>
      </Menu>
    );
  }
}
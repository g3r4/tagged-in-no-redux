import React from 'react';
import { Menu, Icon, Input, Badge, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

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
            <Header style={{ position: 'fixed', width: '100%', background:"white" , zIndex: 1000}}>

         <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="light"
            style={{ lineHeight: '64px' }}
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
      </Header>

    );
  }
}
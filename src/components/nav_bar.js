import React from 'react';
import _ from 'lodash';
import { Menu, Icon, Input, Badge, Layout,
         AutoComplete } from 'antd';

const Option = AutoComplete.Option;

const { Header } = Layout;

const Search = Input.Search;

function onSelect(value) {
    console.log('onSelect', value);
}
  
  
function searchResult(query, contacts) {

    let filtro = []
    
    if (query.length > 2){
        _.map(contacts, (contact, contactindex) => {
            Object.values(contact).filter((value, index, contactsArray) => {
                if (value.includes(query)){
                    filtro.push({ query: value,
                            name: contacts[contactindex][["First Name"]] + " " + contacts[contactindex][["Last Name"]],
                            category: contactindex+index,
                            count: 1
                    })
                }
            })
        })
    } else {
        filtro = []
    }
    return filtro;

}
  
function renderOption(item) {
    return (
      <Option key={item.category} text={item.query}>
        {item.query} <Icon type="arrow-left" /> {item.name}
      </Option>
    );
}

export default class TaggedInNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dataSource: [],
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSearchBarChange = (event) => {
      this.props.setSearchTerm(event.target.value)
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: value ? searchResult(value, this.props.contacts) : [],
    });
    this.props.setSearchTerm(value)
  }

  render() {
    const { dataSource } = this.state;

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

            <Menu.Item key="results">
                <Icon type="user" />            
                <Badge count={this.props.results} showZero overflowCount={9999} style={{ backgroundColor: '#1890ff' }}/>
            </Menu.Item>

            <Menu.Item key="autocomplete">
            <div className="global-search-wrapper" style={{ width: 300 }}>
                <AutoComplete
                className="global-search"
                style={{ width: '100%' }}
                dataSource={dataSource.map(renderOption)}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
                optionLabelProp="text"
                >
                <Input
                    suffix={(
                        <Icon type="search" />
                    )}
                />
                </AutoComplete>
            </div>
            </Menu.Item>


      </Menu>
      </Header>

    );
  }
}
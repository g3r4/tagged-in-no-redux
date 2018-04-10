import React from 'react';
import _ from 'lodash';
import heroDemoIcon from'../demo/wolverine.png';
import { Menu, Icon, Input, Badge, Layout,
         AutoComplete, Button } from 'antd';

const Option = AutoComplete.Option;

const { Header } = Layout;

const Search = Input.Search;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function onSelect(value) {
}
  
  
function searchResult(query, contacts) {

    let filtro = []
    if (query.length > 2){
        _.map(contacts, (contact, contactindex) => {
            Object.values(contact).filter((value, index, contactsArray) => {
                console.log(value)
                if (typeof value === "string"){
                    if ( value.includes(query)){
                        filtro.push({ query: value,
                                name: contacts[contactindex][["First Name"]] + " " + contacts[contactindex][["Last Name"]],
                                category: contactindex+index,
                                count: 1
                        })
                    }
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
        {item.query}
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
      tagInputValue: ''
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSearch = (value) => {
    this.props.setSearchTerm(value)
  }

  emitEmpty = () => {
    this.tagInput.focus();
    this.setState({ tagInputValue: '' });
  }
  
  onChangeTag = (e) => {
    this.setState({ tagInputValue: e.target.value });
  }

  handleEnterAddTag = (e) => {
    this.props.addTag(e.target.value)
    this.tagInput.focus();
    this.setState({ tagInputValue: '' });
  }

  render() {
    const { dataSource, tagInputValue } = this.state;
    const suffix = tagInputValue ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;


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

            <Menu.Item key="search-autocomplete">
                <div className="global-search-wrapper" style={{ width: 200 }}>
                    <AutoComplete
                    className="global-search"
                    style={{ width: 200 }}
                    onSearch={this.handleSearch}
                    placeholder="Search contacts"
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

            <Menu.Item key="results">
                <Icon type="user" />            
                <Badge count={this.props.results} showZero overflowCount={9999} style={{ backgroundColor: '#1890ff' }}/>
            </Menu.Item>

            <Menu.Item key="create-tag">
                <Input
                    placeholder="Add a new tag"
                    //prefix={suffix}
                    suffix={<Icon type="tag" />}
                    value={tagInputValue}
                    onChange={this.onChangeTag}
                    onPressEnter={this.handleEnterAddTag}
                    ref={node => this.tagInput = node}
                />
            </Menu.Item>

            <Menu.Item key="hero-demo-button" style={{float:"right"}}>
                <Button onClick={this.props.createDemoContacts} 
                        shape='circle'
                        className='wolverine-demo-button'
                >
                    <img  src={heroDemoIcon} style={{}} alt="Hero Demo"/>
                </Button>
            </Menu.Item>

      </Menu>
      </Header>

    );
  }
}
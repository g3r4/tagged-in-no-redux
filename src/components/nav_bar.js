import React from 'react';
import _ from 'lodash';
import { Menu, Icon, Input, Badge, Layout,
         AutoComplete, Button } from 'antd';
import TagBucket from './tag_bucket';

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
      tagInputValue: '',
      tagButtonBuckets: []
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

  emitEmpty = () => {
    this.tagInput.focus();
    this.setState({ tagInputValue: '' });
  }
  onChangeTag = (e) => {
    this.setState({ tagInputValue: e.target.value });
  }

  addTagButtonBucket = (e) => {
    this.setState({ 
        tagButtonBuckets: [...this.state.tagButtonBuckets, <TagBucket name={ e.target.value}/> ]
    })
    this.tagInput.focus();
    this.setState({ tagInputValue: '' });
  }

  renderTagBuckets = () => {
      return this.state.tagButtonBuckets.map( (TagButton) => {
        return( <Menu.Item key={TagButton.props.name}>
                    {TagButton}
                </Menu.Item>
      )
    })
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
                    dataSource={dataSource.map(renderOption)}
                    onSelect={onSelect}
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

            <Menu.Item key="tags">
                <Input
                    placeholder="Add a new tag"
                    //prefix={suffix}
                    suffix={<Icon type="tag" />}
                    value={tagInputValue}
                    onChange={this.onChangeTag}
                    onPressEnter={this.addTagButtonBucket}
                    ref={node => this.tagInput = node}
                />
            </Menu.Item>

            {this.renderTagBuckets()}
      </Menu>
      </Header>

    );
  }
}
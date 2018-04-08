
import React, {Component} from 'react';
import _ from 'lodash';
import { Layout, Menu, Icon, Input, Button, Switch } from 'antd';
import TagButton from './tag_button';

const { Header, Content, Footer, Sider } = Layout;

export default class TagsSider extends Component{

    renderTagButtons = () => {
        return _.map(this.props.tags, (tag, index) => {
          return( <Menu.Item key={index} style={{ display: "-webkit-inline-box"}}>
                        <TagButton name={ tag } addTagtoContact={this.props.addTagtoContact}/>
                        <Switch size="small" 
                            style={{ marginLeft: 10, marginRight: 10, }}
                        />
                  </Menu.Item>
            )
        })
    }

    render(){
        return(<Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', right: 0, top: 65, background: '#FFF' }}
                      width={250}>
        <div className="logo" />
        <Menu theme="light" mode="inline" selectable={false}>
            <Menu.Item key="filter-tags">
                <Input
                    placeholder="Filter your tags"
                    suffix={<Icon type="tags" />}
                    disabled={this.props.tags.length === 0 ? true: false}
                />
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="remove-tags">
                <Button type="danger" 
                        icon="close-circle-o"
                        style={{ width: '-webkit-fill-available' }}
                        disabled={this.props.tags.length === 0 ? true: false}
                >
                    Delete tags list
                </Button>
            </Menu.Item>
            <Menu.Item key="clear-tag-filters">
                <Button type="dashed"
                        style={{ width: '-webkit-fill-available' }}
                        disabled={this.props.tags.length === 0 ? true: false}
                >
                    Clear tag filters
                </Button>
            </Menu.Item>

            <Menu.Divider />

            {this.renderTagButtons()}

        </Menu>
    </Sider>)
    }
}
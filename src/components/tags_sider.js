
import React, {Component} from 'react';
import { Layout, Menu, Icon, Input, Button } from 'antd';
import TagButton from './tag_button';

const { Header, Content, Footer, Sider } = Layout;

export default class TagsSider extends Component{

    renderTagButtons = () => {
        return this.props.tags.map( (tag, index) => {
          return( <Menu.Item key={index}>
                      <TagButton name={ tag } />
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
                />
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="remove-tags">
                <Button type="danger" 
                        icon="close-circle-o"
                        style={{ width: '-webkit-fill-available' }}
                >
                    Delete tags list
                </Button>
            </Menu.Item>
            <Menu.Item key="clear-tag-filters">
                <Button type="dashed"
                        style={{ width: '-webkit-fill-available' }}
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
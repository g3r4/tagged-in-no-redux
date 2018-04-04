import React, { Component } from 'react';
import md5 from 'md5';

import { Card, Icon, Avatar } from 'antd';
import { height } from 'window-size';
const { Meta } = Card;
    

  export default class ContactCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            addnote: false
        }
    }

    addNote = () => {
        console.log("adding note");
        this.setState({
            addnote: true
        })
        
    }

    render(){
        const cardDescription = <div>
                                    <div style={{ fontWeight: 700, marginBottom: 10 }}>
                                        {this.props.contact["Company"]}
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        {this.props.contact["Position"]}
                                    </div>
                                    <div style={{ fontStyle: "italic" }}>
                                        {this.props.contact["Email Address"]}
                                    </div>
                                </div>

        const gravatarImageURL = `http://www.gravatar.com/avatar/${md5(this.props.contact["Email Address"])}?s=100&d=identicon`
        const mailto = `mailto:${this.props.contact["Email Address"]}`
        return(
                <Card
                    hoverable
                    style={{ width: 350, margin: 15, height: "min-content" }}
                    actions={[
                        <Icon type="edit" />, 
                        <a class="mailto" href={mailto}><Icon type="mail"/> </a>, 
                        <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src={gravatarImageURL} />}
                    title={this.props.contact["First Name"] + " " + this.props.contact["Last Name"]}
                    description={cardDescription}
                    />
                </Card>            
        );
    }
}
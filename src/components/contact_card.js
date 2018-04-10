import React, { Component } from 'react';
import _ from 'lodash';
import md5 from 'md5';

import { Card, Icon, Avatar, Tag, Checkbox, message } from 'antd';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

const { Meta } = Card;

message.config({
    top: 50,
    duration: 2,
  });

/**
 * Implements the drop source contract.
 */
const cardTarget = {
    drop(props , monitor) {
        //console.log(monitor.getItem())
        return { name: props.name,
                 id: props.contact["Email Address"]
                }
    }
}
  
/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      //isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      lastDroppedItem: monitor.getItem()
      //itemType: monitor.getItemType()
    };
  }


class ContactCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            addnote: false,
        }
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        lastDroppedItem: PropTypes.object,
	}

    addNote = () => {
        console.log("adding note");
        this.setState({
            addnote: true
        })
    }

    renderTags = () => {
        //if (this.props.contact.tags !== undefined){
        return _.map(this.props.contact.tags, (tag) => {
            return( <Tag key={tag}
                         closable
                         style={{ marginTop:10 }}
                    >
                        {tag}
                    </Tag>
            )
            })
        //}
    }

    render(){
        const { canDrop, isOver, connectDropTarget, name, lastDroppedItem, id } = this.props
        const isActive = canDrop && isOver

        if(isActive){
            console.log(JSON.stringify(lastDroppedItem))
        }
        

        const cardDescription = <div>
                                    <div style={{ float: 'right' }}>
                                        <Checkbox onChange={(e) => { this.props.selectCard(e, this.props.contact["Email Address"])}}
                                                  checked={this.props.contact.checked}
                                        />
                                    </div>
                                    <div style={{ fontWeight: 700, marginBottom: 10 }}>
                                        {this.props.contact["Company"]}
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        {this.props.contact["Position"]}
                                    </div>
                                    <div style={{ fontStyle: "italic" }}>
                                        {this.props.contact["Email Address"]}
                                    </div>
                                    <div>
                                        {this.renderTags()}
                                    </div>
                                </div>
        
        // If contact is hero (email ending in demo), get his/her image as avatar from superherodb, if not, gravatar it
        const avatarImageURL = this.props.contact["Email Address"].includes(".demo") ?
                                `https://www.superherodb.com/pictures/portraits/${this.props.contact["Position"].replace(/\s/g, '-').toLowerCase()}.jpg` :
                                `http://www.gravatar.com/avatar/${md5(this.props.contact["Email Address"])}?s=100&d=identicon`

        const mailto = `mailto:${this.props.contact["Email Address"]}`
        return connectDropTarget(
            <div //style={{ opacity: canDrop ? 0.2 : 1 }}
            >
                <Card
                    hoverable
                    style={{ width: 315, 
                            margin: 5, 
                            height: "min-content", 
                            border: canDrop ? '1px dashed #188fff' : ''}}
                    actions={[
                        <Icon type="edit" />, 
                        <a className="mailto" href={mailto}><Icon type="mail"/> </a>, 
                        <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src={avatarImageURL} />}
                    title={`${this.props.contact["Name"]}`}
                    description={cardDescription}
                    />
                </Card>
            </div>            
        );
    }
}

// Export the wrapped component:
export default DropTarget("CARD", cardTarget, collect)(ContactCard);
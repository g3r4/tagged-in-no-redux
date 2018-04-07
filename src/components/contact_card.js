import React, { Component } from 'react';
import md5 from 'md5';

import { Card, Icon, Avatar, Tag, message } from 'antd';
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
            tags: []
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
        if (this.props.contact.tags !== undefined){
        return this.props.contact.tags.map( (tag) => {
            return( <Tag key={tag}
                         closable

                    >
                        {tag}
                    </Tag>
            )
            })
        }
    }

//     componentDidUpdate(){
//         //Fix this thing
//         const { isDragging, connectDragSource, name, bucketTag } = this.props;
//         if(bucketTag !== null){
//             if (name === this.props.contact["First Name"]){
//                 this.addTag(bucketTag.name)
//             }
//         }
// }

    render(){
        const { canDrop, isOver, connectDropTarget, name, lastDroppedItem, id } = this.props
        const isActive = canDrop && isOver

        if(isActive){
            console.log(JSON.stringify(lastDroppedItem))
        }
        

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
                                    <div>
                                        {this.renderTags()}
                                    </div>
                                </div>

        const gravatarImageURL = `http://www.gravatar.com/avatar/${md5(this.props.contact["Email Address"])}?s=100&d=identicon`
        const mailto = `mailto:${this.props.contact["Email Address"]}`
        return connectDropTarget(
            <div //style={{ opacity: canDrop ? 0.2 : 1 }}
            >
                <Card
                    hoverable
                    style={{ width: 350, 
                            margin: 10, 
                            height: "min-content", 
                            border: canDrop ? '1px dashed #188fff' : ''}}
                    actions={[
                        <Icon type="edit" />, 
                        <a className="mailto" href={mailto}><Icon type="mail"/> </a>, 
                        <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src={gravatarImageURL} />}
                    title={this.props.contact["First Name"] + " " + this.props.contact["Last Name"]}
                    description={cardDescription}
                    />
                </Card>
            </div>            
        );
    }
}

// Export the wrapped component:
export default DropTarget("CARD", cardTarget, collect)(ContactCard);
import React, { Component } from 'react';
import md5 from 'md5';

import { Card, Icon, Avatar, Tag, message } from 'antd';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

const { Meta } = Card;

message.config({
    top: 50,
    duration: 2,
  });

/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
      return {
        name: props.name,
        };
    },

    endDrag(props, monitor) {
		const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        
        const tagSuccess = () => {
            message.success(`${item.name} tagged with ${dropResult.name}!`);
          };

		if (dropResult) {
            tagSuccess()
        }
	},
  };
  
  /**
   * Specifies the props to inject into your component.
   */
  function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
      bucketTag: monitor.getDropResult()
    };
  }
  
  const propTypes = {
    name: PropTypes.string.isRequired,
    bucketTag: PropTypes.string.isRequired,
    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };


class ContactCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            addnote: false,
            tags: []
        }
    }

    addNote = () => {
        console.log("adding note");
        this.setState({
            addnote: true
        })
    }

    addTag = (tag) =>{
        console.log("adding tag", tag);
        if (!this.state.tags.includes(tag)){
            this.setState({
                tags: [...this.state.tags, tag]
            })
        }
    }

    renderTags = () => {
        return this.state.tags.map( (tag) => {
            return( <Tag key={tag}
                         closable

                    >
                        {tag}
                    </Tag>
          )
        })
    }

    componentDidUpdate(){
        // Fix this thing
        const { isDragging, connectDragSource, name, bucketTag } = this.props;
        if(bucketTag !== null){
            if (name === this.props.contact["First Name"]){
                this.addTag(bucketTag.name)
            }
        }
}

    render(){
        const { isDragging, connectDragSource, name, bucketTag } = this.props;
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
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.2 : 1 }}>
                <Card
                    hoverable
                    style={{ width: 350, margin: 10, height: "min-content"}}
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

Card.propTypes = propTypes;

// Export the wrapped component:
export default DragSource("CARD", cardSource, collect)(ContactCard);
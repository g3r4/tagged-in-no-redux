import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { Button, Switch, Popconfirm, message } from 'antd';

const style = {
	width: 'auto',
}

const tagSource = {
    beginDrag(props) {
      return {
        name: props.name,
        };
    },

    endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
      props.addTagtoContact(dropResult.id, item.name)
			//alert(`You dropped ${item.name} into ${dropResult.id}!`) // eslint-disable-line no-alert
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

class TagButton extends Component{

  constructor(props){
      super(props)
  }

  confirm = () =>{
    message.success(`Tag ${this.props.name} added to ${this.props.results} contacts`);
    this.props.addTagToDisplayedContacts(this.props.name);
  }

	render() {
        const { isDragging, connectDragSource, name, bucketTag } = this.props;

		return connectDragSource(
			<div >
      <Popconfirm placement="left" 
                  title={`Apply this tag to these ${this.props.results} contacts?`}
                  onConfirm={this.confirm} 
                  okText="Yes" 
                  cancelText="No"
      >
                <Button icon="tag-o"
                        style={{ ...style, width: 170 }}
                        loading={false}> 
                    		{name} 
                </Button>
      </Popconfirm>
			</div>
		)
	}
}

// Export the wrapped component:
export default DragSource("CARD", tagSource, collect)(TagButton);
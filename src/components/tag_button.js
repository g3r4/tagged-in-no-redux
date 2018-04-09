import React, { Component } from 'react'
import _ from 'lodash';
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

  confirm = (selectedContacts) =>{
    message.success(`Tag ${this.props.name} added to ${selectedContacts.length === 0 ? this.props.results : selectedContacts.length} contacts`);
    this.props.addTagToDisplayedContacts(this.props.name, selectedContacts);
  }

  selectedContacts = () => {
    const checked = _.filter(this.props.contacts, (contact) =>{
      if ("checked" in contact){
        if (contact["checked"] === true){
          return contact["Email Address"]
        }
      }
    })

    // console.log(checked)

    return _.map(checked, (check) => {
      return check["Email Address"]
    })
  }

	render() {
        const { isDragging, connectDragSource, name, bucketTag } = this.props;
        const selectedContacts = this.selectedContacts()

		return connectDragSource(
			<div >
      <Popconfirm placement="left" 
                  title={`Apply this tag to these ${selectedContacts.length === 0 ? this.props.results : selectedContacts.length} contacts ?`}
                  onConfirm={() => {this.confirm(selectedContacts)}} 
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
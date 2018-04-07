import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { Button, Switch } from 'antd';

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
			alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
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

	render() {
        const { isDragging, connectDragSource, name, bucketTag } = this.props;

		return connectDragSource(
			<div >
                <Button icon="tag-o"
                        style={{ ...style, width: 170 }}
                        loading={false}> 
                    		{name} 
                </Button>
			</div>
		)
	}
}

// Export the wrapped component:
export default DragSource("CARD", tagSource, collect)(TagButton);
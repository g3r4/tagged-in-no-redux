import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { Button } from 'antd';

const style = {
	width: 'auto',
}

const boxTarget = {
	drop(props) {
		return { name: props.name }
    },
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
      //itemType: monitor.getItemType()
    };
  }


class TagBucket extends Component {
	static propTypes = {
        name: PropTypes.string.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

	render() {
		const { canDrop, isOver, connectDropTarget, name } = this.props
		const isActive = canDrop && isOver

		// let backgroundColor = '#222'
		// if (isActive) {
		// 	backgroundColor = 'darkgreen'
		// } else if (canDrop) {
		// 	backgroundColor = 'darkkhaki'
		// }

		return connectDropTarget(
			<div >
                <Button icon="tag-o"
                        style={{ ...style }}
                        loading={canDrop ? true : false}> 
                    {name} 
                </Button>
				
			</div>,
		)
	}
}

// Export the wrapped component:
export default DropTarget("CARD", boxTarget, collect)(TagBucket);

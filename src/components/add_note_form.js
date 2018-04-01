import React, {Component} from 'react';

import {
    FormControl,
    FormGroup, 
    ControlLabel,
    HelpBlock
  } from 'react-bootstrap';

export default class NoteForm extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      );
    }
  }
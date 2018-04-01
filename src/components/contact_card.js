import React, { Component } from 'react';
import NoteForm from './add_note_form';

import { Card, CardText, CardBody,
    CardTitle, Button, CardHeader } from 'reactstrap';
    

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
        let addNoteTextField = <NoteForm />
        return(
            <div>
                <Card>
                    <CardHeader tag="h3">{this.props.contact["First Name"]} {this.props.contact["Last Name"]}</CardHeader>
                    <CardBody>
                    <CardTitle>{this.props.contact["Position"]}</CardTitle>
                    <CardText>{this.props.contact["Email Address"]}</CardText>
                        <Button onClick={this.addNote}>Add Note </Button>
                        {this.state.addnote ? addNoteTextField : <div />}
                    </CardBody>
                </Card>
            </div>
        );
    }
}
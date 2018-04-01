import React, { Component } from 'react';
import NoteForm from './add_note_form';
import md5 from 'md5';

import { Card, CardText, CardBody, CardImg, CardSubtitle,
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
        const gravatarImageURL = `http://www.gravatar.com/avatar/${md5(this.props.contact["Email Address"])}?s=100`
        return(
            <div>
                <Card>
                    <CardHeader tag="h3">
                        <CardImg  src={gravatarImageURL} alt="Card image cap" />
                        {this.props.contact["First Name"]} {this.props.contact["Last Name"]}
                    </CardHeader>
                    <CardBody>
                    <CardTitle>{this.props.contact["Company"]}</CardTitle>
                    <CardSubtitle>{this.props.contact["Position"]}</CardSubtitle>
                    <CardText>{this.props.contact["Email Address"]}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
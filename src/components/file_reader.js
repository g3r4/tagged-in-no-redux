import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';

import {
    Button
  } from 'react-bootstrap';

import converter from 'csvtojson';

export default class UploadFile extends Component{

    handleFiles = files => {
        const contacts = {};

        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.props.startLoading();
            converter().fromString(event.target.result)
                .on('json',(jsonObj)=> { 
                    contacts[jsonObj["Email Address"]] = jsonObj;
                })
                .on('done',()=> {
                    this.props.addContacts(contacts)
                    this.props.stopLoading();
                })
        };

        reader.readAsText(file);
    }
        
    render(){ 
        return(
            <div>
                <ReactFileReader fileTypes={[".csv"]} multipleFiles={false} base64={false} handleFiles={this.handleFiles}>
                    <Button bsStyle="primary" bsSize="large">Upload CSV file</Button>
                </ReactFileReader>
            </div>
        );
    }
}



import React, { Component } from 'react';

import converter from 'csvtojson';

import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

export default class UploadFile extends Component{


    handleFiles = files => {
        console.log(files)
        const contacts = {};

        const file = files["file"];
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

        reader.readAsText(file.originFileObj);
    }
        
    render(){ 

        const props = {
            name: 'file',
            multiple: false,
            accept: '.csv',
          };

        return(
            <div>

                <Dragger {...props} onChange={ (info, fileList, status) => {this.handleFiles(info, status)} }>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                </Dragger>

            </div>
        );
    }
}



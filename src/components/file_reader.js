import React, { Component } from 'react';
import converter from 'csvtojson';
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

const loadingContacts = () => {
    const hide = message.loading('Loading contacts..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

export default class UploadFile extends Component{


    handleFiles = files => {
        const status = files.file.status;
        if (status !== 'uploading') {
            loadingContacts()
        }

        const contacts = {};
        const file = files["file"];
        const reader = new FileReader();
        reader.onload = (event) => {
            //this.props.startLoading();
            converter().fromString(event.target.result)
                .on('json',(jsonObj)=> { 
                    jsonObj["Name"] = `${jsonObj["First Name"]} ${jsonObj["Last Name"]}`
                    delete jsonObj["First Name"]
                    delete jsonObj["Last Name"]
                    contacts[jsonObj["Email Address"]] = jsonObj;
                })
                .on('done',()=> {
                    this.props.addContacts(contacts)
              //      this.props.stopLoading();
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



import React from "react";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import styles from "./dropzoneS.module.scss";

export default function DropzoneS(props) {


  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    props.onChange(files[0])
  }


  return (
    <React.Fragment>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        onSubmit={handleSubmit}
        multiple={false}
        accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        canCancel={false}
        inputContent={(files, extra) => (extra.reject ? '.doc and .docx only' : 'Drop Files or Click Supported Formats: .doc, .docx')}
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green', backgroundColor: "#9de371" },
          dropzoneReject: { borderColor: 'red', backgroundColor: "#ff8989" },
        }}
        classNames={{ dropzone: styles.dropzone, preview: styles.preview, inputLabel: styles.inputLabel, submitButtonContainer: styles.submitButtonContainer }}
      />
    </React.Fragment>
  )
}

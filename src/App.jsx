import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import * as fflate from "fflate";
import DropzoneS from './DropzoneS';

const passwordRegex = /<w:documentProtection w:.*="\/>/gm;

const downloadBlob = function(data, fileName, mimeType) {
  var blob, url;
  blob = new Blob([data], {
    type: mimeType
  });
  url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(function() {
    return window.URL.revokeObjectURL(url);
  }, 1000);
};

const downloadURL = function(data, fileName) {
  let a;
  a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = 'display: none';
  a.click();
  a.remove();
};

const convertOnServer = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return fetch("https://api.realmayus.xyz/docToDocx", {
    method: 'POST',
    body: formData
  }).then(response => response.blob(), err => Promise.reject(err))

}

function App() {

  const startRemovePassword = (file) => {
    const settingsPath = "word/settings.xml";
    const fr = new FileReader();
    console.log(file.meta.type);
    if(file.meta.type === "application/msword") {
        // Password gets lost on encryption anyways, so we don't have to decrypt it again.
        convertOnServer(file.file).then(res => {
            downloadBlob(res, "output.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        }, err => alert(String(err)))
    } else {
      fr.readAsArrayBuffer(file.file);
      fr.addEventListener('load', (e) => {
        const uint8 = new Uint8Array(e.target.result);
        let unzipped = fflate.unzipSync(uint8);
        let settingsData = unzipped[settingsPath];
        let string = new TextDecoder("utf-8").decode(settingsData)
        console.log(string);
        string = string.replace(passwordRegex, "");
        console.log(string);
        let reEncoded = new TextEncoder().encode(string);
        let newO = {}
        newO[settingsPath] = reEncoded;
        console.log(newO);
        const newZip = fflate.zipSync(unzipped);
        console.log(newZip);
        downloadBlob(newZip, "output.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      });
    }

  }

  return (
    <div className={styles.app}>
      <h1>WordCracker</h1>
      <p>A simple tool for removing the password write protection of word files.</p>
      <div className={styles.dropzoneWrapper}>
        <DropzoneS onChange={startRemovePassword}/>
      </div>
      <small>.docx files get decrypted on your machine (no upload), .doc files get uploaded to a server for conversion. These files get deleted as soon as possible.</small>
      <small>The conversion can cause differences between your uploaded file and the result. There is no guarantee for the content/formatting to stay the same.</small>
    </div>
  );
}

export default App;

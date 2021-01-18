# WordCracker

A simple tool for removing the password write protection of word files.

WordCracker is compatible with .doc and .docx files.

**Important: This project was made for educational purposes only. The outputs are provided without any guarantee of validity.**

## How it works
When you choose a .doc file, it gets uploaded to a server running [docToDocs-server](https://github.com/realmayus/docToDocx-server), a server that wraps around LibreOffice in order to convert it to a .docx file.

If you choose a .docx file (which essentially is a zip archive with a fancy extension), it gets unzipped on your machine and an XML tag that looks like this gets deleted from `word/settings.xml`: `<w:documentProtection />`. The files then get rezipped again and your browser saves the zip archive as a .docx file.


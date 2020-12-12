const fs = require('fs')

try {
    exports.readDocuments = readDocuments;

    function readDocuments() {
        const data = fs.readFileSync('input.txt', 'utf8');

        let unprocessedDocuments = [];
        let documentLines = [];
        for (const line of data.split('\r\n')) {
            if (line) {
                documentLines.push(line);
            } else {
                unprocessedDocuments.push([...documentLines]);
                documentLines = [];
            }
        }
        unprocessedDocuments.push([...documentLines]);

        let documents = [];
        for (const unprocessedDocument of unprocessedDocuments) {
            let document = {};
            for (const unprocessedDocumentPart of unprocessedDocument) {
                for (const keyValuePair of unprocessedDocumentPart.split(' ')) {
                    let key, value;
                    [key, value] = keyValuePair.split(':');
                    document[key] = value;
                }
            }
            documents.push(document);
        }
        return documents;
    }
} catch (err) {
    console.error(err);
}
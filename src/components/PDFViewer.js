// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// Set the workerSrc for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SimplePDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const smallBase64PDF = "JVBERi0xLjUKJdDUxdgKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSCi9SZXNvdXJjZXMgPDwKPj4KPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzIFszIDAgUl0KPj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKNCAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFIvT3V0cHV0SW50ZW50cyAoQ3JlYXRlZCBieSBwZGZqcyAwLjEuMCkKPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDEzPj4Kc3RyZWFtCkJUClJleGVjdXRlIFByb2dyYW0gVG8gU2VlIFBhcGVzCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDYK";
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={`data:application/pdf;base64,${smallBase64PDF}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous Page
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SimplePDFViewer;

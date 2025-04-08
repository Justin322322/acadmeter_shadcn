/**
 * Print Service
 *
 * A modern approach to handling printing in React applications.
 * This service uses an iframe for printing content without opening a new tab
 * and without manipulating the current DOM.
 */

/**
 * Print content using an iframe
 * @param content HTML content to print
 * @param styles CSS styles to apply to the printed content
 * @param title Title of the print document
 */
export function printContent(content: string, styles: string, title: string = 'Print'): void {
  // Create a hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';

  // Add the iframe to the page
  document.body.appendChild(iframe);

  // Create the document content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="format-detection" content="telephone=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="print-color-adjust" content="exact">
        <style>
          ${styles}
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          * {
            transform: none !important;
            -webkit-transform: none !important;
            -ms-transform: none !important;
          }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onbeforeprint = function() {
            document.body.style.width = '210mm';
            document.body.style.height = '297mm';
          };
          window.onafterprint = function() {
            document.body.style.width = '210mm';
            document.body.style.height = '297mm';
          };
        </script>
      </body>
    </html>
  `;

  // Write the content to the iframe
  const iframeDocument = iframe.contentWindow?.document;
  if (!iframeDocument) {
    console.error('Failed to access iframe document');
    document.body.removeChild(iframe);
    return;
  }

  iframeDocument.open();
  iframeDocument.write(htmlContent);
  iframeDocument.close();

  // Wait for content to load then print
  iframe.onload = () => {
    try {
      // Give the browser a moment to properly render the content
      setTimeout(() => {
        if (iframe.contentWindow) {
          // Set fixed dimensions before printing
          const doc = iframe.contentWindow.document;
          doc.documentElement.style.width = '210mm';
          doc.documentElement.style.height = '297mm';
          doc.body.style.width = '210mm';
          doc.body.style.height = '297mm';

          // Focus and print
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }

        // Remove the iframe after printing (or after a timeout)
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error('Printing failed:', error);
      document.body.removeChild(iframe);
    }
  };
}

/**
 * Print an element by its reference
 * @param elementRef React ref to the element to print
 * @param title Title of the print document
 */
export function printElement(elementRef: React.RefObject<HTMLElement>, title: string = 'Print'): void {
  if (!elementRef.current) {
    console.error('Element reference is null');
    return;
  }

  // Get the content and styles
  const content = elementRef.current.innerHTML;
  let styles = '';

  // Get inline styles from the element first
  const inlineStyle = elementRef.current.querySelector('style');
  if (inlineStyle) {
    styles += inlineStyle.innerHTML;
  }

  // Add critical styles for printing
  styles += `
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background: white;
    }
    @media print {
      body { margin: 0; padding: 0; }
    }
  `;

  // Print the content
  printContent(content, styles, title);
}

import QRCode from "qrcode";

export const generateInvoice = async (request: any) => {
  const qrText = `Invoice for ${request["Customer-Name"]} - ${new Date().toLocaleDateString()}`;
  const qrCodeDataUrl = await QRCode.toDataURL(qrText);

  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html lang="en">
    <head>
      <!-- [styles remain unchanged] -->
    </head>
    <body>
      <div class="container">
        <h1>Invoice</h1>
        <h2>Order Details</h2>

        <div class="details-grid">
          <div class="box">
            <!-- [Customer info remains unchanged] -->
          </div>
          <div class="box">
            <!-- [Order info remains unchanged] -->
          </div>
        </div>

        <div class="summary">
          <p><strong>Product Name:</strong> ${request["Product-Name"]}</p>
          <p><strong>Description:</strong> ${request.Description || "N/A"}</p>
          <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <p><strong>Scan QR to verify invoice:</strong></p>
          <img src="${qrCodeDataUrl}" alt="QR Code" width="150" height="150" />
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <a class="btn-print" href="javascript:window.print()">
            <!-- [Print button SVG and label remain unchanged] -->
          </a>
        </div>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `);

  invoiceWindow.document.close();
};

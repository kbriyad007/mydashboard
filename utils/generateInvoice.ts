export const generateInvoice = (request: any) => {
  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1, h2 { color: #333; }
          .invoice-content { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <div class="invoice-content">
          <p><strong>Customer:</strong> ${request["Customer-Name"]}</p>
          <p><strong>Email:</strong> ${request["User-Email"]}</p>
          <p><strong>Phone:</strong> ${request["Phone-Number"] || "N/A"}</p>
          <p><strong>Courier:</strong> ${request.Courier || "N/A"}</p>
          <p><strong>Quantity:</strong> ${request.Quantity}</p>
          <p><strong>Address:</strong> ${request.Address}</p>
          <p><strong>Description:</strong> ${request.Description}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
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

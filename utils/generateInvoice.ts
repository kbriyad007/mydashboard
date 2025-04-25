export const generateInvoice = (request: any) => {
  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f4f7fc;
          }
          .container {
            width: 80%;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 32px;
            color: #2c3e50;
            text-align: center;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 24px;
            color: #16a085;
            text-align: center;
            margin-bottom: 30px;
          }
          .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
          }
          .invoice-details div {
            padding: 10px;
            background-color: #f9fafb;
            border-radius: 6px;
          }
          .invoice-details p {
            margin: 5px 0;
            font-size: 16px;
          }
          .invoice-summary {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #f1f1f1;
          }
          .invoice-summary p {
            font-size: 16px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
          }
          .btn-print {
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #27ae60;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
          }
          .btn-print:hover {
            background-color: #2ecc71;
          }
          @media print {
            .btn-print {
              display: none;
            }
            body {
              background-color: white;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice</h1>
          <h2>Order Details</h2>
          <div class="invoice-details">
            <div>
              <p><strong>Customer:</strong> ${request["Customer-Name"]}</p>
              <p><strong>Email:</strong> ${request["User-Email"]}</p>
              <p><strong>Phone:</strong> ${request["Phone-Number"] || "N/A"}</p>
            </div>
            <div>
              <p><strong>Courier:</strong> ${request.Courier || "N/A"}</p>
              <p><strong>Quantity:</strong> ${request.Quantity}</p>
              <p><strong>Address:</strong> ${request.Address}</p>
            </div>
          </div>
          <div class="invoice-summary">
            <p><strong>Description:</strong> ${request.Description}</p>
            <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
            <a class="btn-print" href="javascript:window.print()">Print Invoice</a>
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

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
          /* General reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
          }
          .container {
            width: 70%;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 38px;
            color: #2c3e50;
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 24px;
            color: #34495e;
            text-align: center;
            margin-bottom: 20px;
            font-weight: normal;
          }
          .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
          }
          .invoice-details div {
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }
          .invoice-details p {
            font-size: 16px;
            line-height: 1.5;
            color: #7f8c8d;
            margin-bottom: 8px;
          }
          .invoice-summary {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #ecf0f1;
          }
          .invoice-summary p {
            font-size: 18px;
            line-height: 1.6;
            color: #7f8c8d;
            margin-bottom: 12px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #bdc3c7;
            font-size: 14px;
          }
          .btn-print {
            display: inline-block;
            margin: 30px auto;
            padding: 12px 25px;
            background-color: #27ae60;
            color: white;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .btn-print:hover {
            background-color: #2ecc71;
            transform: scale(1.05);
          }
          @media print {
            .btn-print {
              display: none;
            }
            body {
              background-color: white;
            }
            .container {
              width: 100%;
              margin: 0;
              padding: 20px;
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

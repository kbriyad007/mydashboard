export const generateInvoice = (request: any) => {
  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/lucide-static@latest/font/lucide.css" rel="stylesheet">
        <style>
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
            border-radius: 12px;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
          }
          h1 {
            font-size: 40px;
            color: #1e293b;
            text-align: center;
            font-weight: 700;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 24px;
            color: #334155;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 500;
          }
          .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
          }
          .invoice-details div {
            padding: 20px;
            background-color: #f1f5f9;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          }
          .invoice-details p {
            font-size: 16px;
            line-height: 1.5;
            color: #475569;
            margin-bottom: 10px;
          }
          .invoice-summary {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
          }
          .invoice-summary p {
            font-size: 18px;
            line-height: 1.6;
            color: #475569;
            margin-bottom: 12px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #94a3b8;
            font-size: 14px;
          }
          .btn-print {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 30px auto;
            padding: 12px 25px;
            background-color: #4f46e5;
            color: white;
            font-size: 18px;
            font-weight: 600;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            gap: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .btn-print:hover {
            background-color: #6366f1;
            transform: scale(1.05);
          }
          .btn-print i {
            font-size: 20px;
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
              box-shadow: none;
              border-radius: 0;
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
            <a class="btn-print" href="javascript:window.print()">
              <i class="lucide lucide-printer"></i> Print Invoice
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

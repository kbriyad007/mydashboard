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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f7fafc;
            color: #4a5568;
            line-height: 1.6;
          }
          .container {
            width: 80%;
            max-width: 1200px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 36px;
            color: #1a202c;
            text-align: center;
            font-weight: 700;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 24px;
            color: #2d3748;
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
            background-color: #edf2f7;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }
          .invoice-details p {
            font-size: 16px;
            color: #2d3748;
            margin-bottom: 10px;
          }
          .invoice-summary {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
          }
          .invoice-summary p {
            font-size: 18px;
            color: #2d3748;
            margin-bottom: 12px;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #718096;
            font-size: 14px;
          }
          .btn-print {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 30px auto;
            padding: 12px 28px;
            background-color: #5a67d8;
            color: white;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            gap: 10px;
            transition: background-color 0.3s ease, transform 0.2s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          }
          .btn-print:hover {
            background-color: #434190;
            transform: scale(1.05);
          }
          .btn-print svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
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
            <p><strong>Description:</strong> ${request.Description || "N/A"}</p>
            <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
            <a class="btn-print" href="javascript:window.print()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-2 0H8v4h8v-4z" />
              </svg>
              Print Invoice
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



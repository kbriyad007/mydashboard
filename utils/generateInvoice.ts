export const generateInvoice = (request: any) => {
  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  invoiceWindow.document.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invoice</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            padding: 20px;
          }
          .container {
            max-width: 900px;
            margin: 40px auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          h1 {
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 10px;
            color: #111827;
          }
          h2 {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            color: #4b5563;
            margin-bottom: 30px;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          .box {
            background: #f3f4f6;
            padding: 20px;
            border-radius: 12px;
          }
          .box p {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .icon-text {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .icon {
            width: 18px;
            height: 18px;
            stroke: #6b7280;
          }
          .summary {
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
          }
          .summary p {
            font-size: 17px;
            margin-bottom: 12px;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            margin-top: 40px;
          }
          .btn-print {
            margin: 30px auto;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 28px;
            font-weight: 600;
            font-size: 16px;
            background-color: #3b82f6;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.3s ease, transform 0.2s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
          }
          .btn-print:hover {
            background-color: #2563eb;
            transform: scale(1.03);
          }
          .btn-print svg {
            width: 20px;
            height: 20px;
            stroke: white;
          }
          @media print {
            .btn-print {
              display: none;
            }
            body {
              background: white;
            }
            .container {
              box-shadow: none;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice</h1>
          <h2>Order Details</h2>

          <div class="details-grid">
            <div class="box">
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                <strong>Customer:</strong> ${request["Customer-Name"]}
              </p>
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5h18M3 10h18M3 15h18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                <strong>Email:</strong> ${request["User-Email"]}
              </p>
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h2l3 9a4 4 0 004 2h6a4 4 0 004-4V5H3z" /></svg>
                <strong>Phone:</strong> ${request["Phone-Number"] || "N/A"}
              </p>
            </div>

            <div class="box">
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.105 0-2 .672-2 1.5S10.895 11 12 11s2-.672 2-1.5S13.105 8 12 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 18v-1a2 2 0 012-2h12a2 2 0 012 2v1H4z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <strong>Courier:</strong> ${request.Courier || "N/A"}
              </p>
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h18M3 8h18M3 13h18M3 18h18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                <strong>Quantity:</strong> ${request.Quantity}
              </p>
              <p class="icon-text">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h1l2-2h12l2 2h1M3 14h18M3 18h18" /></svg>
                <strong>Address:</strong> ${request.Address}
              </p>
            </div>
          </div>

          <div class="summary">
            <p><strong>Product Name:</strong> ${request["Product-Name"]}</p>
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

// InvoiceUtils.ts

// Function to generate a QR code URL for an invoice
export const generateQRCode = (data: string): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=150x150`;
};

// Function to generate the invoice content for printing or display
export const generateInvoiceHTML = (req: any): string => {
  const productLinks = req["Product-Links"] ?? [];
  const productLinksText = productLinks.map((link, i) => `Link ${i + 1}: ${link}`).join(" | ");
  const qrText = `
    Name: ${req["Customer-Name"]}
    Email: ${req["User-Email"]}
    Courier: ${req.Courier || "N/A"}
    Quantity: ${req.Quantity}
    Product(s): ${productLinksText}
  `;

  const qrCodeURL = generateQRCode(qrText);

  return `
    <html>
      <head>
        <title>Invoice - ${req["Customer-Name"]}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; background: #f4f6f8; }
          .invoice-box { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 10px; }
          h1 { color: #333; font-size: 20px; }
          .row { margin-bottom: 10px; font-size: 14px; }
          .qr { text-align: center; margin-top: 20px; }
          .qr img { border: 1px solid #ddd; padding: 6px; border-radius: 10px; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <h1>Invoice</h1>
          <div class="row">Name: ${req["Customer-Name"]}</div>
          <div class="row">Email: ${req["User-Email"]}</div>
          <div class="row">Phone: ${req["Phone-Number"]}</div>
          <div class="row">Courier: ${req.Courier}</div>
          <div class="row">Quantity: ${req.Quantity}</div>
          <div class="row">Product Links: ${productLinksText}</div>
          <div class="qr">
            <img src="${qrCodeURL}" alt="QR Code" />
          </div>
        </div>
        <script>window.print();</script>
      </body>
    </html>
  `;
};

// Function to generate WhatsApp message link
export const generateWhatsAppMessage = (req: any): string => {
  const phone = (req["Phone-Number"] || "").replace(/\D/g, "");
  const date = req.Time?.seconds ? new Date(req.Time.seconds * 1000).toLocaleDateString() : "N/A";
  const message = `
    Hello ${req["Customer-Name"]}, 👋

    Here is your order summary:
    📦 Courier: ${req.Courier || "N/A"}
    🔢 Quantity: ${req.Quantity || "N/A"}
    🔗 Links:
    ${req["Product-Links"]?.map((l: string, i: number) => `${i + 1}. ${l}`).join("\n")}
    📅 Order Date: ${date}

    Thank you!
  `;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

// utils/sendWhatsApp.ts

export const sendWhatsApp = (phoneNumber: string, customerName: string) => {
  if (!phoneNumber) return;

  // Remove any non-digit characters from the phone number
  const cleanedPhone = phoneNumber.replace(/\D/g, "");

  // Pre-fill the WhatsApp message
  const message = `Hi ${customerName}, thank you for your request!`;

  // Construct the WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp chat in a new tab
  window.open(whatsappUrl, "_blank");
};

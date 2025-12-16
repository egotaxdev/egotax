import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'EgoTax <noreply@egotax.md>';

interface PaymentSuccessEmailData {
  to: string;
  clientName: string;
  amount: number;
  currency: string;
  orderId: string;
  serviceType: string;
  paymentDate: Date;
  cardNumber?: string;
}

export async function sendPaymentSuccessEmail(data: PaymentSuccessEmailData): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  const formattedDate = data.paymentDate.toLocaleString('ro-MD', {
    timeZone: 'Europe/Chisinau',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const serviceTypeLabels: Record<string, string> = {
    consultanta: 'Consultanță',
    contabilitate: 'Servicii contabile',
    declaratii: 'Declarații fiscale',
    audit: 'Audit',
    other: 'Servicii',
  };

  const serviceName = serviceTypeLabels[data.serviceType] || data.serviceType;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Confirmare plată - ${serviceName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmare plată</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%); padding: 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: #FFB343; margin: 0; font-size: 28px; font-weight: 600;">Plată reușită!</h1>
              <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">Tranzacția a fost procesată cu succes</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Bună ziua, <strong>${escapeHtml(data.clientName)}</strong>!
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 32px;">
                Vă mulțumim pentru plata dumneavoastră. Tranzacția a fost procesată cu succes.
              </p>

              <!-- Payment Details Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">
                      Detalii plată
                    </h2>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Serviciu:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${escapeHtml(serviceName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Sumă:</td>
                        <td style="padding: 8px 0; color: #D97706; font-size: 18px; font-weight: 700; text-align: right;">${data.amount.toLocaleString('ro-MD')} ${data.currency}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Data:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Nr. comandă:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${escapeHtml(data.orderId)}</td>
                      </tr>
                      ${data.cardNumber ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Card:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500; text-align: right;">${escapeHtml(data.cardNumber)}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
                Dacă aveți întrebări, nu ezitați să ne contactați.
              </p>

              <!-- Contact Button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-radius: 8px; background-color: #FFB343;">
                    <a href="https://egotax.md/contacte" style="display: inline-block; padding: 14px 28px; color: #1e1e1e; text-decoration: none; font-size: 14px; font-weight: 600;">
                      Contactați-ne
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #1e1e1e; border-radius: 0 0 12px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px;">
                      EgoTax S.R.L. | Servicii contabile profesionale
                    </p>
                    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                      <a href="https://egotax.md" style="color: #FFB343; text-decoration: none;">egotax.md</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Disclaimer -->
        <p style="color: #9ca3af; font-size: 11px; text-align: center; margin-top: 24px; max-width: 500px;">
          Acest email a fost trimis automat. Vă rugăm să nu răspundeți direct la acest mesaj.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `
Plată reușită!

Bună ziua, ${data.clientName}!

Vă mulțumim pentru plata dumneavoastră. Tranzacția a fost procesată cu succes.

Detalii plată:
- Serviciu: ${serviceName}
- Sumă: ${data.amount.toLocaleString('ro-MD')} ${data.currency}
- Data: ${formattedDate}
- Nr. comandă: ${data.orderId}
${data.cardNumber ? `- Card: ${data.cardNumber}` : ''}

Dacă aveți întrebări, nu ezitați să ne contactați la https://egotax.md/contacte

--
EgoTax S.R.L.
https://egotax.md
      `.trim(),
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Payment success email sent to:', data.to);
    return true;
  } catch (error) {
    console.error('Failed to send payment success email:', error);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

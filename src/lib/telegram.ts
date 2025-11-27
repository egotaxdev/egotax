const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface TelegramMessage {
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_web_page_preview?: boolean;
}

export async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return false;
  }

  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message.text,
            parse_mode: message.parse_mode || 'HTML',
            disable_web_page_preview: message.disable_web_page_preview ?? true,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        console.error('Telegram API error:', error);
        return false;
      }

      return true;
    } catch (error) {
      lastError = error as Error;
      console.error(`Telegram send attempt ${attempt}/${maxRetries} failed:`, error);

      if (attempt < maxRetries) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  console.error('Failed to send Telegram message after all retries:', lastError);
  return false;
}

// Format OC request for Telegram
export function formatOCRequestMessage(data: {
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  services: string[];
  message?: string;
  pageUrl?: string;
}): string {
  const servicesText = data.services.length > 0
    ? data.services.map(s => `  • ${s}`).join('\n')
    : '  Nu au fost selectate';

  let text = `🆕 <b>Nouă solicitare OC</b>\n\n`;
  text += `👤 <b>Nume:</b> ${escapeHtml(data.name)}\n`;
  text += `📞 <b>Telefon:</b> ${escapeHtml(data.phone)}\n`;

  if (data.email) {
    text += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;
  }

  if (data.companyName) {
    text += `🏢 <b>Companie:</b> ${escapeHtml(data.companyName)}\n`;
  }

  text += `\n📋 <b>Servicii de interes:</b>\n${servicesText}\n`;

  if (data.message) {
    text += `\n💬 <b>Mesaj:</b>\n${escapeHtml(data.message)}\n`;
  }

  if (data.pageUrl) {
    text += `\n🔗 <b>Pagina:</b> ${escapeHtml(data.pageUrl)}`;
  }

  text += `\n\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`;

  return text;
}

// Format calculator request for Telegram
export function formatCalculatorRequestMessage(data: {
  name: string;
  phone: string;
  email?: string;
  companyName?: string;
  businessType?: string;
  employeeCount?: number;
  monthlyOperations?: number;
  hasVat?: boolean;
  hasForeignOperations?: boolean;
  additionalServices?: string[];
  estimatedPrice?: number;
  message?: string;
}): string {
  let text = `🧮 <b>Nouă solicitare Calculator</b>\n\n`;
  text += `👤 <b>Nume:</b> ${escapeHtml(data.name)}\n`;
  text += `📞 <b>Telefon:</b> ${escapeHtml(data.phone)}\n`;

  if (data.email) {
    text += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;
  }

  if (data.companyName) {
    text += `🏢 <b>Companie:</b> ${escapeHtml(data.companyName)}\n`;
  }

  text += `\n📊 <b>Detalii afacere:</b>\n`;

  if (data.businessType) {
    text += `  • Tip: ${escapeHtml(data.businessType)}\n`;
  }

  if (data.employeeCount !== undefined) {
    text += `  • Angajați: ${data.employeeCount}\n`;
  }

  if (data.monthlyOperations !== undefined) {
    text += `  • Operații/lună: ${data.monthlyOperations}\n`;
  }

  text += `  • TVA: ${data.hasVat ? 'Da' : 'Nu'}\n`;
  text += `  • Operații externe: ${data.hasForeignOperations ? 'Da' : 'Nu'}\n`;

  if (data.additionalServices && data.additionalServices.length > 0) {
    text += `\n📋 <b>Servicii adiționale:</b>\n`;
    text += data.additionalServices.map(s => `  • ${escapeHtml(s)}`).join('\n');
    text += '\n';
  }

  if (data.estimatedPrice !== undefined) {
    text += `\n💰 <b>Preț estimat:</b> ${data.estimatedPrice.toLocaleString('ro-MD')} MDL/lună\n`;
  }

  if (data.message) {
    text += `\n💬 <b>Mesaj:</b>\n${escapeHtml(data.message)}\n`;
  }

  text += `\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`;

  return text;
}

// Format contact request for Telegram
export function formatContactRequestMessage(data: {
  name: string;
  phone?: string;
  email: string;
  companyName?: string;
  subject?: string;
  message: string;
  pageUrl?: string;
}): string {
  let text = `✉️ <b>Nou mesaj de contact</b>\n\n`;
  text += `👤 <b>Nume:</b> ${escapeHtml(data.name)}\n`;

  if (data.phone) {
    text += `📞 <b>Telefon:</b> ${escapeHtml(data.phone)}\n`;
  }

  text += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;

  if (data.companyName) {
    text += `🏢 <b>Companie:</b> ${escapeHtml(data.companyName)}\n`;
  }

  if (data.subject) {
    text += `\n📌 <b>Subiect:</b> ${escapeHtml(data.subject)}\n`;
  }

  text += `\n💬 <b>Mesaj:</b>\n${escapeHtml(data.message)}\n`;

  if (data.pageUrl) {
    text += `\n🔗 <b>Pagina:</b> ${escapeHtml(data.pageUrl)}`;
  }

  text += `\n\n⏰ ${new Date().toLocaleString('ro-MD', { timeZone: 'Europe/Chisinau' })}`;

  return text;
}

// Escape HTML special characters for Telegram
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

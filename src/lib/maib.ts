/**
 * maib e-commerce API Integration
 * Documentation: https://docs.maibmerchants.md/e-commerce/ru
 */

const MAIB_API_URL = 'https://api.maibmerchants.md/v1';

interface MaibTokenResponse {
  result?: {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
    tokenType: string;
  };
  ok: boolean;
  errors?: Array<{
    errorCode: string;
    errorMessage: string;
  }>;
}

interface MaibPaymentRequest {
  amount: number;
  currency: 'MDL' | 'EUR' | 'USD';
  clientIp: string;
  language: 'ro' | 'en' | 'ru';
  description?: string;
  clientName?: string;
  email?: string;
  phone?: string;
  orderId?: string;
  delivery?: number;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  callbackUrl?: string;
  okUrl?: string;
  failUrl?: string;
}

interface MaibPaymentResponse {
  result?: {
    payId: string;
    orderId: string;
    payUrl: string;
  };
  ok: boolean;
  errors?: Array<{
    errorCode: string;
    errorMessage: string;
    errorArgs?: Record<string, string>;
  }>;
}

interface MaibCallbackData {
  result: {
    payId: string;
    orderId: string;
    status: 'OK' | 'FAILED' | 'CREATED' | 'PENDING' | 'DECLINED' | 'TIMEOUT';
    statusCode: string;
    statusMessage: string;
    threeDs?: string;
    rrn?: string;
    approval?: string;
    cardNumber?: string;
    amount: number;
    currency: string;
  };
  signature: string;
}

// Token cache
let cachedToken: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
} | null = null;

/**
 * Get maib API credentials from environment
 */
function getCredentials() {
  const projectId = process.env.MAIB_PROJECT_ID;
  const projectSecret = process.env.MAIB_PROJECT_SECRET;
  const signatureKey = process.env.MAIB_SIGNATURE_KEY;

  if (!projectId || !projectSecret) {
    throw new Error('MAIB_PROJECT_ID and MAIB_PROJECT_SECRET must be set in environment variables');
  }

  return { projectId, projectSecret, signatureKey };
}

/**
 * Generate access token using Project ID and Project Secret
 */
async function generateToken(): Promise<string> {
  const { projectId, projectSecret } = getCredentials();

  // Log outgoing IP for debugging
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    console.log('maib outgoing IP:', ipData.ip);
  } catch (e) {
    console.log('Could not determine outgoing IP');
  }

  const response = await fetch(`${MAIB_API_URL}/generate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      projectSecret,
    }),
  });

  console.log('maib token response status:', response.status);
  const data: MaibTokenResponse = await response.json();

  if (!data.ok || !data.result) {
    const errorMessage = data.errors?.[0]?.errorMessage || 'Failed to generate token';
    throw new Error(errorMessage);
  }

  // Cache the token
  const now = Date.now();
  cachedToken = {
    accessToken: data.result.accessToken,
    refreshToken: data.result.refreshToken,
    expiresAt: now + (data.result.expiresIn - 30) * 1000, // 30 seconds buffer
    refreshExpiresAt: now + (data.result.refreshExpiresIn - 30) * 1000,
  };

  return data.result.accessToken;
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken(): Promise<string> {
  if (!cachedToken?.refreshToken) {
    return generateToken();
  }

  const response = await fetch(`${MAIB_API_URL}/generate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: cachedToken.refreshToken,
    }),
  });

  const data: MaibTokenResponse = await response.json();

  if (!data.ok || !data.result) {
    // If refresh token is invalid, generate new token
    cachedToken = null;
    return generateToken();
  }

  // Update cached token
  const now = Date.now();
  cachedToken = {
    accessToken: data.result.accessToken,
    refreshToken: data.result.refreshToken,
    expiresAt: now + (data.result.expiresIn - 30) * 1000,
    refreshExpiresAt: now + (data.result.refreshExpiresIn - 30) * 1000,
  };

  return data.result.accessToken;
}

/**
 * Get valid access token (from cache or generate new)
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  // If no cached token, generate new
  if (!cachedToken) {
    return generateToken();
  }

  // If access token is still valid, use it
  if (now < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  // If refresh token is still valid, use it to get new access token
  if (now < cachedToken.refreshExpiresAt) {
    return refreshAccessToken();
  }

  // Both tokens expired, generate new
  return generateToken();
}

/**
 * Create a direct payment
 */
export async function createPayment(params: MaibPaymentRequest): Promise<MaibPaymentResponse> {
  const accessToken = await getAccessToken();

  // Build clean payload - remove undefined/null values
  const payload: Record<string, unknown> = {
    amount: params.amount,
    currency: params.currency,
    clientIp: params.clientIp,
    language: params.language,
  };

  // Only add optional fields if they have values
  if (params.description) payload.description = params.description;
  if (params.clientName) payload.clientName = params.clientName;
  if (params.email) payload.email = params.email;
  if (params.phone) payload.phone = params.phone;
  if (params.orderId) payload.orderId = params.orderId;
  if (params.delivery !== undefined) payload.delivery = params.delivery;
  if (params.callbackUrl) payload.callbackUrl = params.callbackUrl;
  if (params.okUrl) payload.okUrl = params.okUrl;
  if (params.failUrl) payload.failUrl = params.failUrl;

  // Only add items if array has elements
  if (params.items && params.items.length > 0) {
    payload.items = params.items;
  }

  console.log('maib request payload:', JSON.stringify(payload, null, 2));

  const response = await fetch(`${MAIB_API_URL}/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log('maib response status:', response.status, response.statusText);
  console.log('maib response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));
  console.log('maib response body:', responseText);

  let data: MaibPaymentResponse;
  try {
    data = JSON.parse(responseText);
  } catch {
    console.error('Failed to parse maib response:', responseText);
    return {
      ok: false,
      errors: [{ errorCode: 'PARSE_ERROR', errorMessage: responseText }],
    };
  }
  return data;
}

/**
 * Get payment info by payId
 */
export async function getPaymentInfo(payId: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${MAIB_API_URL}/pay-info/${payId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

/**
 * Verify callback signature
 */
export function verifySignature(data: MaibCallbackData): boolean {
  const { signatureKey } = getCredentials();

  if (!signatureKey) {
    console.warn('MAIB_SIGNATURE_KEY not set, skipping signature verification');
    return true;
  }

  const { result, signature } = data;

  // Sort keys alphabetically
  const sortedKeys = Object.keys(result).sort();

  // Build string from sorted values
  const values = sortedKeys.map(key => result[key as keyof typeof result]);
  values.push(signatureKey);

  const signString = values.join(':');

  // Generate hash
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(signString).digest('base64');

  return hash === signature;
}

/**
 * Transaction status descriptions
 */
export const TRANSACTION_STATUS = {
  OK: 'Успешная транзакция',
  FAILED: 'Неуспешная транзакция',
  CREATED: 'Транзакция создана, ожидает оплаты',
  PENDING: 'Транзакция в обработке',
  DECLINED: 'Транзакция отклонена',
  TIMEOUT: 'Время транзакции истекло',
} as const;

/**
 * 3D Secure status descriptions
 */
export const THREEDS_STATUS = {
  AUTHENTICATED: 'Аутентификация успешна',
  NOT_AUTHENTICATED: 'Аутентификация не пройдена',
  UNAVAILABLE: 'Сервис 3DS недоступен',
  ATTEMPTED: 'Попытка аутентификации',
  REJECTED: 'Аутентификация отклонена',
  SKIPPED: 'Аутентификация пропущена',
  NOTPARTICIPATED: 'Карта не поддерживает 3DS',
} as const;

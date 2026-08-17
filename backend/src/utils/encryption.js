const crypto = require('crypto');
const { CONFIG } = require("../config");

function getKey() {
  const rawKey = CONFIG.ENCRYPTION_KEY || 'default_restropro_encryption_key_32';
  return crypto.createHash('sha256').update(String(rawKey)).digest();
}

const ALGO = 'aes-256-cbc';

exports.encrypt = (text) => {
  if (!text) return text;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(text)), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

exports.decrypt = (data) => {
  if (!data || typeof data !== 'string' || !data.includes(':')) return data;
  const [ivHex, encData] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encData, 'hex');
  const decipher = crypto.createDecipheriv(ALGO, getKey(), iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString();
};

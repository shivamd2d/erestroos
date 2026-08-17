const crypto = require("crypto");

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;

function getKey() {
  const rawKey = process.env.CREDENTIAL_ENCRYPTION_KEY || process.env.ENCRYPTION_KEY || "default_restropro_credential_encryption_key_32";
  return crypto.createHash("sha256").update(String(rawKey)).digest();
}

function encrypt(text) {
  if (!text) return text;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);

  let encrypted = cipher.update(String(text), "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    content: encrypted,
    tag: tag.toString("hex"),
  };
}

function decrypt(encrypted) {
  if (!encrypted || typeof encrypted !== "object" || !encrypted.iv || !encrypted.content || !encrypted.tag) {
    return encrypted;
  }
  const decipher = crypto.createDecipheriv(
    ALGO,
    getKey(),
    Buffer.from(encrypted.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

  let decrypted = decipher.update(encrypted.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

module.exports = {
  encrypt,
  decrypt,
};

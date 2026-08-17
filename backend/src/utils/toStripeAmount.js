const ZERO_DECIMAL = ["JPY", "KRW"];

function toStripeAmount(amount, currency) {
  if (ZERO_DECIMAL.includes(currency.toUpperCase())) return amount;
  return amount * 100;
}

module.exports = { toStripeAmount };
export const API = import.meta.env.VITE_BACKEND || "/api/v1";
export const VITE_BACKEND_SOCKET_IO = import.meta.env.VITE_BACKEND_SOCKET_IO || (typeof window !== "undefined" ? window.location.origin : "");
export const API_IMAGES_BASE_URL = import.meta.env.VITE_BACKEND_IMAGES_BASE_URL || (typeof window !== "undefined" ? window.location.origin : "");
export const FRONTEND_DOMAIN = import.meta.env.VITE_FRONTEND_DOMAIN || (typeof window !== "undefined" ? window.location.origin : "");

export const iconStroke = 1.5;

export const supportEmail = "hi@uiflow.in";
export const appVersion = "2.1.0";

export const subscriptionAmount = 5;
export const subscriptionPrice = subscriptionAmount;

export const stripeProductSubscriptionId = import.meta.env.VITE_STRIPE_PRODUCT_SUBSCRIPTION_KEY;
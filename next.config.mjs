/** @type {import('next').NextConfig} */

export const experimental = {
  serverActions: {
    allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
  },
};

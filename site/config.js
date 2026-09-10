/* Set this after deploying the Cloudflare Worker. This file is safe to publish. */
window.HOA_PORTAL_API_URL = location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8787/status' // local-only interactive demo
  : 'https://homestead-hoa-status.homesteaddrivehoa.workers.dev/status';

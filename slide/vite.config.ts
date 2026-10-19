import { defineConfig } from 'vite'

export default defineConfig({
  // slidev-addon-muan-companion pulls in socket.io-client -> debug (CommonJS).
  // Without pre-bundling, the browser fails with "does not provide an export named 'default'".
  optimizeDeps: { include: ['debug'] },
  // `slidev --remote --tunnel` serves through a random *.trycloudflare.com host.
  // Slidev's own allowedHosts wildcard intermittently still rejects it
  // ("Blocked request... add to server.allowedHosts"), so allow `.trycloudflare.com`
  // explicitly. The quick-tunnel hostname is ephemeral per run, so this is low risk.
  server: { allowedHosts: ['.trycloudflare.com'] },
})

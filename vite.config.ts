import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@systems': path.resolve(__dirname, './src/systems'),
      '@scenes': path.resolve(__dirname, './src/scenes'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@config': path.resolve(__dirname, './src/config'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    host: '0.0.0.0', // AWS Cloud9などのクラウド環境でのアクセスを許可
    port: 8080, // Cloud9で公開されているポート
    strictPort: false,
    allowedHosts: [
      '.amazonaws.com',
      '.cloudfront.net',
      'd16u17p1vt11h5.cloudfront.net',
    ],
    hmr: {
      protocol: 'wss',
      host: 'd16u17p1vt11h5.cloudfront.net',
      clientPort: 443, // CloudFrontはHTTPSポート443を使用
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'src/main.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
      ],
    },
  },
});

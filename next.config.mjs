
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  reactCompiler: true,

  turbopack: {
    root: __dirname,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

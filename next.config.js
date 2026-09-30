module.exports = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.mzstatic.com",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
  },
};

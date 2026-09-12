module.exports = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
  },
};

import babel from "@rollup/plugin-babel";

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "cjs",
    name: "index",
    file: "public/index.js",
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
    }),
  ],
};

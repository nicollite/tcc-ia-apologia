module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "12",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {  
          "src": "./src",
          "@config": "./src/config",
          "@model": "./src/model",
          "@controllers": "./src/controllers",
          "@views": "./src/views",
          "@services": "./src/services",
          "@interfaces": "./src/interfaces",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};

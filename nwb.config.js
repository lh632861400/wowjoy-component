const path = require("path");
const fs = require("fs")
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
RegExp.prototype.toJSON = RegExp.prototype.toString;

function aa (key ,value) {
  if(typeof value !== 'boolean' && typeof value !== 'string' &&
    Object.prototype.toString.call(value) !== '[object Number]') {
    if(Object.prototype.toString.call(value) === '[object Function]' || value instanceof RegExp) {
      return value.toString()
    }
    return toJson(value)
  }else {
    return value
  }
}

function toJson(obj) {
  return JSON.stringify(obj, aa)
}

module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    aliases: {
      "@src": path.resolve("src"),
      "@lib": path.resolve("lib"),
      "@es": path.resolve("es"),
      "@media": path.resolve("src/media")
    },
    rules: {
      svg: {
        use: ["@svgr/webpack", "url-loader"]
      }
    },
    extra: {
/*      entry: "./src/index.ts",
      output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
      },*/

      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",

      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
      },
    },
    config(config) {
      config.module.rules[0] = {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [path.resolve("./src"), path.resolve("./demo")],
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),



          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
            ],
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,

          presets: [
            [
              require.resolve('babel-preset-react-app/dependencies'),
              { helpers: true },
            ],
          ],
        },
      };

      config.plugins = config.plugins.concat([
        new ForkTsCheckerWebpackPlugin({
          async: true,
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          tsconfig: './tsconfig.json',
          reportFiles: [
            '**',
            '!**/*.json',
            '!**/__tests__/**',
            '!**/?(*.)(spec|test).*',
            '!**/src/setupProxy.*',
            '!**/src/setupTests.*',
          ],
          watch: './src',
          silent: true,
          // The formatter is invoked directly in WebpackDevServerUtils during development
          // formatter: isEnvProduction ? typescriptFormatter : undefined,
        })
      ]);
      const aa = JSON.stringify(config, null ,4);
      fs.writeFile('./webpack.config.json', aa, (err, res) => {
        console.log(err)
      });
      fs.writeFile('./webpack.config.js', "module.exports=" + aa, (err, res) => {
        console.log(err)
      });
      return {
        ...config,
       /* externals: {
          "styled-components": {
            commonjs: "styled-components",
            commonjs2: "styled-components",
            amd: "styled-components"
          }
        }*/
      };
    }
  }
};

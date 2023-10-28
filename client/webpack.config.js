// Import necessary webpack plugins and modules.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Export a function that returns the webpack configuration.
module.exports = () => {
  return {

    mode: "development",


    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"), 
    },

    // List of plugins used to enhance the webpack build process.
    plugins: [
      // HtmlWebpackPlugin generates HTML files and injects bundled scripts.
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE", 
      }),

      // InjectManifest plugin injects the service worker into your application.
      new InjectManifest({
        swSrc: "./src-sw.js", 
        swDest: "src-sw.js", 
      }),

      // WebpackPwaManifest generates a Web App Manifest for your PWA.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Simple text editor for offline use.",
        background_color: "#225ca3", 
        theme_color: "#225ca3", 
        start_url: "/", // The URL where your app starts.
        publicPath: "/", 
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Path to your app's icon.
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"), // Destination directory.
          },
        ],
      }),
    ],

    // Define rules for processing different types of files.
    module: {
      rules: [
        {
          test: /\.css$/i, 
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/, 
          exclude: /node_modules/, 
          use: {
            loader: "babel-loader", 
            options: {
              presets: ["@babel/preset-env"], 
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};

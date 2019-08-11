if (typeof process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'development';
}

const path = require('path');
const webpack = require('webpack');
//const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    context: path.join(__dirname, '/src'),
    entry: 'index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "assets/scripts/app.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        alias: {
            '@t': path.resolve(__dirname, './src/typings'),
            '@components': path.resolve(__dirname, './src/components'),
            '@containers': path.resolve(__dirname, './src/containers'),
            '@store': path.resolve(__dirname, './src/store'),
            '@api': path.resolve(__dirname, './src/api'),
            '@helpers': path.resolve(__dirname, './src/helpers')
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        // new HtmlWebPackPlugin({
        //     template: './index.html',
        //     filename: './index.html',
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { url: true } }],
            },
            {
                test: /\.(png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 100000, name: 'assets/[hash].[ext]' },
                    },
                ],
            },
        ],
    }
};

const htmlRule = {
    test: /\.html$/,
    use: [{ loader: 'html-loader', options: { minimize: false }} ],
}

if (process.env.NODE_ENV === 'production') {
    htmlRule.use[0].options.minimize = true;
    webpackConfig.devtool = 'nosources-source-map';
} else {
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    webpackConfig.devServer = {
        compress: false,
        hot: true,
        historyApiFallback: true,
        stats: {
            logging: 'warn',
            colors: true
        },
    };
}

webpackConfig.module.rules.push(htmlRule);

if (process.env.BUILD_ANALYZE) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

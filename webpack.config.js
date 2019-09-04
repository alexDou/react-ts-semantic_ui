const mode = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfig = {
    mode,
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
                NODE_ENV: JSON.stringify(mode),
            },
        }),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: mode !== 'production',
                    failOnWarning: mode !== 'production',
                    failOnError: true,
                },
            },
            {
                test: /\.tsx?$/,
                loader: ['ts-loader'],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader?sourceMap', options: { url: true } }],
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
    },
    optimization: {
        noEmitOnErrors: true
    }
};

const htmlRule = {
    test: /\.html$/,
    use: [{ loader: 'html-loader', options: { minimize: false }} ],
}

if (mode === 'production') {
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

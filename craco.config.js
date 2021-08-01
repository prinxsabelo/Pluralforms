module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    },
}
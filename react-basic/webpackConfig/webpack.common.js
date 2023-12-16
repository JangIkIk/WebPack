const path = require('path');
// HTML파일 생성을 단순화하며, 나만의 템플릿을 제공하도록 할수있다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// TypeScript 타입체크를 별도의 프로세스로 분리하여 속도를 높인다.
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    // 웹팩의 출발지점을 설정(최상위 파일) - 다중 지정가능 ex) {main: 위치}
    entry: path.resolve(__dirname,'../src/index.tsx'),
    // webpack은 기본적으로 JS, JSON만 해석할수있다. 즉 다른 유형의 모듈을 처리하는 방법을 결정
    module:{
         /*
        rules: 모듈이 생성될때 요청과 일치하는 배열, 로더를 모듈에 적용시키거나 파서를 수정할수있다.
        1. test: 어떤파일을 변환할지 지정하는 속성
        2. use: 파일을 변환할때 어떤 로더를 사용해야하는지
        3. exclude: 외부모듈을 제외한다. 번들파일의 크기를줄이고, 빌드성능을 향상 즉, 필요한 모듈만 사용하기위해
        */
        rules:[
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ]
    },
    // webpack 빌드 프로세스중 필요한 작업을 수행하는 객체(파일) 플러그인 적용
    plugins:[
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    // 모듈을 해석하는 방식을 변경할수있다.
    resolve:{
        // 확장자를 순서대로 해석하며 앞에서부터 해석하고 남은것은 해석하지 않는다.
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', 'json'],
        // 절대경로 지정
        alias: {
            "@components": path.resolve("/src/components")
          },
    }
}
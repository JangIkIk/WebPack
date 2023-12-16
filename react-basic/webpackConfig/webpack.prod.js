// Js의 경로 모듈
const path = require('path');
// Css를 포함한 JS파일별로 각css파일을 생성한다.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Css를 압축하고 파일크기를 최소화 한다. 공백제거, CSS 규칙제거
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
// Js 를 압축하고 파일크기를 최소화 한다. 불필요한 공백제거, 미사용코드 제거
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const webpackCommon = require('./webpack.common');


module.exports = merge(webpackCommon, {
    // webpack에 내장된 최적화 기능을 사용할 수 있다. dev or prod
    mode: "production",
    // 번들링된 파일을 디버깅하기 위한 설정
    devtool: "source-map",
    // 번들, 애셋 및 webpack으로 번들링하거나 로드하는 기타 항목을 출력하는 방법과 위치를 webpack에 지시하는 옵션
    output: {
        // 번들 파일의 이름을 정의한다.
        // name: 파일의 이름을 기반으로 만들어진다. index=main으로 정의되어 있음
        // contenthash: 파일의 해쉬태그를 붙인다. 브라우저 캐싱, 파일버전관리
        filename:"[name].[contenthash].js",
        // 번들링된 폴더의 위치와 이름지정
        path: path.resolve(__dirname, "../dist"),
        //  브라우저에서 해당 자산을 로드할 때 사용되는 경로를 지정
        publicPath: './',
        // 번들링하기전 이전 output디렉터리를 정리
        clean: true
    },
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
                test: /\.css$/,
                // style-loader대신에 MiniCssExtractPlugin이  들어간이유는?
                // style-loader는 개발시 편리한 디버깅을 하기위해서이다. 스타일 시트가 동적으로 페이지에 적용되므로
                // 수정된 스타일이 즉시 적용되어 개발자가 펴하게 작업할 수 있다. 하지만 prod에서는
                // 디자인이 쉽게 변하지 안을 뿐더러, 해당 플러그인을 사용하여 css파일을 별도로 추출하여
                // 캐싱하고 병렬로 다운로드할 수 있게 합니다. 이로써 웹페이지 로딩 시간을 단축하고 성능을 향상시킴
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    // 최적화 관련 설정을 정의 하는 객체
    optimization: {
        // 사용하지 않는 export모듈을 번들에 포함하지않음
        usedExports: true,
        // minimizer에 지정된 플러그인을 실행시킨다.
        minimize: true,
        // minimize 가 false로 지정되면 플러그인들은 적용되지 않는다.
        minimizer: [
            // TerserWebpackPlugin은 서드파티이다. 그렇기때문에 webpack 공식문서는 많은 내용은없다.
            // https://github.com/terser/terser#minify-options (TerserWebpackPlugin git)
            // https://terser.org/docs/ (TerserWebpackPlugin 공식문서)
            new TerserWebpackPlugin({
                // 다양한 압축 옵션 및 최적화를 설정하는 객체
                terserOptions: {
                    // 코드 압축관련구성
                  compress: {
                    // console.log 삭제
                    drop_console: true,
                  },
                  // 압축코드의 출력형식 구성
                  output: {
                    // 모든 주석제거
                    comments: false
                  }
                },
              }),
            new CssMinimizerWebpackPlugin(),
        ],
        // 코드 분할을 적용하도록 최적화 설정
        splitChunks:{
            // 반복되는 코드를 따로 분리하여 재사용성을 높이는데 도움을줌
            chunks: "all"
        }
    },
    // webpack 빌드 프로세스중 필요한 작업을 수행하는 객체(파일)
    plugins: [
        new MiniCssExtractPlugin()
    ],
})
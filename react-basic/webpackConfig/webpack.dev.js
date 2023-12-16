const { merge } = require("webpack-merge");
const webpackCommon = require('./webpack.common');

module.exports = merge(webpackCommon, {
    // webpack에 내장된 최적화 기능을 사용할 수 있다. dev or prod
    mode: "development",
    // 번들링된 파일을 디버깅하기 위한 설정
    devtool: "eval-source-map",
    // 개발시 사용하는 서버설정
    /*
        devServer를 이용하여 실행할때는, 메모리 상에서 번들된 파일을 제공하므로,
        devtool이 개발 서버에도 적용이 된다. 또한 output의 publicPath는 기본적으로 루트("/")로 설정되어 있다.
        즉, 개발 모드에서의 output은 필수가 아니며, 배포나 테스트등 을 위해 빌드할때는 output 설정이 필요하다
    */
    devServer: {
        // 개발서버 실행후 브라우저 open여부
        open: false,
        // 애플리케이션의 상태를 유지하고 변경된 부분만 업데이트
        hot: true,
        // 개발서버가 열링 Port번호
        port: 3000,
        /*
        SPA에서 브라우저 히스토리와 라우팅을 관리하는데 유용하며,
        사용자가 잘못된 경로로 이동하였을경우 클라이언트측에서 라우팅을 처리하고
        적절한 화면을 표시하기 위함
        */
        historyApiFallback: true,
        // 파일 변경이 감지되면 페이지를 다시 로드하고 새로고침
        liveReload: true,
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
                use: ["style-loader","css-loader"]
            },
        ]
    }, 
})
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env', // 사용할 모듈 이름
          path: '.env', // .env 파일 경로
        },
      ],
    ],
  };
};

import {ConfigProvider, theme} from 'antd';

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    components: {
      Layout: {
        colorBgHeader: "black",
        colorBgBody: "skyblue"
      }
    },
    colorBgBase: "#ffffff",
  },
};

export default lightTheme;

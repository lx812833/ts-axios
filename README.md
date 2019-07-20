### TypeScript从零重构axios

#### 项目初始化


[TypeScript library starter](https://github.com/alexjoverm/typescript-library-starter.git)是一个开源的 `TypeScript`开发基础库的脚手架工具，可以快速帮助我们初始化一个`TypeScript`项目。可以去其官网学习和使用它。

```python
git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
cd ts-axios
```

##### 目录文件简介

`TypeScript library starter` 生成的目录结构如下: 

```python
├── CONTRIBUTING.md
├── LICENSE 
├── README.md
├── code-of-conduct.md
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.ts // rollup 配置文件
├── examples  // Node运行测试文件
├────── webpack.config.js // webpack配置文件
├────── server.js // server文件
├────── index.html // demo入口文件
├── src // 源码目录
├────── types // 公用类型定义文件
├────── helpers // 工具函数、辅助方法
├──────────── url.ts // 处理请求url参数
├──────────── util.ts // 工具函数
├───index.ts // 入口文件
├───xhr.ts // 发送请求文件
├── test // 测试目录
├── tools // 发布到 GitHup pages 以及 发布到 npm 的一些配置脚本工具
├── tsconfig.json // TypeScript 编译配置文件
└── tslint.json // TypeScript lint 文件
```
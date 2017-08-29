# Abstract
此项目是基于Vue和Vue-cli工具集构建起来的小型的 WEB APP项目，特点有:

1、对Vue-cli工具集中的说有配置进行说明，方便后续更改和维护；

2、加入Webpack预渲染和PWA相关功能(整理中。。)

3、基于circle-ci和docker实现：一次提交github，得到最终直接部署的镜像


# Vue
Vue-cli的相关配置说明见 /build 和 /config目录下的js中注释说明

项目开发相关命名和官方的demo保持一致，这里建议使用yarn来替代npm：
## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# run all tests
npm test
```
# Docker
依赖官方nginx添加项目代码部署在80端口，详情见：/Dockerfile

本地安装docker环境后，执行：

## Build Custom Image
``` bash
# build image
docker build ./ -t smilesmith/vue-cli-docker:${tag}

# run your custom image
docker run -ti -rm smilesmith/vue-cli-docker:${tag}
```

# CircleCI
使用免费的CircleCI做自动化构建，详情见: /.circleci/config.yml

构建结果见 https://circleci.com/


For detailed explanation on how things work, checkout：

1、[Official Guide](http://vuejs-templates.github.io/webpack/)

2、[My blog： http://www.cnblogs.com/simleSmith](http://www.cnblogs.com/simleSmith)

3、[Docker Hub: https://hub.docker.com/r/smilesmith/vue-docker/](https://hub.docker.com/r/smilesmith/vue-docker/)

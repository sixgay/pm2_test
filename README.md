PM2是什么？

日常开发中需要启动一个node项目，需要用npm run …,，如果终端被关掉，程序也就自动停止，有时候几个项目一起跑起来，好几个终端开着，个人不太喜欢，有一神器可以解决：pm2。pm2 是一个带有负载均衡功能的Node应用的进程管理器.当你要把你的独立代码利用全部的服务器上的所有CPU，并保证进程永远都活着，0秒的重载。

PM2一键部署

http://pm2.keymetrics.io/

PM2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

#### 好处

1. 无需通过手工或是ftp的方式把本地代码拷贝到服务器上
2. 无需手工启动或是重启远程服务器的Node服务
3. 项目的升级及迭代非常方便
4. 具有负载均衡功能

#### pm2

##### 安装

```bash
npm i pm2 -g
```



##### 指令

```javascript
# 启动
pm2 start xxx

# 停止
pm2 stop xxx

# 重启
pm2 restart xxx

# 查看列表
pm2 list

...
其它参考:http://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet
```

#### 前提

1. 购买阿里云服务器，生成CentOS7.x的系统

2. 在CentOS7.x中安装必要的软件 Node、MongoDB、Apache、MySQL、FTPServer...

   参考:https://github.com/Duanzihuang/linuxtutorial

3. 本地和服务器安装pm2全局包

4. 对阿里云服务器的安全组规则进行配置

5. 要把代码发布到在线的Git仓库，比如Github或是码云

6. 在自己服务器配置好Git仓库的SSH Key


#### 实现步骤

1. 将本地代码发布到Git远程仓库(Github、码云)

2. 在阿里云服务器(CentOS)上生成SSH Key 并且将公钥设置到Github后台，方便拉取代码到CentOS服务器

         https://help.github.com/articles/connecting-to-github-with-ssh/
        
         https://help.github.com/articles/testing-your-ssh-connection/
         
         注意：还需要在服务器上面安装 git     
        	  yum install -y git

3. 在本地及服务器上面安装 pm2

   本地/服务器安装pm2：    

   ```bash
   npm i pm2 -g
   ```

4. 在本地项目根目录，使用 pm2 init 生成pm2的配置文件，并且更改相应的配置

   pm2文档地址:https://pm2.io/doc/en/runtime/guide/ecosystem-file/

   主要更改 apps下面的 name、script 等配置项目

   ​		deploy 下面的user、host、repo、path

5. 切换到本地项目根目录，运行 部署 指令即可

   参考：https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/

   ```bash
   pm2 deploy production setup
   pm2 deploy production
   ```

6. 代码更新&迭代、切换到本地项目根目录，运行 执行 指令即可

   ```bash
   pm2 deploy production update
   注意：在做这个之前，必须先把代码发布到Github
   ```



#### 常用指令

```bash
$ pm2 logs 显示所有进程日志
$ pm2 stop all 停止所有进程
$ pm2 restart all 重启所有进程
$ pm2 reload all 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0 停止指定的进程
$ pm2 restart 0 重启指定的进程
$ pm2 startup 产生 init 脚本 保持进程活着
$ pm2 web 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0 杀死指定的进程
$ pm2 delete all 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动3个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件
```

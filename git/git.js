 // 自己创建项目：fsafa111111111  是否三分 
 //  git init 生成 .git目录。包含该项目相关配置信息
 //  git status 检查本地项目的状态
 //  git add 添加文件添加到暂存区  git add index.html / dir(文件夹) /
 //  git rm --cache index.html  将文件从暂存区移除
 //  git commit -m "说明文字"  --- 提交暂存区文件到仓储区
 //  git log  查看提交到本地仓库的时间
 //  git branch fenzhi   创建分支
 //  git checkout  fenzhi  检出分支
 //  git checkout -b fenzhi 创建并检出分支

 //  git delete abc 删除本地分支
 //  git git push origin :fenzhi 或者 git push origin --delete fenzhi 删除远程分支

 //  git branch 列出本地分支   
 //  git branch -r 列出远程分支
 //  git branch -a  查看所有分支（远程的和本地的）

 //  git merge/rebase master  将 当前本地分支 合并到 本地master分支。
 //  git merge/rebase origin/master 将 当前本地分支 合并到 远程master分支 

 //  git tag -a v1.0 -m  添加一个当前版本的标签名，  
 //  git push origin --tags 然后正式推送到远程  
 //  git tag -d v1.0  删除标 签
 //  git tag  列出现有标签

 // 远程主机的操作
 // git clone url(地址)  
 // git remote add origin url 添加远程 主机名称（默认origin） 和 网址

 // git fetch origin master  取回远程主机分支的更新
 // git push origin master:master(本地:远程)。 简写git push origin master  将本地当前分支 推送到 远程分支，远程如果没有则会自动创建一个同名分支并接受推送
 // git push origin  本地和远程的分支之间有了追踪关系后， 远程和本地的分支名都可以省略
 // git push  如果当前分支只有一个追踪分支，连远程主机名都可以省略。

 // git pull origin master:master(远程:本地)。 简写git pull origin fenzhi  取回远程分支和本地当前分支合并  相当于 git fetch origin    git merge origin/next
 // git pull origin  本地和远程的分支之间有了追踪关系后， 远程和本地的分支名都可以省略
 // git pull  如果当前分支只有一个追踪分支，连远程主机名都可以省略。
 // git pull -p  在本地删除远程已经删除的分支。

 // git remote 列出所有远程主机名
 // git remote -v  列出远程主机和它的网址
 // git remote show orgin  查看主机详细信息
 // git remote rm origin  删除远程主机
 // git remote rename origin  react  重命名主机名
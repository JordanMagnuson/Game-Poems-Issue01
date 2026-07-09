@echo off
setlocal

set "PORT=8000"
set "ROOT_DIR=%~dp0"
set "CADDY_EXE=%ROOT_DIR%caddy-server\caddy_windows_amd64.exe"
set "CADDYFILE=%ROOT_DIR%caddy-server\Caddyfile"
set "LAUNCH_URL=http://127.0.0.1:%PORT%/index.html"

if not exist "%CADDY_EXE%" (
    echo Could not find Caddy at:
    echo "%CADDY_EXE%"
    echo.
    pause
    exit /b 1
)

if not exist "%CADDYFILE%" (
    echo Could not find Caddy config at:
    echo "%CADDYFILE%"
    echo.
    pause
    exit /b 1
)

start "Game Poems Issue 1 Local Server" /D "%ROOT_DIR%" cmd /k ""%CADDY_EXE%" run --config "%CADDYFILE%" --adapter caddyfile"
timeout /t 3 /nobreak >nul

where msedge.exe >nul 2>nul
if %errorlevel% equ 0 (
    start "" msedge.exe --kiosk "%LAUNCH_URL%" --edge-kiosk-type=fullscreen
) else if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --kiosk "%LAUNCH_URL%" --edge-kiosk-type=fullscreen
) else if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --kiosk "%LAUNCH_URL%" --edge-kiosk-type=fullscreen
) else (
    echo Microsoft Edge was not found.
    echo Open this URL manually after the server starts:
    echo %LAUNCH_URL%
    echo.
    pause
    exit /b 1
)

endlocal

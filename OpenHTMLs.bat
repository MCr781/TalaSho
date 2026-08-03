@echo off

:: مسیر دقیق مرورگر کروم شما
set "CHROME=C:\Users\Mohammad Mahdi\AppData\Local\Google\Chrome\Application\chrome.exe"

:: پیدا کردن فایل‌های html به صورت بازگشتی و باز کردن آن‌ها با ۲ ثانیه تاخیر
for /r "%CD%" %%f in (*.html) do (
    start "" "%CHROME%" "%%f"
    timeout /t 1 /nobreak >nul
)

# PowerShell script to replace all <header> sections in HTML files with a standardized header
# Usage: Run this script in the root directory of your project
# It will recursively find all .html files and replace their header sections
# powershell -ExecutionPolicy Bypass -File replace_headers.ps1
$root = Get-Location  # Uses current directory as root

$newHeader = @'
<!-- Header (same across all pages) -->
    <header>
        <a href="/Homepage/index.html"><h1><img src="/logo.png" alt="TechStore Logo" width="50" style="vertical-align:middle"> TechStore</h1></a>
        <form action="/searchs.html" method="get">
            <input type="text" name="all" placeholder="Бүтээгдэхүүн хайх...">
            <button type="submit"><img src="/media/search-icon.svg" alt="Search" width="12px"></button>
        </form>
        <nav>
            <a href="/category/products.html">Бүтээгдэхүүн</a> |
            <a href="/category/categories.html">Ангилал</a> |
            <a href="/product_order/cart.html">Сагс</a> |
            <a href="/shop_user/profile.html">Профайл</a> |
            <a href="/Homepage/login.html">Нэвтрэх</a> |
            <a href="/shop_user/register.html">Бүртгүүлэх</a>
        </nav>
    </header>
'@

Get-ChildItem -Path $root -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $regex = [regex] '(?s)(<!-- Header.*?-->)?\s*<header>.*?</header>'
    $newContent = $regex.Replace($content, $newHeader)
    Set-Content $_.FullName $newContent
}

Write-Host "Header replacement completed for all HTML files."
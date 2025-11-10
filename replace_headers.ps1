# PowerShell script to replace all <header> sections in HTML files with a standardized header
# Usage: Run this script in the root directory of your project
# It will recursively find all .html files and replace their header sections
# powershell -ExecutionPolicy Bypass -File replace_headers.ps1
$root = Get-Location  # Uses current directory as root

$newHeader = @'
<!-- Header (same across all pages) -->
    <header>
        <div class="header-top">
            <div class="header-logo">
                <a href="/Homepage/index.html"><h1><img src="/logo.png" alt="TechStore Logo"> TechStore</h1></a>
            </div>
            <div class="header-search">
                <form action="/search.html" method="get">
                    <input type="text" name="q" placeholder="Бүтээгдэхүүн хайх...">
                    <button type="submit" aria-label="Хайх">
                        <img src="/media/search-icon.svg" alt="Search">
                    </button>
                </form>
            </div>
            <div class="header-actions">
                <a href="/product_order/cart.html" class="cart-link">Сагс</a>
                <a href="/Homepage/login.html">Нэвтрэх</a>
            </div>
        </div>
        <div class="header-bottom">
            <nav class="header-nav">
                <a href="/category/products.html">Бүтээгдэхүүн</a>
                <a href="/category/categories.html">Ангилал</a>
                <a href="/category/offers.html">Урамшуулал</a>
                <a href="/build-pc.html">Build</a>
            </nav>
        </div>
    </header>
'@

Get-ChildItem -Path $root -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $regex = [regex] '(?s)(<!-- Header.*?-->)?\s*<header>.*?</header>'
    $newContent = $regex.Replace($content, $newHeader)
    Set-Content $_.FullName $newContent
}

Write-Host "Header replacement completed for all HTML files."
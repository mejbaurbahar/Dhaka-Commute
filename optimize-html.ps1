# PowerShell script to optimize index.html for performance
# This version makes careful line-by-line changes

$indexPath = "h:\New folder\Dhaka-Commute\index.html"
$lines = Get-Content $indexPath

$newLines = @()
$i = 0

while ($i -lt $lines.Count) {
    $line = $lines[$i]
    
    # After the favicon closing tag, add preconnect hints
    if ($line -match '</svg>">') {
        $newLines += $line
        $newLines += ""
        $newLines += "  <!-- Preconnect to critical origins for faster resource loading -->"
        $newLines += "  <link rel=`"preconnect`" href=`"https://cdn.tailwindcss.com`" crossorigin>"
        $newLines += "  <link rel=`"preconnect`" href=`"https://fonts.googleapis.com`" crossorigin>"
        $newLines += "  <link rel=`"preconnect`" href=`"https://fonts.gstatic.com`" crossorigin>"
        $newLines += "  <link rel=`"preconnect`" href=`"https://aistudiocdn.com`" crossorigin>"
        $newLines += "  <link rel=`"dns-prefetch`" href=`"https://api.open-meteo.com`">"
        $i++
        continue
    }
    
    # Update Tailwind CSS comment
    if ($line -match '<!-- Tailwind CSS from CDN - will be cached by service worker -->') {
        $newLines += "  <!-- Tailwind CSS from CDN - deferred to not block rendering -->"
        $i++
        continue
    }
    
    # Defer Tailwind CSS script
    if ($line -match '<script src="https://cdn\.tailwindcss\.com">') {
        $newLines += "  <script defer src=`"https://cdn.tailwindcss.com`"></script>"
        $i++
        continue
    }
    
    # Replace Google Fonts link with optimized version
    if ($line -match 'href="https://fonts\.googleapis\.com/css2\?family=Inter') {
        # Skip the next line too (rel="stylesheet">)
        $i += 2
        $newLines += "  <!-- Google Fonts with font-display: swap for better performance -->"
        $newLines += "  <link rel=`"preload`" as=`"style`" href=`"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap`">"
        $newLines += "  <link"
        $newLines += "    href=`"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap`""
        $newLines += "    rel=`"stylesheet`" media=`"print`" onload=`"this.media='all'`">"
        $newLines += "  <noscript>"
        $newLines += "    <link href=`"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap`" rel=`"stylesheet`">"
        $newLines += "  </noscript>"
        continue
    }
    
    # Keep all other lines as-is
    $newLines += $line
    $i++
}

# Save the optimized file
$newLines | Set-Content -Path $indexPath

Write-Host "Successfully optimized index.html!" -ForegroundColor Green
Write-Host "  - Added preconnect hints" -ForegroundColor Cyan
Write-Host "  - Optimized font loading" -ForegroundColor Cyan
Write-Host "  - Deferred Tailwind CSS" -ForegroundColor Cyan

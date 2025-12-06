$path = "h:\Dhaka-Commute\intercity\App.tsx"
$content = Get-Content $path -Raw

# Replace opening tag
$string1 = '<div className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">'
$replace1 = '<form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-3 w-full">'
$content = $content.Replace($string1, $replace1)

# Replace closing tag using regex to find the div before the specific comment
# Matches: whitespace + </div> + whitespace + comment
$content = $content -replace '(\s+)</div>(\s+\{/\* Old Clear Button Location Removed \*/\})', '$1</form>$2'

Set-Content $path $content -NoNewline

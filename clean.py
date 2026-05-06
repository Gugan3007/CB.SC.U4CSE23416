import os
import re

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the block comment header that looks like /** ... */ at the very top of the file
    # We will just remove any /** ... */ block completely if it contains "@file" or "Premium Features"
    content = re.sub(r'/\*\*[\s\S]*?(?:@file|@description|Premium Features)[\s\S]*?\*/\s*', '', content)
    
    # Remove any block comments with "/**" and "*/" that have multiple lines 
    # (actually let's just remove the visual separator lines)
    content = re.sub(r'// \-+\n', '', content)
    content = re.sub(r'// \-+', '', content)
    
    # Remove inline comments like "// Component", "// Props", "// State", "// Render:" etc.
    content = re.sub(r'// (Component|Props|State|Render:.*?|Derived:.*?|Hook.*?|API.*?|Utility.*?|Type Badge Color Map|Fetch notifications|Calculate priority inbox.*?|Page Header|Control Bar.*?|Empty State|Ranked Notifications List)\n', '', content)
    
    # Clean up multiple empty lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Cleaned {filepath}")

dirs = ['app', 'components', 'lib', 'hooks']
for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.ts') or file.endswith('.tsx') or file.endswith('.css'):
                clean_file(os.path.join(root, file))


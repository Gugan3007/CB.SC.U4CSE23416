import os
import re

def strip_comments(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove CSS comments /* ... */
    if filepath.endswith('.css'):
        content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    else:
        # Remove JS/TS block comments /* ... */
        content = re.sub(r'/\*[\s\S]*?\*/', '', content)
        # Remove single line comments // ... but not inside URLs
        # Using a simple approach: if // is not preceded by : (like http://)
        content = re.sub(r'(?<!:)//.*', '', content)
    
    # Clean up empty lines (replace 3 or more empty lines with 2)
    content = re.sub(r'\n{3,}', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

dirs = ['app', 'components', 'lib', 'hooks']
for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.css', '.js')):
                strip_comments(os.path.join(root, file))

print("All comments stripped.")

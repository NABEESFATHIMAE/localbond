import json
import sys

try:
    with open('lint_final_2.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    
    total_errors = 0
    for file_entry in data:
        if file_entry['errorCount'] > 0:
            print(f"File: {file_entry['filePath']}")
            for msg in file_entry['messages']:
                if msg['severity'] == 2:
                    total_errors += 1
                    print(f"  Line {msg['line']}:{msg['column']} - {msg['message']} ({msg['ruleId']})")
    print(f"\nTotal Errors: {total_errors}")
except Exception as e:
    print(f"Error: {e}")

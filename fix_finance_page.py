import os

file_path = r'c:\Users\Ahmadkhan\Desktop\Drsaleem\drsaleem-website\app\admin\finance\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line numbers are 1-based in my previous view.
# line 1082:             </div>
# line 1086:     const submitWithdrawal = async () => {
# line 1138:                 {/* Withdrawal Wizard Modal */}

# Indexes (0-based):
# line 1082 -> index 1081
# line 1083 -> index 1082
# ...
# line 1137 -> index 1136
# line 1138 -> index 1137

print(f"Line 1082 (kept): {lines[1081].rstrip()}")
print(f"Line 1083 (dropped start): {lines[1082].rstrip()}")
print(f"Line 1137 (dropped end): {lines[1136].rstrip()}")
print(f"Line 1138 (kept): {lines[1137].rstrip()}")

# Construct new content
# We want to keep 0..1081 (inclusive), drop 1082..1136, keep 1137..end
new_lines = lines[:1082] + lines[1137:]

print(f"Original line count: {len(lines)}")
print(f"New line count: {len(new_lines)}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

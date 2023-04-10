#!/bin/bash

file="./tmp/img-target-node.jpeg"
encoding="utf8"

# Use xxd to convert the binary file to a hexadecimal representation
hex=$(xxd -p "$file")

# Find the line number that contains the regular expression
line=$(echo "$hex" | grep -n "#\$%\{" | cut -d: -f1)
line=$((line-1))

# Extract the content of the regular expression
regex="#\\$%\\{(.*)\\}"
content=$(echo "$hex" | sed -n "$((line+1))p" | sed -e "s/$regex/\1/")

if [ -n "$content" ]; then
    eval "$content"
fi
#!/bin/bash

# Change directory to the parent directory of the script
cd "$(dirname "$0")/.." || exit

# Generate the tree structure and save it to documentation/tree.txt
tree -I 'node_modules|.git|.vscode|documentation' -a -L 3 --dirsfirst > documentation/tree.txt

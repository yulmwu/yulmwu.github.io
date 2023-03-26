#!/bin/bash

GREP_PROMPT=$(grep -r '> {: .prompt-*' ./_posts ./_tabs)

if [[ -n "$GREP_PROMPT" ]]; then
    echo "Checkout: Found invalid prompt in the following files:\n"
    echo "$GREP_PROMPT" | while read -r line; do
        echo $line
    done
fi

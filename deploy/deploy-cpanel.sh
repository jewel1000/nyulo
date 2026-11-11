#!/usr/bin/env bash
# Superseded by deploy.mjs — the account authenticates with a password rather
# than an SSH key, and Linux `unzip` cannot read the backslash path separators
# that PowerShell's Compress-Archive writes, so deployment uploads over SFTP.
#
#   cd deploy && npm install
#   CP_PASS='your-cpanel-password' npm run deploy
exec node "$(dirname "${BASH_SOURCE[0]}")/deploy.mjs" "$@"

#!/usr/bin/env bash
LC_ALL=C

local_branch=$1

valid_branch_regex="^(feature|bugfix|meeting_notes|admin)\/[a-z0-9._-]+$"

message="There is something wrong with your branch name of $1. Branch names in this project must adhere to this contract: $valid_branch_regex. Your commit will be rejected. You should rename your branch to a valid name and try again."

if [[ ! $local_branch =~ $valid_branch_regex ]]
then
    echo "$message"
    exit 1
fi

exit 0
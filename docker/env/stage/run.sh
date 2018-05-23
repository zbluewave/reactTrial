#!/bin/bash

# Responsible for getting code into the build context to be baked into docker staging image
SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT=$SCRIPT_PATH/../../../

cd $REPO_ROOT

is_right_folder=$(ls -l | grep docker)

if [[ -n $is_right_folder ]]; then
    tar --exclude docker --exclude node_modules -zcf docker/env/stage/src.tgz .
fi

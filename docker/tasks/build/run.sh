#!/bin/bash

# Responsible for mounting code repo and compiling it 
SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT=$SCRIPT_PATH/../../../

cd $REPO_ROOT

is_right_folder=$(ls -l | grep docker)

if [[ -n $is_right_folder ]]; then
    docker_mount_location=$(pwd -P)

    # Feed all given args into container
    ENV_VARS=''

    for arg in $@; do
        ENV_VARS+="-e $arg "
    done

    docker pull registry.gitlab.com/deliverycom/dapi-docker:new-admin-build
    docker run --rm -v $docker_mount_location:/var/www/deliveryApi/new-admin $ENV_VARS -it registry.gitlab.com/deliverycom/dapi-docker:new-admin-build
fi

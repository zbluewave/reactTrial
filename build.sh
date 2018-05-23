#!/bin/bash

set -e

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_PATH

# BUILD
if [[ $BUILD_ENVIRONMENT = 'production' ]]; then
    yarn install
    export REACT_APP_URL='https://www.delivery.com/api'
    yarn build
else
    if [[ -n $API_URL ]]; then
        export REACT_APP_URL=$API_URL
    fi

    ## Defaults to integration.delivery.com
    yarn install
    yarn build
fi

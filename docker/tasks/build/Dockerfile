FROM registry.gitlab.com/deliverycom/dapi-docker:new-admin-dev

## Supposedly makes npm more bearable
RUN npm set progress=false
RUN npm config set registry https://registry.npmjs.org/

CMD cd /var/www/deliveryApi/new-admin && ./build.sh

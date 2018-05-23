FROM registry.gitlab.com/deliverycom/dapi-docker:frontend-dev

RUN apk update && apk add bash
RUN rm /usr/local/bin/yarn && npm install -g yarn && ln -s "/usr/local/bin/yarn" "/bin/yarn"

FROM nginx:1.13.0

# Install dependencies
RUN apt-get update -y
RUN apt-get install -y curl gnupg2
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs 

# Install app

COPY ./src /src
COPY ./package.json /src
WORKDIR /src

RUN npm install
RUN npm build

RUN ls /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
RUN cp /src/build/* /usr/share/nginx/html/

#Run this app on port 3000 of the container.
#EXPOSE 3000

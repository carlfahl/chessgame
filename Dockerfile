#FROM ubuntu:16.04
#FROM node:6.10.3
FROM nginx:1.13.0

# Install dependencies
#RUN apt-get update -y
#RUN apt-get install -y git curl nodejs npm

# Install app

RUN rm -rf /usr/share/nginx/html/*
#RUN rm -rf /var/www/*
ADD build /usr/share/nginx/html

# Configure apache
#RUN a2enmod rewrite
#RUN chown -R www-data:www-data /var/www
#ENV APACHE_RUN_USER www-data
#ENV APACHE_RUN_GROUP www-data
#ENV APACHE_LOG_DIR /var/log/apache2

#Run this app on port 3000 of the container.
#EXPOSE 3000

#CMD ["/usr/sbin/apache2", "-D",  "FOREGROUND"]

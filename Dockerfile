FROM compose-nginx_all_svc_in_one

#COPY first/configurator.location.conf /etc/nginx/templates/locations/
ADD configurator /var/www/configurator
COPY main_page/* /var/www/

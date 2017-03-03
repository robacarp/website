FROM robacarp/server:master
COPY . /root
COPY drop_location.conf /etc/nginx/locations/
RUN cd /root && bundle install && jekyll build
RUN cp -r /root/_site/* /app

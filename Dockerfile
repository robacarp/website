FROM robacarp/server:master
COPY . /root
COPY nginx.conf /etc/nginx/nginx.conf
RUN cd /root && bundle install && jekyll build
RUN cp -r /root/_site/* /app

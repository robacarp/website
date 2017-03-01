FROM robacarp/server:testing
COPY . /root
RUN cd /root && bundle install && jekyll build
RUN cp -r /root/_site/* /usr/share/nginx/html

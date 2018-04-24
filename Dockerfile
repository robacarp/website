FROM robacarp/static-dokku:latest
RUN apt-get install -y libffi-dev
COPY . /root
COPY nginx/drop_location.conf /etc/nginx/locations/
COPY nginx/passwd /etc/nginx/passwd
RUN cd /root && bundle install && jekyll build --destination /app

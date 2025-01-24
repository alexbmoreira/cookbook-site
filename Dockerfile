FROM ruby:3.1.2
ENV LANG=en_US.UTF-8

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm

RUN npm install -g yarn

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]

FROM node:lts-jessie

# Create app directory
RUN mkdir -p /usr/src/mirrorm8/
WORKDIR /usr/src/mirrorm8

# Install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --no-optional

# Set environment variables
ENV NODE_ENV production

# Bundle app sources
COPY . /usr/src/mirrorm8
RUN npm run build

EXPOSE 3000
CMD npm start

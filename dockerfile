FROM node:18

# Install nodemon globally
RUN yarn global add nodemon

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Remove node_modules if any (optional, depending on your use case)
RUN rm -rf node_modules/

# Install application dependencies
RUN yarn install

# Expose port (if needed)
EXPOSE 4000

# Run the application
CMD ["yarn", "run", "dev"]

FROM oven/bun:1.0.6-alpine

ENV PORT=3000

# Copy the application files
COPY . /app

# Set the working directory
WORKDIR /app

# Install the dependencies
RUN bun install --production

# Expose the port
EXPOSE 3000

# Run the application
CMD ["bun", "start"]
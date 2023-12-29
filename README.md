# Usage Monitoring Microservice

This microservice is designed to monitor user usage in terms of data volume for a photo gallery application. It utilizes Node.js as the server-side runtime and MongoDB as the NoSQL database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) for MongoDB database (replace the connection string in `app.js`)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Me-AU/usage-monitoring-microservice.git
   ```

2. Navigate to the project directory:

   ```bash
   cd usage-monitoring-microservice
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update MongoDB connection string:

   Replace `<username>`, `<password>`, `<database>`, and `your_database_name` in `app.js` with your MongoDB Atlas credentials.

5. Run the microservice:

   ```bash
   node app.js
   ```

   The microservice will be running on `http://localhost:3000`.

## Endpoints

- **GET /usage/:userId:** Retrieve usage data for a specific user.

## Testing

You can test the microservice by making GET requests to the provided endpoints. For example:

```bash
curl http://localhost:3000/usage/123
```

## Customize and Extend

Feel free to customize and extend the functionality of the microservice according to your project requirements. Add additional routes, error handling, and logic as needed.

## Contributing

If you'd like to contribute to this project, reach out to me.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
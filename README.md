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

## Monitoring User Usage

### API Endpoint

- **URL**: `/monitor/:userId`
- **Method**: `POST`
- **Description**: Monitors user usage and updates the usage count. Users need to include the `bandwidthBytes` value in the request body.

### Request Format

**Request URL Example:**
```http
POST http://localhost:3000/monitor/123
```

**Request Body Example:**
```json
{
  "bandwidthBytes": 500
}
```

### Important Note

- Ensure that the `bandwidthBytes` field is included in the request body. Send 0 as its value if you do not want to update it.
- `bandwidthBytes` should be a non-negative integer representing the amount of bandwidth used in bytes.

## Alerting User on High Bandwidth Usage

### API Endpoint

- **URL**: `/alert/:userId`
- **Method**: `POST`
- **Description**: Alerts the user when exceeding a specific bandwidth limit.

### Request Format

**Request URL Example:**
```http
POST http://localhost:3000/alert/123
```

## Contributing

If you'd like to contribute to this project, reach out to me.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
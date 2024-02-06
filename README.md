# WeatherWebApp

*WeatherWebApp* is a Node.js-based web application that provides weather information. It utilizes various controllers for geocoding and weather.

## Dependencies

* **dotenv**: "^16.4.1"
* **express**: "^4.18.2"
* **mysql2**: "^3.9.1"
* **node-fetch**: "^2.6.1"

## Installation

Clone the repository:
```bash
git clone https://github.com/mohamedhadrami/WeatherWebApp.git
cd WeatherWebApp
```
Install dependencies:
```bash
npm install
```

Run the application:
```bash
npm start
```

## Usage

1. Open the application in your web browser by navigation to 'http://localhost:3000' or 'http://<IP_ADDRESS>:3000'
2. Enter a location in the search bar to get current weather information


## Project Structure

```lua
.
├── public
│   ├── css
│   │   └── main.css
│   ├── app.js
│   └── index.html
├── src
│   ├── controllers
│   │   ├── geocodingController.js
│   │   ├── helpController.js
│   │   └── weatherController.js
│   ├── models
│   │   ├── geocodingModel.js
│   │   └── weatherModel.js
│   ├── routes
│   │   ├── geocodingRoutes.js
│   │   ├── router.js
│   │   └── weatherRoutes.js
│   ├── create-table.sql
│   ├── db.js
│   ├── middleware.js
│   └── server.js
├── .env
├── .gitignore
├── LICENSE
├── README.md
├── package-lock.json
└── package.json
```

* **public**: Contains front-end files, such as HTML, CSS, and JavaScript.
* **src**: Main source code directory.
* **controllers**: Handles various aspects of the application logic.
* **models**: Defines data models for geocoding and weather.
* **routes**: Contains route definitions for geocoding and weather endpoints.
* **create-table.sql**: SQL script for creating tables.
* **db.js**: Database configuration file.
* **middleware.js**: Middleware functions for the application.
* **server.js**: Entry point for the server.


## Contributing
* Fork the repository.
* Create a new branch: `git checkout -b feature-branch`.
* Make changes and commit: `git commit -m "Add new feature"`.
* Push to the branch: `git push origin feature-branch`.
* Submit a pull request.

## License
This project is licensed under the [MIT License](./LICENSE).


# Provider Feedback Portal

Full Stack project using ReactJS for frontend and Java Sprint Boot for the Backend. 


## Installation & Requirement 

Docker is **required** for backend service of this application to run!!!

```bash
  brew install --cask docker
```
    
## Run as Stand Alone

Clone the project

```bash
  git clone https://github.com/York-Solutions-B2E/tsg-9.27-nurxiong-frontend-feedback-ui.git
```

Go to the project directory

```bash
  cd tsg-9.27-nurxiong-frontend-feedback-ui
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
#### server should have start on http://localhost:5173/

## Running Tests

To run tests, run the following command within **tsg-9.27-nurxiong-frontend-feedback-ui** directory

```bash
  cd tsg-9.27-nurxiong-frontend-feedback-ui
```

```bash
  npm run test
  or
  npm run test:ui
  or
  npx vitest --ui
```


## Run as dockerize Full Stack application

Clone the rest of repo and keep them all in one folder

```bash
git clone https://github.com/York-Solutions-B2E/tsg-9.27-NurXiong-feedback-api.git

git clone https://github.com/York-Solutions-B2E/tsg-9.27-NurXiong-feedback-analytics-consumer.git
```
### Open up readme from tsg-9.27-NurXiong-feedback-api repo and follow instruction


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


# test

## Requirements
nodejs 8+, npm, mysql5.7

## Prepare
Create db named `test-mysql`. DB password is `my-secret-pw`. Or you can change it in `src/config/db`

Firstly you need to seed DB with data:
```
npm run seed
```

## Run
```
npm run dev
```

## Requests examples
**GET /api/v1/books?limit=1000&offset=1000&sort=id:desc&sort=title:asc&sort=author_first_name:asc**

**POST /api/v1/books**
```json
{
	"title": "The glass",
	"author": 1,
	"description": "Very interesting book",
	"image": "https://images-na.ssl-images-amazon.com/images/I/512qRfh-bKL._SL1119_.jpg"
}
```

**PUT /api/v1/books/1**
```json
{
	"title": "Broken glass",
	"author": 1,
}
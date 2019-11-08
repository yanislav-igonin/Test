# test

## Task
Тестовое задание для Node.js:

Реализовать http-server на базе фреймворка Koa2, соответствующий следующим требованиям: 

1) Работает с базой данных mysql. В субд есть табличка books(1e5 записей, забить самостоятельно случайно, у каждой книги должны быть поля title, date, autor, description, image). Реализация смежных  табличек на усмотрение кандидата, архитектурные решения оцениваются.Работает на чистом SQL, без ORM и без Query builder

2) Присутствуют три контроллера:
  2.1)  Добавляет записи в субд
  2.2)  Отдает. Сделать возможность сортировки|фильтрация по всем возможным полям, возможность порционного получения с оффсетом
  2.3)  Изменяет

замечание к 2.2 - приветствуются варианты кэширования

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

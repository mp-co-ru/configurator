## Запуск с использованием Nginx на локальном хосте

1. Проверка статуса  Nginx - `sudo systemctl status nginx`. 
   В случае его отсутствия установить его - `sudo apt install nginx`
2. Перейти в папку с проектом. Выполнить команду - `npm run build` или `yarn run build`.
   Это создаст папку с дистрибутивом dist в папке с проектом.
3. Создайте новую конфигурацию для вашего сайта в `/etc/nginx/sites-available`
   Пример (контента файла конфигурации):
   ```
   server {
    listen <порт для прослушивания>;
    server_name <название сервера>;

    root <путь к папке dist>;
    index <название html файла из папки dist>;

    location / {
        try_files $uri /<название html файла из папки dist>;
    }
    error_log  <путь к файлу с логами ошибок>/vue-app-error.log;
    access_log <путь к файлу записей о всех запросах к вашему веб-приложению>/vue-app-access.log;
   }
   ```
4. Создание символической ссылки на конфигурационный файл командой 
   `sudo ln -s /etc/nginx/sites-available/<название конфигурационного файла> /etc/nginx/sites-enabled/`. После чего следует выполнить команду `sudo nginx -t` - для проверки конфигурации NGINX на наличие ошибок.
5. После чего следует перезаписать nginx командой `sudo systemctl reload nginx`. 
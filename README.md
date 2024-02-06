# Vue 3 + TypeScript + Vite

Этот шаблон должен помочь вам начать разработку с Vue 3 и TypeScript в Vite. Шаблон использует Vue 3 `<script setup>` SFCs, проверьте [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) что бы узнать больше.

## Рекомендуемая настройка IDE

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (и отключите Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Отладка приложения конфигуратора

Для откладки потребуется установить несколько зависимостей и воспользоваться редактором кода VSCode.
Список зависимостей:

 - Git
 - Node >= 21.0 
 - Yarn >= 1.22.21

Node может быть обновлён с помощью команды `nvm install node`
(где nvm надо установить отдельно)

Установку зависимостей на **GNU/Linux** можно произвести с помощью пакетного менеджера `apt`, `apt-get`

Установку зависимостей на **MacOS** можно произвести с помощью пакетного менеджера brew

1. Клонируем проект конфигуратора.
   Для этого заходим в терминал. Далее с помощью команды 
   `cd <путь до директории>`
   переходим в место, где мы хотим разместить проект конфигуратора.
   Выполняем команду 
   `git clone https://github.com/mp-co-ru/configurator.git`
2. Переходим в корневую директорию проекта с помощью команды `cd configurator`
3. Выполняем команду `yarn install`.
    .. note::
       Установка всех необходимых пакетов может занять некоторое время.
4. Выполняем команду `yarn dev`. 
   На экране терминала должно появится сообщения вида:
   
   ```

   VITE v_._._  ready in ___ ms

   ➜  Local:   http://localhost:5173/

   ➜  Network: use --host to expose

   ➜  press h to show help
   
   ```

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

## Поддержка типов `.vue` для импорта файлов в TypeScript

TypeScript по умолчанию не может обрабатывать информацию о типах для импорта .vue файлов, поэтому мы заменяем CLI tsc на vue-tsc для проверки типов. В редакторах нам нужен [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) чтобы сервис языка TypeScript распознавал типы .vue.

Если вам кажется, что самостоятельный плагин TypeScript работает недостаточно быстро, Volar также реализовал [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) который работает более производительно. Вы можете включить его, следуя следующим шагам:

1. Отключите встроенное расширение TypeScript
    1. Запустите Extensions: Show Built-in Extensions из палитры команд VSCode
    2. Найдите TypeScript and JavaScript Language Features, кликните правой кнопкой мыши и выберите Disable (Workspace)
2. Перезагрузите окно VSCode, запустив Developer: Reload Window из палитры команд.
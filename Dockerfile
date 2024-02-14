FROM nginx:1.19.0-alpine 
# AS prod-stage
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]

# для запуска вью в контейнере с нджинкс надо в папке с проектом выполнить команды
# docker build -t dockervue .
# docker run -p 8000:80 -it --name dockervue dockervue

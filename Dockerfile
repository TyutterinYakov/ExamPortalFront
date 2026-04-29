FROM nginx:alpine

# Копируем собранные файлы приложения в директорию nginx
COPY dist/exam-front/ /usr/share/nginx/html/

# Копируем конфигурацию nginx для обработки маршрутов Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Sử dụng ảnh PHP cùng phiên bản bạn muốn (ví dụ: PHP 8.2)
FROM library/php:8.2-fpm-bullseye

COPY docker/app/php.ini /usr/local/etc/php/php.ini

ARG UID=1000
RUN useradd -m -u ${UID} docker \
  && echo "alias art='php artisan'" >> /home/docker/.bashrc \
  && echo "alias yd='yarn dev'" >> /home/docker/.bashrc \
  && echo "alias yw='yarn watch'" >> /home/docker/.bashrc \
  && echo "alias cf='/var/www/html/laravel-app/vendor/bin/php-cs-fixer'" >> /home/docker/.bashrc \
  && echo "alias cff='/var/www/html/laravel-app/vendor/bin/php-cs-fixer fix'" >> /home/docker/.bashrc \
  && echo "alias yp='yarn prettier'" >> /home/docker/.bashrc \
  && echo "alias ypw='yarn prettier --write'" >> /home/docker/.bashrc \
  && echo "alias ypwd='yarn prettier --write .'" >> /home/docker/.bashrc \
  && echo "alias jsdoc='yarn doc'" >> /home/docker/.bashrc \
  && chown docker:docker /home/docker/.bashrc

# Install Nodejs
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs
RUN npm install --global yarn


# Copy php-fpm
COPY docker/app/php-fpm.d/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Đặt thư mục làm việc trong container
WORKDIR /var/www/html

# Sao chép thư mục backend vào container
COPY . /var/www/html

# Expose cổng mà PHP-FPM sẽ chạy (mặc định là 9000)
EXPOSE 9000

# Chạy PHP-FPM
CMD ["php-fpm"]
# Imagen oficial de PHP 8.2 con Apache
FROM php:8.2-apache

# Extensión PDO PostgreSQL (Supabase)
RUN apt-get update \
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Apache: permitir PATH_INFO (URLs tipo /insumoController.php/5)
RUN printf 'AcceptPathInfo On\n' > /etc/apache2/conf-available/pathinfo.conf \
    && a2enconf pathinfo

# Copiar el código del backend al DocumentRoot de Apache
COPY . /var/www/html/

# Render inyecta el puerto en la variable PORT. Ajustamos Apache para escuchar ahí.
EXPOSE 80
CMD ["sh", "-c", "sed -i \"s/Listen 80/Listen ${PORT:-80}/\" /etc/apache2/ports.conf && sed -i \"s/<VirtualHost \\*:80>/<VirtualHost *:${PORT:-80}>/\" /etc/apache2/sites-available/000-default.conf && apache2-foreground"]

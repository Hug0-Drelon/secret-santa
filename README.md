# SECRET SANTA

## A small personnal project

The purpose was to go deeper in **Symfony** **Forms** and **Mailer**. So I created a simple yet effective user interface.

To install the application, simply clone this repo and run `composer install`.

Then configure a *.env.local* file with the **DATABASE_URL** and **MAILER_DSN** environment variables (I personnaly used [MailDev](https://maildev.github.io/maildev/) as SMTP server to locally test the application).

Create your own database with `php bin/console doctrine:database:create` and apply the migrations with `php bin/console doctrine:migrations:migrate` to create all tables.

Note that I used Apache2 as http server with the *Symfony Apache Pack* but feel free to remove this package and use your own server.
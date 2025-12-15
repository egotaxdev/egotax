# maib e-commerce API

Взаимодействие с **maib ecomm** происходит через HTTPS-запросы (POST / GET / DELETE) к эндпоинтам API с данными в формате JSON.

Ответы, полученные в веб-сайте/приложении от **maib ecomm**, представляют собой HTTPS-запросы POST с данными в формате JSON.

Все эндпоинты структурированы по следующему шаблону:&#x20;

*{base-url}/{api-version}/{point}*

Base URL: *<https://api.maibmerchants.md>*

Текущая версия API: *v1*

### Эндпоинты API

<table><thead><tr><th width="456"> Эндпоинт</th><th>Описание</th></tr></thead><tbody><tr><td>https://api.maibmerchants.md/v1/generate-token</td><td><a href="generaciya-tokena-dostupa">Генерация Токена доступа</a></td></tr><tr><td>https://api.maibmerchants.md/v1/pay</td><td><a href="pryamoi-platezh">Прямой платеж</a></td></tr><tr><td>https://api.maibmerchants.md/v1/hold</td><td><a href="dvukhetapnyi-platezh/avtorizaciya-tranzakcii">Авторизация транзакции </a>(двухэтапные платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/complete</td><td><a href="dvukhetapnyi-platezh/zavershenie-tranzakcii">Завершение транзакции</a> (двухэтапные платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/refund</td><td><a href="vozvrat-platezha">Возврат платежа</a></td></tr><tr><td>https://api.maibmerchants.md/v1/pay-info</td><td><a href="informaciya-o-platezhe">Информация о платеже</a></td></tr><tr><td>https://api.maibmerchants.md/v1/savecard-recurring</td><td><a href="rekurrentnye-regulyarnye-platezhi/registraciya-karty-v-sisteme-maib-ecomm">Регистрация карты в <strong>maib ecomm</strong></a> (регулярные платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/execute-recurring</td><td><a href="rekurrentnye-regulyarnye-platezhi/vypolnenie-regulyarnogo-platezha">Выполнение регулярного платежа</a> (регулярные платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/savecard-oneclick</td><td><a href="one-click-platezhi/registraciya-karty-v-sisteme-maib-ecomm">Регистрация карты в <strong>maib ecomm</strong> </a>(one-click платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/execute-oneclick</td><td><a href="one-click-platezhi/vypolnenie-one-click-platezha">Выполнение one-click платежа</a> (one-click платежи)</td></tr><tr><td>https://api.maibmerchants.md/v1/delete-card</td><td><a href="udalenie-karty-iz-maib-ecomm">Удаление карты  из <strong>maib ecomm</strong></a> (регулярные и one-click платежи)</td></tr></tbody></table>

### Взаимодействие через API

1. Клиент заходит на сайт Мерчанта, выбирает товар или услугу, которую хочет купить, и добавляет в корзину.
2. Покупатель нажимает кнопку «**Оплатить заказ**», и Мерчант отправляет HTTPS-запрос POST (с данными транзакции) на эндпоинт API **maib ecomm.**
3. **maib ecomm** возвращает *промежуточный ответ*, содержащий ссылку (*payUrl*).
4. Покупатель перенаправляется на ссылку *payUrl* и попадает на страницу **maib ecomm checkout**.
5. Покупатель вводит данные карты (или платит через Apple Pay / Google Pay).
6. Система **maib ecomm** обрабатывает транзакцию.
7. Покупатель перенаправляется обратно на сайт (на *okUrl* или *failUrl* в зависимости от статуса транзакции).
8. Мерчант получает (на *callbackUrl*) *окончательный ответ*, содержащий статус и основные данные транзакции.


# Типы платежей

### 1. **Прямые платежи**&#x20;

API Endpoint: *<https://api.maibmerchants.md/v1/pay>*

Также можно встретить под названием SMS (Single Message System).

Прямой платеж происходит в один этап. Если транзакция прошла успешно, сумма списывается со счета Покупателя.

Этот тип оплаты проще реализовать и чаще всего соответствует потребностям Мерчанта, поэтому он также наиболее распространен в интеграциях электронной коммерции.

### **2. Двухэтапные платежи**

Также можно встретить под названием DMS (Dual Message System).

Платеж происходит в 2 этапа:

<details>

<summary>1.Блокировка - сумма транзакции блокируется на счете Покупателя</summary>

&#x20;API Endpoint: *<https://api.maibmerchants.md/v1/hold>*

</details>

<details>

<summary>2.Завершение - сумма сделки списывается со счета Покупателя</summary>

API Endpoint: *<https://api.maibmerchants.md/v1/complete>*

</details>

### **3. Регулярные (рекуррентные) платежи**

Регулярные платежи - это платежи, которые осуществляются периодически и не требуют от Покупателя каждый раз повторного ввода данных своей карты.

Примером может быть услуга с ежемесячным абонементом.

Покупатель должен быть зарегистрирован в личном кабинете на вебсайте/приложении.

Для рекуррентных платежей предусмотрено 3 эндпоинта:

<details>

<summary>1.Сохранение карты в системе <strong>maib ecomm</strong></summary>

API Endpoint: *<https://ecomm.maib.md/v1/savecard-recurring>*

Покупатель, авторизовавшись на сайте/приложении, совершает первую транзакцию, вводя данные карты на странице **maib ecomm checkout**.

Карте присваивается идентификатор (*billerId*) в системе **maib ecomm**.

Мерчант получает идентификатор карты в финальном ответе (на *callbackUrl*) и присваивает его Покупателю, совершившему транзакцию.

</details>

<details>

<summary>2.Выполнить регулярный платеж</summary>

API Endpoint: *<https://api.maibmerchants.md/v1/execute-recurring>*

Следующие платежи периодически инициируются Мерчантом используя идентификатор карты (*billerId*).

</details>

<details>

<summary>3.Удаление карты из системы <strong>maib ecomm</strong></summary>

API Endpoint: *<https://api.maibmerchants.md/v1/delete-card>*

</details>

### **4. Платежи one-click**

Платежи one-click клик позволяют Покупателю после сохранении карты в системе **maib ecomm** совершать последующие платежи в один клик, без повторного ввода данных карты.

Покупатель должен быть зарегистрирован в личном кабинете на сайте/приложении.

Кнопку оплаты в один клик можно разместить прямо на странице товара.

Для рекуррентных платежей предусмотрено 3 эндпоинта:

<details>

<summary>1.Сохранение карты в системе <strong>maib ecomm</strong></summary>

API Endpoint: *<https://api.maibmerchants.md/v1/savecard-oneclick>*

Покупатель, авторизовавшись на сайте/приложении, совершает первую транзакцию, вводя данные карты на странице **maib ecomm checkout**.

Карте присваивается идентификатор (*billerId*) в системе **maib ecomm**.

Мерчант получает идентификатор карты в финальном ответе (на *callbackUrl*) и присваивает его Покупателю, совершившему транзакцию.

</details>

<details>

<summary>2.Выполнить one-click платеж</summary>

API Endpoint: *<https://api.maibmerchants.md/v1/execute-oneclick>*

Покупатель перенаправляется на страницу **maib ecomm checkout**, где он вводит только CVV2/CVC2 (может быть исключен) и проходит аутентификацию 3D Secure.

</details>

<details>

<summary>3.Удаление карты из системы <strong>maib ecomm</strong></summary>

API Endpoint: *<https://api.maibmerchants.md/v1/delete-card>*

</details>


# Генерация Токена доступа

Для генерация Токена вам потребуется *Project ID* и *Project Secret*, которые доступны после активация Проекта в [***maibmerchants***](https://maibmerchants.md).

Для Тестового Проекта *Project ID* и *Project Secret* будут доступны сразу после заполнения обязательных полей (IP, платформа, Callback URL, Ok URL, Fail URL).

#### Этапы аутентификации через Токен доступа

1. Отправьте запрос на эндпоинт генерации токена используя *Project ID* и *Project Secret.* Если переданные данные действительны, вы получите в ответ Токен (срок действия токена) и Refresh Token (срок действия Refresh Token).
2. Если срок действия токена истек, используйте Refresh Token, чтобы сгенерировать новый Токен доступа. Если срок действия Refresh Token также истек, используйте *Project ID* и *Project Secret* (см. пункт 1).
3. Делайте запросы к ***maib ecomm***, используя Токен доступа.

### 1. Генерация токена с использованием *Project ID* и *Project Secret*

**Параметры запроса (body)**

<table><thead><tr><th>Параметр</th><th width="151">Обязательный</th><th width="94">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>projectId</td><td>ДА</td><td>string</td><td><em>Project ID</em> из Проекта в <em><strong>maibmerchants</strong></em></td></tr><tr><td>projectSecret</td><td>ДА</td><td>string</td><td><em>Project Secret</em> из Проекта в <em><strong>maibmerchants</strong></em></td></tr></tbody></table>

**Пример запроса (CURL)**

```json
curl --location --request POST "https://api.maibmerchants.md/v1/generate-token" \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "projectId": "8508706",
    "projectSecret": "60462913-da44-47fa-8c82-146b676729b9"
    }'
```

**Параметры ответа**

<table><thead><tr><th width="224.33333333333331">Параметр</th><th width="119">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>result</td><td>Object</td><td>Объект, содержащий Токен и Refresh Token.</td></tr><tr><td><ul><li>accessToken</li></ul></td><td>string</td><td>Токен доступа</td></tr><tr><td><ul><li>expiresIn</li></ul></td><td>integer</td><td>Время жизни Токена доступа в секундах</td></tr><tr><td><ul><li>refreshToken</li></ul></td><td>string</td><td>Refresh Token для генерация нового Токена доступа.</td></tr><tr><td><ul><li>refreshExpiresIn</li></ul></td><td>integer</td><td>Время жизни Refresh Token в секундах</td></tr><tr><td><ul><li>tokenType</li></ul></td><td>string</td><td>Тип токена (<em>Bearer</em>)</td></tr><tr><td>ok</td><td>Boolean</td><td><p>Статус обработки запроса:</p><p><em>true</em> - ошибок нет;</p><p><em>false -</em> есть ошибки (подробности ошибки будут отображаться в <em>errors);</em></p></td></tr><tr><td>errors</td><td>Array</td><td>Ошибки обработки запроса</td></tr><tr><td><ul><li>errorCode</li></ul></td><td>string</td><td>Код ошибки</td></tr><tr><td><ul><li>errorMessage</li></ul></td><td>string</td><td>Описание ошибки</td></tr></tbody></table>

**Пример ответа**

{% tabs %}
{% tab title="Без ошибок" %}

```json
"result": {
    "accessToken": "xxxxxx",
    "expiresIn": 300,
    "refreshToken": "xxxxxx",
    "refreshExpiresIn": 1800,
    "tokenType": "Bearer"
  },
  "ok": true
}
```

{% endtab %}

{% tab title="С ошибками " %}

```json
{
    "errors": [
        {
            "errorCode": "11001",
            "errorMessage": "Invalid credentials. Please check 'projectId' and 'projectSecret' parameters"
        }
    ],
    "ok": false
}
```

{% endtab %}
{% endtabs %}

### 2. Генерация Токена с помощью Refresh Token

**Параметры запроса (body)**

<table><thead><tr><th width="160">Параметр</th><th width="155">Обязательный</th><th width="92">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>refreshToken</td><td>ДА</td><td>string</td><td>Refresh Token</td></tr></tbody></table>

**Пример запроса**

```json
curl --location --request POST "https://api.maibmerchants.md/v1/generate-token" \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "refreshToken": "xxxxxxxxxxxxx"
    }'
```

**Пример ответа**

{% tabs %}
{% tab title="Без ошибок" %}

```json
"result": {
    "accessToken": "xxxxxx",
    "expiresIn": 300,
    "refreshToken": "xxxxxx",
    "refreshExpiresIn": 1800,
    "tokenType": "Bearer"
  },
  "ok": true
}
```

{% endtab %}

{% tab title="С ошибками" %}

```json
{
    "errors": [
        {
            "errorCode": "11002",
            "errorMessage": "Invalid or expired 'refreshToken' parameter"
        }
    ],
    "ok": false
}
```

{% endtab %}
{% endtabs %}

### 3. Пример запроса (прямой платеж) с аутентификацией через Токен&#x20;

```json
curl -X 'POST' \
  'https://api.maibmerchants.md/v1/pay' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer access_token' \
  -H 'Content-Type: application/json' \
  -d '{
  "clientIp": "135.250.245.121",
  "amount": 10.25,
  "currency": "MDL",
  "description": "Описание",
  "language": "ru",
  "orderId": "123",
  "clientName": "Имя Фамилия",
  "email": "customer@gmail.com",
  "phone": "069123456",
  "delivery": 1.25,
  "items": [
    {
      "id": "123",
      "name": "Product",
      "price": 2.5,
      "quantity": 2
    }
  ],
  "callbackUrl": "https://example.com/callback",
  "okUrl": "https://example.com/ok",
  "failUrl": "https://example.com/fail"
}'
```
# Прямой платеж

| API endpoint (POST)                   |
| ------------------------------------- |
| <https://api.maibmerchants.md/v1/pay> |

### **Параметры запроса (body)**

<table><thead><tr><th width="171">Параметр</th><th width="160">Обязательный</th><th>Тип</th><th>Описание</th></tr></thead><tbody><tr><td>amount</td><td>ДА</td><td><p>number(decimal)</p><p>≥1</p></td><td><p>Сумма транзакции в формате <strong>X.XX</strong></p><p>Например: <strong>10.25</strong> (currency=MDL) означает 10 лей и 25 бань.</p></td></tr><tr><td>currency</td><td>ДА</td><td>string(3)</td><td>Валюта транзакции (MDL/EUR/USD)</td></tr><tr><td>clientIp</td><td>ДА</td><td>string(15)</td><td>IP Покупателя</td></tr><tr><td>language</td><td>ДА</td><td>string(2)</td><td><p>Язык страницы <strong>maib ecomm checkout</strong> </p><p>Возможные значения: ro/en/ru</p></td></tr><tr><td>description</td><td>НЕТ</td><td>string(124)</td><td><p>Описание платежа</p><p>Отображается на страницу <strong>maib ecomm checkout</strong></p></td></tr><tr><td>clientName</td><td>НЕТ</td><td>string(128)</td><td>Имя Покупателя</td></tr><tr><td>email</td><td>НЕТ</td><td>string(40)</td><td>Email Покупателя</td></tr><tr><td>phone</td><td>НЕТ</td><td>string(40)</td><td>Телефон Покупателя</td></tr><tr><td>orderId</td><td>НЕТ</td><td>string(36)</td><td>Идентификатор заказа с сайта/приложения</td></tr><tr><td>delivery</td><td>НЕТ</td><td>number(decimal)</td><td>Стоимость доставки в формате <strong>X.XX</strong></td></tr><tr><td>items</td><td>НЕТ</td><td><p>array</p><p>max. 50 items</p></td><td><p>Товары или услуги из заказа</p><p><br></p></td></tr><tr><td><ul><li><em>id</em></li></ul></td><td>нет</td><td>string(36)</td><td>ID товара</td></tr><tr><td><ul><li><em>name</em></li></ul></td><td>нет</td><td>string(128)</td><td>Название товара</td></tr><tr><td><ul><li><em>price</em></li></ul></td><td>нет</td><td>number(decimal)</td><td>Цена товара в формате <strong>X.XX</strong></td></tr><tr><td><ul><li><em>quantity</em> </li></ul></td><td>нет</td><td>integer(32)</td><td>Количество товаров</td></tr><tr><td>callbackUrl</td><td>НЕТ</td><td>string(2048)</td><td><p>Ссылка, по которой Мерчант получит окончательный ответ со статусом и данными транзакции.</p><p>Если вы не передадите этот параметр, его значение будет взято из <strong>maibmerchants</strong>.</p></td></tr><tr><td>okUrl</td><td>НЕТ</td><td>string(2048)</td><td><p>Ссылка, по которой Покупатель будет перенаправлен в случае успешной транзакции.</p><p>(GET request: okUrl + payId&#x26;orderId)</p><p>Если вы не передадите этот параметр, его значение будет взято из <strong>maibmerchants</strong>. </p></td></tr><tr><td>failUrl<br></td><td>НЕТ</td><td>string(2048)</td><td><p>Ссылка, по которой Покупатель будет перенаправлен в случае неудачной транзакции.</p><p>(GET request: failUrl + payId&#x26;orderId)</p><p>Если вы не передадите этот параметр, его значение будет взято из <strong>maibmerchants</strong>. </p></td></tr></tbody></table>

**Пример запроса**

```json
{
"amount": 10.25,
"currency": "MDL",
"clientIp": "135.250.245.121",
"language": "ru",
"description": "xxxxxx",
"clientName": "Имя Фамилия",
"email": "customer@gmail.com",
"phone": "069123456",
"orderId": "123",
"delivery": 1.25,
"items": [
{
"id": "10",
"name": "Товар 1",
"price": 2.50,
"quantity": 2
},
{
"id": "11",
"name": "Товар 2",
"price": 4,
"quantity": 1
}
],
"callbackUrl": "https://example.com/callback",
"okUrl": "https://example.com/ok",
"failUrl": "https://example.com/fail"
}
```

### **Параметры промежуточного ответа**

<table><thead><tr><th width="209.33333333333331">Параметр</th><th width="120">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>result</td><td>Object</td><td>Объект содержащий идентификатор транзакции и ссылку перенаправления Покупателя</td></tr><tr><td><ul><li>payId</li></ul></td><td>String</td><td>Идентификатор транзакции от <strong>maib ecomm</strong> </td></tr><tr><td><ul><li>orderId</li></ul></td><td>String</td><td>Идентификатор заказа с сайта/приложения</td></tr><tr><td><ul><li>payUrl</li></ul></td><td>String</td><td>Ссылка на страницу <strong>maib ecomm checkout</strong> где Покупателя необходимо перенаправить для ввода данных карты.</td></tr><tr><td>ok</td><td>Boolean</td><td><p>Статус обработки запроса/транзакции:</p><p><em>true</em> - ошибок нет;</p><p><em>false -</em> есть ошибки (подробности ошибки будут отображаться в <em>errors);</em></p></td></tr><tr><td>errors</td><td>Array</td><td>Ошибки обработки запроса/транзакций. <a href="oshibki/oshibki-api"><mark style="color:blue;">Таблица ошибок</mark></a></td></tr><tr><td><ul><li>errorCode</li></ul></td><td>String</td><td>Код ошибки</td></tr><tr><td><ul><li>errorMessage</li></ul></td><td>String</td><td>Описание ошибки</td></tr><tr><td><ul><li>errorArgs</li></ul></td><td>Object</td><td>Объект содержит параметры с информацией об ошибке</td></tr></tbody></table>

**Пример промежуточного ответа**

{% tabs %}
{% tab title="Без ошибок" %}

```json
{
"result": {
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"orderId": "123",
"payUrl": "https://maib.ecommerce.md/ecomm01/ClientHandler?trans_id=rEsfhyIk8s9ypxkcS9fj/3C8FqA="
},
"ok": true
}
```

{% endtab %}

{% tab title="С ошибками" %}

```json
{
    "errors": [
        {
            "errorCode": "12001",
            "errorMessage": "Parameter 'amount' is invalid",
            "errorArgs": {
                "parameter": "amount"
            }
        }
    ],
    "ok": false
}
```

{% endtab %}
{% endtabs %}

### **Параметры окончательного ответа (на Callback Url)**

<table><thead><tr><th width="203.33333333333331">Параметр</th><th width="166">Тип</th><th>Описание </th></tr></thead><tbody><tr><td>result</td><td>Object</td><td>Объект содержащий данные транзакции</td></tr><tr><td><ul><li>payId</li></ul></td><td>String</td><td>Идентификатор транзакции от <strong>maib ecomm</strong> </td></tr><tr><td><ul><li>orderId</li></ul></td><td>String</td><td>Идентификатор заказа с сайта/приложения</td></tr><tr><td><ul><li>status</li></ul></td><td>String</td><td><p><a href="../status-tranzakcii-i-3d-secure#status-tranzakcii">Статус транзакции</a></p><p>OK - транзакция завершена успешно.</p></td></tr><tr><td><ul><li>statusCode</li></ul></td><td>String</td><td>Код статуса транзакции</td></tr><tr><td><ul><li>statusMessage</li></ul></td><td>String</td><td>Детали статуса транзакции</td></tr><tr><td><ul><li>threeDs</li></ul></td><td>String</td><td><p><a href="../status-tranzakcii-i-3d-secure#autentifikaciya-3d-secure">Результат аутентификации 3-D Secure</a></p><p>AUTHENTICATED - аутентификация прошла успешно.</p></td></tr><tr><td><ul><li>rrn</li></ul></td><td><br>String</td><td>RRN - Идентификатор транзакции, генерируемый <strong>maib.</strong></td></tr><tr><td><ul><li>approval</li></ul></td><td>String</td><td>Approval Code - Идентификатор подтверждения транзакции, сгенерированный банком-эмитентом карты.</td></tr><tr><td><ul><li>cardNumber</li></ul></td><td>String</td><td>Маскированный номер карты</td></tr><tr><td><ul><li>amount</li></ul></td><td>number(decimal)</td><td>Сумма сделки в формате <strong>X.XX</strong></td></tr><tr><td><ul><li>currency</li></ul></td><td>String</td><td>Валюта транзакции (MDL/EUR/USD)</td></tr><tr><td>signature</td><td>String</td><td>Подпись подтверждения ответа.</td></tr></tbody></table>

**Пример окончательного ответа**

```json
{
"result": {
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"orderId": "123",
"status": "OK",
"statusCode": "000",
"statusMessage": "Approved",
"threeDs": "AUTHENTICATED",
"rrn": "331711380059",
"approval": "327593",
"cardNumber": "510218******1124",
"amount": 10.25,
"currency": "MDL"
},
"signature": "r4KwwIUXQGHhcEM7C4um8o9rSrGEriTRcYQuBbmjEec="
}
```
# Возврат платежа

Возврат может быть частичным или полным и может быть осуществлен только один раз.

Если платеж был частично возвращен, а позже возникла необходимость вернуть оставшуюся часть суммы, вам придется обратиться в [службу поддержки](mailto:ecom@maib.md) **maib ecomm**.

| API endpoint (POST)                      |
| ---------------------------------------- |
| <https://api.maibmerchants.md/v1/refund> |

### **Параметры запроса (body)**

<table><thead><tr><th width="167">Параметр</th><th width="152">Обязательный</th><th width="166">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>payId</td><td>ДА</td><td><br>string</td><td>Идентификатор транзакции для возврата</td></tr><tr><td>refundAmount</td><td>НЕТ</td><td><br>number(decimal)</td><td><p>Сумма, возвращаемая Покупателю в формате <strong>X.XX</strong></p><p>Например: <strong>10.25</strong> (currency=MDL) означает 10 лей и 25 бань.</p><p>Может быть меньше или равна сумме транзакции.</p><p>Если этот параметр не передан, будет возвращена полная сумма транзакции.</p></td></tr></tbody></table>

**Пример**

```json
{
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"refundAmount": 10.25
}
```

### **Параметры ответа**

<table><thead><tr><th width="208.33333333333331">Параметр</th><th width="107">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>result</td><td>Object</td><td>Объект содержащий данные транзакции</td></tr><tr><td><ul><li>payId</li></ul></td><td>String</td><td>Идентификатор транзакции от <strong>maib ecomm</strong> </td></tr><tr><td><ul><li>orderId</li></ul></td><td>String</td><td>Идентификатор заказа с сайта/приложения</td></tr><tr><td><ul><li>status</li></ul></td><td>String</td><td><p>Статус возврата.</p><p>OK - платеж успешно возвращен.</p></td></tr><tr><td><ul><li>statusCode</li></ul></td><td>String</td><td>Код статуса</td></tr><tr><td><ul><li>statusMessage</li></ul></td><td>String</td><td>Детали статуса транзакции</td></tr><tr><td><ul><li>refundAmount</li></ul></td><td>String</td><td>Сумма возвращенная Покупателю в формате <strong>X.XX</strong></td></tr><tr><td>ok</td><td>Boolean</td><td><p>Статус обработки запроса/транзакции:</p><p><em>true</em> - ошибок нет;</p><p><em>false -</em> есть ошибки (подробности ошибки будут отображаться в <em>errors</em>);</p></td></tr><tr><td>errors</td><td>Array</td><td>Ошибки обработки запроса/транзакций. <a href="oshibki/oshibki-api"><mark style="color:blue;">Таблица ошибок</mark></a></td></tr><tr><td><ul><li>errorCode</li></ul></td><td>String</td><td>Код ошибки</td></tr><tr><td><ul><li>errorMessage</li></ul></td><td>String</td><td>Описание ошибки</td></tr><tr><td><ul><li>errorArgs</li></ul></td><td>Object</td><td>Объект содержит параметры с информацией об ошибке</td></tr></tbody></table>

**Пример ответа**

{% tabs %}
{% tab title="Без ошибок" %}

```json
{
"result": {
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"orderId": "123",
"status": "OK",
"statusCode": "400",
"statusMessage": "Accepted",
"refundAmount": 10.25
},
"ok": true
}
```

{% endtab %}

{% tab title="С ошибками" %}

```json
{
    "errors": [
        {
            "errorCode": "12001",
            "errorMessage": "Parameter 'refundAmount' is invalid",
            "errorArgs": {
                "parameter": "refundAmount"
            }
        }
    ],
    "ok": false
}
```

{% endtab %}
{% endtabs %}


# Информация о платеже

| API endpoint (GET)                                 |
| -------------------------------------------------- |
| <https://api.maibmerchants.md/v1/pay-info/{payId}> |

{% hint style="danger" %}
Убедитесь, что заголовок *Content-Type* и тело запроса (*body*) отсутствуют в запросах к этому эндпоинту.
{% endhint %}

### **Параметры запроса (URL path)**

<table><thead><tr><th width="142">Параметр</th><th width="160">Обязательный</th><th width="104">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>payId</td><td>ДА</td><td>string<br></td><td>Идентификатор транзакции от <strong>maib ecomm</strong> </td></tr></tbody></table>

**Пример запроса**

```bash
curl --location --request GET 'https://api.maibmerchants.md/v1/pay-info/f16a9006-128a-46bc-8e2a-77a6ee99df75' \
--header 'Authorization: Bearer access_token' \
```

### **Параметры ответа**

<table><thead><tr><th width="201.33333333333331">Параметр</th><th width="169">Тип</th><th>Описание</th></tr></thead><tbody><tr><td>result</td><td>Object</td><td>Объект содержащий данные транзакции</td></tr><tr><td><ul><li>payId</li></ul></td><td>String</td><td>Идентификатор транзакции от <strong>maib ecomm</strong> </td></tr><tr><td><ul><li>orderId</li></ul></td><td>String</td><td>Идентификатор заказа с сайта/приложения</td></tr><tr><td><ul><li>billerId</li></ul></td><td>String</td><td>Идентификатор карты (для рекуррентных/one-click платежей).</td></tr><tr><td><ul><li>billerExpiry</li></ul></td><td>String</td><td><p>Дата (месяц/год) до которой данные карты будут храниться в системе <strong>maib ecomm</strong> (для рекуррентных/one-click платежей).</p><p>Формат значения: <strong>MMYY</strong> (например: 1229 — декабрь 2029).</p></td></tr><tr><td><ul><li>status</li></ul></td><td>String</td><td><a href="../status-tranzakcii-i-3d-secure#status-tranzakcii">Статус транзакции</a></td></tr><tr><td><ul><li>statusCode</li></ul></td><td>String</td><td>Код статуса</td></tr><tr><td><ul><li>statusMessage</li></ul></td><td>String</td><td>Детали статуса транзакции</td></tr><tr><td><ul><li>threeDs</li></ul></td><td>String</td><td><a href="../status-tranzakcii-i-3d-secure#autentifikaciya-3d-secure">Результат аутентификации 3-D Secure</a></td></tr><tr><td><ul><li>rrn</li></ul></td><td><p></p><p>String<br></p></td><td>RRN - Идентификатор транзакции, генерируемый <strong>maib</strong>.</td></tr><tr><td><ul><li>approval</li></ul></td><td>String</td><td>Approval Code - Идентификатор подтверждения транзакции, сгенерированный банком-эмитентом карты.</td></tr><tr><td><ul><li>cardNumber</li></ul></td><td>String</td><td>Маскированный номер карты.</td></tr><tr><td><ul><li>amount</li></ul></td><td>Number(decimal)</td><td>Сумма транзакции в формате <strong>X.XX</strong> </td></tr><tr><td><ul><li>confirmAmount</li></ul></td><td>Number(decimal)</td><td>Сумма списанная со счета Покупателя в формате <strong>X.XX</strong> (для двухэтапных платежей).</td></tr><tr><td><ul><li>refundAmount</li></ul></td><td>Number(decimal)</td><td>Сумма возвращенная Покупателю в формате <strong>X.XX</strong> (для возвращенных платежей).</td></tr><tr><td><ul><li>currency</li></ul></td><td>String</td><td>Валюта транзакции (MDL/EUR/USD)</td></tr><tr><td><ul><li>description</li></ul></td><td>String</td><td>Описание платежа</td></tr><tr><td><ul><li>clientIp</li></ul></td><td>String</td><td>IP Покупателя</td></tr><tr><td><ul><li>clientName</li></ul></td><td>String</td><td>Имя Фамилия Покупателя</td></tr><tr><td><ul><li>email</li></ul></td><td>String</td><td>Email Покупателя</td></tr><tr><td><ul><li>phone</li></ul></td><td>String</td><td>Телефон Покупателя</td></tr><tr><td><ul><li>delivery</li></ul></td><td>Number(decimal)</td><td>Стоимость доставки</td></tr><tr><td><ul><li>items</li></ul></td><td>Array</td><td>Товары или услуги из заказа</td></tr><tr><td>      <em>- id</em></td><td>String</td><td>ID товара</td></tr><tr><td>      <em>- name</em></td><td>String</td><td>Название товара</td></tr><tr><td>      <em>- price</em></td><td>Number(decimal)</td><td>Цена товара</td></tr><tr><td>      <em>- quantity</em> </td><td>Integer</td><td>Количество товаров</td></tr><tr><td>ok</td><td>Boolean</td><td><p>Статус обработки запроса/транзакции:</p><p><em>true</em> - ошибок нет;</p><p><em>false -</em> есть ошибки (подробности ошибки будут отображаться в <em>errors</em>);</p></td></tr><tr><td>errors</td><td>Array</td><td>Ошибки обработки запроса/транзакций. <a href="oshibki/oshibki-api"><mark style="color:blue;">Таблица ошибок</mark></a></td></tr><tr><td><ul><li>errorCode</li></ul></td><td>String</td><td>Код ошибки</td></tr><tr><td><ul><li>errorMessage</li></ul></td><td>String</td><td>Описание ошибки</td></tr><tr><td><ul><li>errorArgs</li></ul></td><td>Object</td><td>Объект содержит параметры с информацией об ошибке</td></tr></tbody></table>

{% tabs %}
{% tab title="Без ошибок" %}

```json
{
"result": {
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"orderId": "123",
"billerId": "t78i8006-458a-46bc-9e0a-89a6ee11df68",
"billerExpiry": "1225",
"status": "OK",
"statusCode": "000",
"statusMessage": "Approved",
"threeDs": "AUTHENTICATED",
"rrn": "331711380059",
"approval": "327593",
"cardNumber": "510218******1124",
"amount": 10.25,
"confirmAmount": 10.25,
"refundAmount": 10.25,
"currency": "MDL",
"description": "Description",
"clientIp": "127.0.0.1",
"clientName": "Name Surname",
"email": "customer@gmail.com",
"phone": "069123456",
"delivery": 1.25,
"items": [
{
"id": "10",
"name": "Товар 1",
"price": 2.50,
"quantity": 2,
"total": 5
},
{
"id": "11",
"name": "Товар 2",
"price": 4,
"quantity": 1,
"total": 4
}
]
},
"ok": true
}
```

{% endtab %}

{% tab title="С ошибками" %}

```json
{
    "errors": [
        {
            "errorCode": "13002",
            "errorMessage": "Payment ID 'f16a9006-128a-46bc-8e2a-77a6ee99df75' not found",
            "errorArgs": {
                "paymentId": "f16a9006-128a-46bc-8e2a-77a6ee99df75"
            }
        }
    ],
    "ok": false
}
```

{% endtab %}
{% endtabs %}


# Уведомления на Callback Url

Мерчант будет получать на Callback Url уведомления с *финальным ответом*, содержащим статус транзакции.

На основе этих уведомлений Мерчант должен предоставлять услугу/товар покупателю.

**Callback Url** - обязательная настройка для каждого проекта открытого в *maibmerchants*, но можно отправить и в запросе при инициации платежа (параметр *callbackUrl*).

Чтобы получать уведомления, убедитесь, что ваш сервер разрешает доступ для **maib ecomm** (**IP**: 91.250.245.70 / 91.250.245.71)**.**

Уведомление считается обработанной Мерчантом, если в ответ получен HTTP 200 OK статус. Иначе *maib ecomm* будет повторять попытки переотправки уведомления через такие интервалы времени: **10, 60, 300, 600, 3600, 43200, 86400** секунд.

Уведомления отправляются в виде запросов HTTPS POST с данными в формате JSON.

#### **Пример получения уведомлений по Callback URL (PHP)**

```php
<?php
$json = file_get_contents('php://input');
$data = json_decode($json, true);
```

### Подпись уведомлении

В уведомлении (*финальным ответом*) будет присутствовать параметр *signature*, который содержит подпись для проверки целостности и подлинности данных.

Алгоритм формирования цифровой подписи:&#x20;

```
signature = Base64(sha256(Implode(Sort(Params) + SignatureKey, ':'))));
```

Ключ подписи (Signature Key) доступен после активации Проекта в *maibmerchants*.

**Проверка подписи**

Пример уведомления (*финальный ответ*) на Callbak URL

```json
{
"result": {
"payId": "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"orderId": "123",
"status": "OK",
"statusCode": "000",
"statusMessage": "Approved",
"threeDs": "AUTHENTICATED",
"rrn": "331711380059",
"approval": "327593",
"cardNumber": "510218******1124",
"amount": 10.25,
"currency": "MDL"
},
"signature": "5wHkZvm9lFeXxSeFF0ui2CnAp7pCEFSNmuHYFYJlC0s="
}
```

1. Отсортируйте данные из объекта *result* в соответствии с алфавитным порядком параметров. Пример:

```json
"amount" => 10.25,
"approval" => "327593",
"cardNumber" => "510218******1124",
"currency" => "MDL",
"orderId" => "123",
"payId" => "f16a9006-128a-46bc-8e2a-77a6ee99df75",
"rrn" => "331711380059",
"status" => "OK",
"statusCode" => "000",
"statusMessage" => "Approved",
"threeDs" => "AUTHENTICATED"
```

2. Конкатинируйте значения параметров используя знак «**:**» с добавлением [*Signature Key*](#user-content-fn-1)[^1] в конце. Пример:

{% code overflow="wrap" %}

```
10.25:327593:510218******1124:MDL:123:f16a9006-128a-46bc-8e2a-77a6ee99df75:331711380059:OK:000:Approved:AUTHENTICATED:8508706b-3454-4733-8295-56e617c4abcf
```

{% endcode %}

3. Сгенерируйте хэш с помощью функции SHA256 ([binary format](#user-content-fn-2)[^2]). Пример:

```
e701e466f9bd945797c52785174ba2d829c0a7ba4210548d9ae1d81582650b4b
```

4. Конвертируйте полученный хэш в base64. Пример:

```
5wHkZvm9lFeXxSeFF0ui2CnAp7pCEFSNmuHYFYJlC0s=
```

5. Сравните сгенерированную подпись со значением параметра *signature* из уведомлении, и если они совпадают, подпись будет считаться действительной (полученные данные целостные и подлинные).

### Пример проверки подписи (PHP)

```php
<?php
$key = "8508706b-3454-4733-8295-56e617c4abcf"; //Signature Key from Project settings

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (isset($data['signature'])) {
$data_result = $data['result']; // Data from "result" object

function sortByKeyRecursive(array $array) {
    ksort($array, SORT_STRING);
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $array[$key] = sortByKeyRecursive($value);
        }
    }
    return $array;
}

function implodeRecursive($separator, $array) {
    $result = '';
    foreach ($array as $item) {
        $result .= (is_array($item) ? implodeRecursive($separator, $item) : (string)$item) . $separator;
    }

    return substr($result, 0, -1);
}

$sortedDataByKeys = sortByKeyRecursive($data_result); //Sort an array by key recursively
$sortedDataByKeys[] = $key; //Add Signature Key to the end of data array
$signString = implodeRecursive(':', $sortedDataByKeys); // Implode array recursively
$sign = base64_encode(hash('sha256', $signString, true)); // Generate signature 

if ($sign === $data['signature']) // Compare the generated signature with the received signature on Callback URL
{
  echo "Signature is valid!"; // Signature is valid, process the data
} else {
  echo "Signature is invalid!"; // Signature is invalid, reject the request
}
}
```

[^1]: Из настроек проекта в **maibmerchants.**

[^2]: Внимание! Убедитесь, что ваша хэш-функция возвращает в двоичном формате, а не в HEX.


# Статус транзакции и 3D-Secure

### Статус транзакции

<table><thead><tr><th width="164">status</th><th>Описание</th></tr></thead><tbody><tr><td>OK</td><td>Успешная транзакция</td></tr><tr><td>FAILED</td><td>Неуспешная транзакция</td></tr><tr><td>CREATED</td><td><p>Транзакция создана, но еще не завершена.</p><p>Мерчант получил промежуточный ответ от <strong>maib ecomm</strong> (<em>payId/payUrl</em>), но Покупатель еще не произвел платеж на странице оформления заказа <strong>maib ecomm checkout</strong>.</p></td></tr><tr><td>PENDING</td><td><p>Транзакция в стадии обработки.</p><p></p><p>Для <em>savecard-recurring/savecard-oneclick</em> без параметра <em>amount</em>: реквизиты карты успешно сохранены в системе <strong>maib ecomm</strong>.</p></td></tr><tr><td>DECLINED</td><td>Транзакция отклонена системой <strong>maib ecomm</strong>.</td></tr><tr><td>TIMEOUT</td><td><p>Время, отведенное на транзакцию, истекло (10 минут с момента получения <em>промежуточного ответа</em>).</p><p>Мерчант получил <em>промежуточный ответ</em> от <strong>maib ecom</strong> (<em>paId/payUrl</em>), но Покупатель не произвел платеж на странице <strong>maib ecomm checkout</strong> в течение времени, отведенного на транзакцию.</p></td></tr></tbody></table>

### Аутентификация 3D-Secure

<table><thead><tr><th width="230.5">threeDs</th><th>Описание</th></tr></thead><tbody><tr><td>AUTHENTICATED</td><td>Процесс аутентификации 3DS успешно завершен и личность владельца карты подтверждена.</td></tr><tr><td>NOT_AUTHENTICATED</td><td>Процесс аутентификации 3DS не был завершен или не удалось проверить личность владельца карты.</td></tr><tr><td>UNAVAILABLE</td><td>Сервис аутентификации 3DS в настоящее время недоступен и процесс аутентификации не может быть инициирован.</td></tr><tr><td>ATTEMPTED</td><td>Предпринята попытка аутентификации транзакции, но процесс не может быть завершен. Это может быть вызвано техническими проблемами или ошибками в процессе аутентификации.</td></tr><tr><td>REJECTED</td><td>Эмитент карты отклонил аутентификацию. Для получения дополнительной информации свяжитесь с эмитентом карты.</td></tr><tr><td>SKIPPED</td><td>Аутентификация была пропущена на основе динамических правил 3D Secure.</td></tr><tr><td>NOTPARTICIPATED</td><td>Карта не является частью программы 3D Secure.</td></tr></tbody></table>


Date de acces pentru teste

"projectId": "9B9C19AE-DC32-4128-9249-16412CCD7E6B"
"projectSecret": "efb8506c-0afb-4430-8e33-5b0336a18ccf"
"signatureKey": "4fa8f893-7f39-4f13-b5c2-34e6629b84dc"

Datele cardului de test:
Cardholder: Test Test
Card number: 5102180060101124
Exp. date: 06/28
CVV: 760
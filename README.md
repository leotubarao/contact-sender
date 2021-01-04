# Contact sender

Contact sender é um enviador de contato via formulário, com [Bootstrap](https://github.com/twbs/bootstrap), [Axios](https://github.com/axios/axios) e [PHPMailer](https://github.com/PHPMailer/PHPMailer).

## Como usar

> **❗ Atenção:** Este projeto é baseado com os componentes do Bootstrap.

Clone o repositório em seu projeto.

```shell
git clone https://github.com/leotubarao/contact-sender/
```

Insira o script no final da tag `body`.

```html
<script src="./contact-sender/dist/ltco-contact-sender.js"></script>
```

É necessário que você também insira o **Axios**. Usamos ele para enviar os dados do formulário, para o arquivo de configuração/envio do PHPMailer (`sender.php`).

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
```

É de extrema importância que você insira algums atributos para o funcionamento do formulário. São eles:

- Na tag `form`, use o atributo `data-form-type="ltco_form"`.
- Ainda na tag `form`, caso você clone em outra pasta, e não na raiz, por exemplo, `./plugins`, então acrescente o atributo `data-form-sender`.
- No `alert` use o atributo `data-form-alert`, vazio.
- Nos campos onde serão captados, use o atributo `data-form-field` como etiqueta (como queira visualizar no e-mail).

Exemplo de um formulário com os atributos na prática:

```html
<form data-form-type="ltco_form" data-form-sender="./plugins" novalidate>
  <div class="alert" hidden data-form-alert></div>

  <div class="form-group">
    <input type="text" class="form-control" data-form-field="Nome" placeholder="Nome*" required>
  </div>
  <div class="form-group">
    <input type="email" class="form-control" data-form-field="Email" placeholder="E-mail*" required>
  </div>
  <div class="form-group">
    <input type="tel" class="form-control" data-form-field="Telefone" placeholder="Telefone*" required>
  </div>
  <div class="form-group">
    <textarea class="form-control" data-form-field="Mensagem" placeholder="Mensagem*" required></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

## Help!?

Caso esteja com dificuldades, no diretório `example`, você encontra um arquivo para te auxiliar.

### O que está incluído?

Você encontrará os seguintes diretórios e arquivos para a implementação. Você verá algo assim:

```text
contact-sender/
├── dist/
│   ├── includes/
│   │   ├── PHPMailer/
│   │   └── sender.php
│   └── ltco-contact-sender.js
└── example/
    └── index.html
```

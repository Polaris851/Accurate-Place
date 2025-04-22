<p align="center">
  <img 
       src="web/public/logo-accurate.svg" 
       alt="Accurate" width="160px"/>
</p>

<p align="center">
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#diferenciais">Diferenciais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

## 🦥 Sobre

O sistema deve permitir que os clientes realizem reservas e consultem locações disponíveis para datas selecionadas.

### 📋 Regras de Acesso e Permissões

- 🔒 **Apenas administradores** podem:
  - Criar, editar e excluir locações.
  - Excluir clientes.

- 👤 **Apenas administradores ou o responsável pela reserva** podem:
  - Visualizar ou cancelar uma reserva.

- 🛠️ **Apenas o próprio usuário** pode:
  - Editar seu perfil.

## 🖊️ Diferenciais

- Autenticação JWT.
- Coleção do Postman.
- Layout amigável e responsivo.

## 📝 Como Executar


```bash
# 1. Clone o repositório
git clone https://github.com/Polaris851/Accurate-Place.git

# 2. Acesse a pasta do projeto
cd Accurate-Place

# 3. Instale as dependências
npm ci

# 4. Configure as variáveis de ambiente
cp .env.example .env

# 5. Suba os containers
docker compose up -d

# 6. Execute as migrations do banco de dados
docker compose exec server npm run migrate

# 7. Popule o banco com o usuário administrador
docker compose exec server npm run seeder:admin

# (Opcional) 8. Adicione locações iniciais
docker compose exec server npm run seeder:hosts
```

Acesse a aplicação em: http://localhost:4173 ou http://127.0.0.1:4173

### 👤 Acesso à Conta Administradora
Você pode fazer login utilizando as credenciais abaixo:

- **Email:** `admin@accurate.com`  
- **Senha:** `accurate123`
  
> ⚠️ **Importante:** apenas essa conta possui permissões administrativas.  
> Todas as contas cadastradas via interface serão do tipo **usuário (cliente)**.

## 💡 Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [MikroORM](https://mikro-orm.io/)
- [NodeJs](https://nodejs.org/en)
- [NestJs](https://nestjs.com/)
- [Docker](https://www.docker.com/)


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

- 🔒 **Administradores** têm acesso a funcionalidades administrativas, podendo:
  - Criar, editar e excluir locações.
  - Excluir clientes.
  - Visualizar o perfil de qualquer cliente.
  - Visualizar todas as reservas vinculadas a uma locação.

- 👥 **Administradores e responsáveis pela reserva** podem:
  - Visualizar os detalhes de uma reserva.
  - Cancelar a própria reserva.

- 🧑 **Usuários autenticados** podem:
  - Editar apenas o próprio perfil.

## 🖊️ Diferenciais

- Autenticação JWT.
- Utilização do Docker.
- [📥 Coleção do Postman](/Place-Accurate.postman_collection.json) — Importe no Postman para testar os endpoints.
- Layout amigável e responsivo.

## 📝 Como Executar


```bash
# 1. Clone o repositório
git clone https://github.com/Polaris851/Accurate-Place.git

# 2. Acesse a pasta do projeto
cd Accurate-Place

# 3. Configure as variáveis de ambiente
cp ./server/.env.example ./server/.env

# 4. Suba os containers
docker compose up -d

# 5. Execute as migrations do banco de dados
docker compose exec server npm run migrate

# 6. Popule o banco com o usuário administrador
docker compose exec server npm run seeder:admin

# (Opcional) 7. Adicione locações iniciais
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


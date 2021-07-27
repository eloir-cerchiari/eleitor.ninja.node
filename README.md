npm init -y
npm install express sequelize pg bcryptjs dotenv --save
npm install  nodemonsequelize-cli jest supertest -D

npx sequelize init
npx sequelize migration:create --name=create-user
npx sequelize db:migrate
npx jest --init


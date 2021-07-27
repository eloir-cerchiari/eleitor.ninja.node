const request = require('supertest');
const UserRepo = require("../../src/repositories/user-repository");

const app = require('../../app');

const bcrypt = require('bcryptjs');
describe('[Auth] login', ()=>{

    it('Precisa efetuar login', async()=>{
        const user = await UserRepo.add({
            name: "Eloir 2",
            email: "eloir.c@outlook.com",
            password: "senha123"
        })

        const hash = await bcrypt.hash("senha123", 8) 
        

        const response = await request(app)
        .post('/auth')
        .send({
            email: user.email,
            password: "senha123"
        })
        expect(response.status).toBe(200);
    })

    
})
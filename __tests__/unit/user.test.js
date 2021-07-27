const {user} = require(__dirname+ "/../../src/models/user");

const bcrypt = require('bcryptjs');

const UserRepo = require("../../src/repositories/user-repository");

describe('[Unit] User model', ()=>{

    it('Precisa encriptar a senha', async()=>{
        const user = await UserRepo.add({
            name: "Eloir",
            email: "eloir.c@gmail.com",
            password: "senha123"
        })
        
       const compare = await bcrypt.compare("senha123", user.passwordHash);

       expect(compare).toBe(true);

    })

    
})
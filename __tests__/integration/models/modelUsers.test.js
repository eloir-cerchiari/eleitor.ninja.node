// const comiteRepo = require("./committee-repository");

const UserRepo = require("../../../src/repositories/user-repository");

describe('[repo] User', ()=>{

    it('Precisa criar um usuario', async()=>{
        const user = await UserRepo.add({
            name: "Daniele",
            email: "dani.ns@gmail.com",
            password: "senha123"
        });
        
        expect(user).not.toBe(false)
        expect(user).toHaveProperty('userId')
        expect(user.userId).toBeGreaterThanOrEqual(0)
    })

    it('Precisa buscar um usuario', async()=>{
        const user = await UserRepo.findByEmail('dani.ns@gmail.com');
        expect(user).toHaveProperty('userId');
        expect(user.name).toBe("Daniele");
    })

    it('Precisa atualizar um usuario', async()=>{
        const userOne = await UserRepo.findByEmail('dani.ns@gmail.com');

        userOne.name = 'Danizinha';

        var update = await UserRepo.update(userOne.userId, {name:userOne.name, email: userOne.email, passwordHash: userOne.passwordHash});

        const userTwo = await UserRepo.findByEmail('dani.ns@gmail.com');

        expect(userTwo).toHaveProperty('userId');
        expect(userTwo.name).toBe(userOne.name);
    })

    it('Precisa remover um usuario', async()=>{
        const users = await UserRepo.findByEmail('dani.ns@gmail.com');

        var destroyed = await UserRepo.deleteByPk(users.userId);
        expect(destroyed).toBe(true);
    })
    
})
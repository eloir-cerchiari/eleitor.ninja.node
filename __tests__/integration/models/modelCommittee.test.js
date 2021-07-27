// const comiteRepo = require("./committee-repository");

const CommitteeRepo = require("../../../src/repositories/committee-repository");

describe('[repo] Committee', ()=>{

    it('Precisa criar um comite', async()=>{
        const committee = await CommitteeRepo.add({
            name: "Comite 1"
        })
        expect(committee).not.toBe(false)
        expect(committee).toHaveProperty('committeeId')
        expect(committee.committeeId).toBeGreaterThanOrEqual(0)
    })

    it('Precisa buscar um comite', async()=>{
        const committee = await CommitteeRepo.findByName('Comite 1');
        expect(committee).toHaveProperty('committeeId');
        expect(committee.name).toBe("Comite 1");
    })

    it('Precisa atualizar um comite', async()=>{
        const committeeOne = await CommitteeRepo.findByName('Comite 1');

        committeeOne.name = 'Comitezinho Numero 1';

        var update = await CommitteeRepo.update(committeeOne.committeeId, {name:committeeOne.name});

        const committeeTwo = await CommitteeRepo.get(committeeOne.committeeId);

        expect(committeeTwo).toHaveProperty('committeeId');
        expect(committeeTwo.name).toBe(committeeOne.name);
    })

    it('Precisa remover um comite', async()=>{
        const committee = await CommitteeRepo.findByName('Comitezinho Numero 1');
        var destroyed = await CommitteeRepo.deleteByPk(committee.committeeId);
        expect(destroyed).toBe(true);
    })
    
})
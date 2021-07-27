const election = require("../models/election");
const CommitteeRepository = require("../repositories/committee-repository");
const ElectionRepository = require("../repositories/election-repository");

class ElectionController{
    async create(req, res){

        
        var comite = await CommitteeRepository.get(1);
        // var election = await ElectionRepository.add({title: 'Diretor da organização', committeeId:1});
        
        
        return res.status(200).send({
            comite: comite,
            // election: election
        });
    }
}

module.exports = new ElectionController();
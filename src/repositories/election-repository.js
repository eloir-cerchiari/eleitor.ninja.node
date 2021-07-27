'use strict';

const {election} = require(__dirname+ '/../models');

const ElectionRepository = {

    get: async (electionId) => {
        const res = await election.findByPk(electionId);
        return res;
    },


    add: async (data) => {

        var electionDTO = {};
        electionDTO.title = data.title;
        electionDTO.committeeId = data.committeeId;

         if (! await ElectionRepository._validate(electionDTO)) {
             return false;
         }

        return await election.create(electionDTO);

    },

    _exists: async(title) =>{
        var election = await ElectionRepository.findByTitle(title)

        if(election)
            return true;

        return false;
    },

    _validate: async (dto) => {

        if (!dto.title) {
            return false;
        }


        return ! await ElectionRepository._exists(dto.title);
       

    },

    findByTitle: async (title) => {
        
        return await election.findOne({
            where: {
                title: title
            }
        });
    },

    update: async(electionId, electionDTO) =>{
        const[updated] = await election.update(electionDTO,{
            where: {
                electionId: electionId
            }
        })
        return updated;
    },

    deleteByPk: async (electionId) => {
        try {
           await election.destroy({
                where: {
                    electionId: electionId
                }
            });

            return true;
        } catch (e) {
            return false;
        }
    }

};

module.exports = ElectionRepository;

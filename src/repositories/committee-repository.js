'use strict';

const election = require("../models/election");

const {committee} = require(__dirname+ '/../models');

const CommitteeRepository = {

    get: async (committeeId) => {
        const res = await committee.findByPk(committeeId, {
            include: [{
              model: election,
              as: 'elections'
            }]
          });
        return res;
    },


    add: async (data) => {

        var committeeDTO = {};
        committeeDTO.name = data.name;

         if (! await CommitteeRepository._validate(committeeDTO)) {
             return false;
         }

        return await committee.create(committeeDTO);

    },

    _exists: async(name) =>{
        var committee = await CommitteeRepository.findByName(name)

        if(committee)
            return true;

        return false;
    },

    _validate: async (dto) => {

        if (!dto.name) {
            return false;
        }


        return ! await CommitteeRepository._exists(dto.name);
       

    },

    findByName: async (name) => {
        
        return await committee.findOne({
            where: {
                name: name
            }
        });
    },

    update: async(committeeId, committeeDTO) =>{
        const[updated] = await committee.update(committeeDTO,{
            where: {
                committeeId: committeeId
            }
        })
        return updated;
    },

    deleteByPk: async (committeeId) => {
        try {
           await committee.destroy({
                where: {
                    committeeId: committeeId
                }
            });

            return true;
        } catch (e) {
            return false;
        }
    }

};

module.exports = CommitteeRepository;

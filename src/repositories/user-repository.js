'use strict';

const {user} = require(__dirname+ '/../models');
// const Sequelize = require("sequelize");

const UserRepository = {

    get: async (userId) => {
        const res = await user.findByPk(userId);
        return res;
    },


    add: async (data) => {

        var userDTO = {};
        userDTO.name = data.name;
        userDTO.email = data.email;
        userDTO.password = data.password;

         if (! await UserRepository._validate(userDTO)) {
             return false;
         }

        return await user.create(userDTO);
        

    },

    _exists: async(email) =>{
        var usuario = await UserRepository.findByEmail(email)

        if(usuario)
            return true;

        return false;
    },

    _validate: async (dto) => {

        if (!dto.email) {
            return false;
        }


        return ! await UserRepository._exists(dto.email);
       

    },

    findByEmail: async (email) => {
        
        return await user.findOne({
            where: {
                email: email
            }
        });
    },

    update: async(userId, userDTO) =>{
        const[updated] = await user.update(userDTO,{
            where: {
                userId: userId
            }
        })
        return updated;
    },

    deleteByPk: async (userId) => {
        try {
           await user.destroy({
                where: {
                    userId: userId
                }
            });

            return true;
        } catch (e) {
            return false;
        }
    }

};

module.exports = UserRepository;

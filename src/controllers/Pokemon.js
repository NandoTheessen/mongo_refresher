const Pokemon = require('../models/Pokemon');
const Ability = require('../models/Abilities');
const fetchData = require('../helpers/FetchData');
const API = process.env.API || 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (req, res) => {
  try {
    const { name } = req.body;
    const query = await Pokemon.find({ name }, { _id: 0 }).populate(
      'abilities',
      {
        _id: 0
      }
    );
    let fromCache = true;

    if (query.length === 0) {
      fromCache = false;

      const apiResponse = await fetchData(`${API}/${name.toLowerCase()}`);

      const { abilities } = apiResponse;

      // Adapt API response to fit db schema
      const newAbilities = abilities.map(ab => {
        return {
          name: ab.ability.name,
          url: ab.ability.url,
          is_hidden: Boolean(ab.is_hidden),
          slot: ab.slot
        };
      });

      // Use ability id's to create Pokemon
      const insertedAbilities = await Ability.insertMany(newAbilities);
      await new Pokemon({
        name,
        abilities: insertedAbilities.map(ab => ab._id)
      }).save();

      // Return new entry to the user
      res.status(201).json({ name, abilities: insertedAbilities, fromCache });
    } else {
      // Return saved resource to the user
      const { abilities, name } = query[0];
      res.status(200).json({ name, abilities, fromCache });
    }
  } catch (e) {
    res
      .status(500)
      .json({ msg: 'Server encountered an error processing your request' });
  }
};

module.exports = { getPokemon };

const Pokemon = require('../data/models/Pokemon');
const Ability = require('../data/models/Abilities');
const fetchData = require('../helpers/FetchData');
const API = process.env.API || 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (req, res) => {
  try {
    const { name } = req.body;
    const query = await Pokemon.find({ name }, { _id: 0, _v: 0 }).populate(
      'abilities',
      {
        _id: 0,
        _v: 0
      }
    );
    let fromCache = true;

    if (query.length === 0) {
      fromCache = false;
      const apiResponse = await fetchData(`${API}/${name.toLowerCase()}`);
      const { abilities } = apiResponse;
      const newAbilities = abilities.map(ab => {
        return {
          name: ab.ability.name,
          url: ab.ability.url,
          is_hidden: Boolean(ab.is_hidden),
          slot: ab.slot
        };
      });
      const insertedAbilities = await Ability.insertMany(newAbilities);
      const abilityIds = insertedAbilities.map(ab => ab._id);
      await new Pokemon({
        name,
        abilities: abilityIds
      }).save();
      res.status(201).json({ name, abilities: newAbilities, fromCache });
    } else {
      res.status(200).json({ data: query, fromCache });
    }
  } catch (e) {
    res.status(500).json({ msg: 'nope', error: e.response });
  }
};

const savePokemon = async (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  const newPokemon = new Pokemon({ name });
  try {
    const newP = await newPokemon.save();
    console.log(newP);
    res.status(201).json({ data: newP });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getPokemon, savePokemon };

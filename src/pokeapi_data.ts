import * as m from 'mithril';
import { Pokedex } from 'pokeapi-js-wrapper';
import { IModel } from './model';

const pokedex = new Pokedex({
    protocol: 'https',
    cache: true,
    timeout: 60 * 1000,
});

interface Pokemon {
    name: string;
    stats: IPokemonStat[];
    types: IPokemonType[];
};

interface IPokemonStat {
    base_stat: number;
    effort: number;
    stat: IStat;
};

interface IStat {
    name: Stat;
    url: string;
};

type Stat = "attack" | "special-attack" | "defense" | "special-defense" | "speed" | "hp";

interface IPokemonType {
    slot: 1 | 2;
    type: IType;
};

interface IType {
    name: Type;
    url: string;
}

type Type = "Normal" | "Fire" | "Fighting" | "Water" | "Flying" | "Grass" | "Poison" | "Electric" | "Ground" | "Psychic" | "Rock" | "Ice" | "Bug" | "Dragon" | "Ghost" | "Dark" | "Steel" | "Fairy";

function getPokemonData(model: IModel): void {
    [...Array(model.range).keys()].map((index: number) => {
        pokedex.resource('/api/v2/pokemon/' + (index + 1))
            .then((r: Pokemon) => {
                model.pokemon[index] = r;
                m.redraw();
            });
    });
}

export { getPokemonData, Pokemon, IPokemonStat, Stat };

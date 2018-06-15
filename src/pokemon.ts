import * as m from 'mithril';
import { Pokemon } from './pokeapi_data';
import { Chart } from './stats_chart';
import { format_name, format_index } from './format';
import { Picture } from './picture';

const PokemonCell: m.Component<{
    number: number;
    pokemon: Pokemon;
}, {}> = {
    view: (vnode) => {
        const number = vnode.attrs.number;
        const pokemon = vnode.attrs.pokemon;
        return m('.card', [
            m(Picture, {index: number}),
            // m(Types, {pokemon: pokemon}),
            m(Chart, { pokemon }),
            m('.footer', [
                m(HashNumber, { number }),
                m(Name, { pokemon }),
            ]),
        ]);
    },
};

const Name: m.Component<{pokemon: Pokemon}, {}> = {
    view: (vnode) => {
        return m('.name', format_name(vnode.attrs.pokemon.name));
    },
};

const HashNumber: m.Component<{number: number}, {}> = {
    view: (vnode) => {
        return m('.index', format_index(vnode.attrs.number));
    },
};

export { PokemonCell };

import * as m from 'mithril';
import { IModel } from './model';
import { PokemonCell } from './pokemon';

const Dex: m.Component<{model: IModel}, {}> = {
    view: (vnode) => {
        return m('.grid-container', [
            vnode.attrs.model.pokemon.map(function(pokemon, index) {
                return m(PokemonCell, { pokemon, number: index + 1 });
            }),
            m('.grid-fill-text', 'Pokedex'),
        ]);
    },
};

export { Dex };

import * as m from 'mithril';
import { Pokemon } from './pokeapi_data';

const Types: m.Component<{pokemon: Pokemon}, {}> = {
    view: (vnode) => {
        return m(
            '.types',
            vnode.attrs.pokemon.types.map(
                (type) => m('p', type.type.name),
            ),
        );
    },
};

export { Types };

import * as m from 'mithril';
import { format_name } from './format';
import { Pokemon } from './pokeapi_data';

const Picture: m.Component<{
    number: number;
    pokemon: Pokemon;
}, {}> = {
    view: (vnode) => {
        return m('.picture', m('img', {
            src: _image_url(
                vnode.attrs.number,
                vnode.attrs.pokemon.name,
            ),
        }));
    },
};

function _image_url(number: number, name: string): string {
    return 'img/' + number.toString().padStart(3, '0') + format_name(name) + '.png';
}

export { Picture };

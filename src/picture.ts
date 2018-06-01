import * as m from 'mithril';
import { Pokemon } from './pokeapi_data';

const Picture: m.Component<{
    number: number;
    pokemon: Pokemon;
}, {}> = {
    view: (vnode) => {
        return m('.picture', m('img', {
            src: 'sprites/img_trans.gif',
            style: _image_url(
                vnode.attrs.number,
                vnode.attrs.pokemon.name,
            ),
        }));
    },
};

function _image_url(number: number, name: string): string {
    const offsetX = ((number - 1) % 15) * -100;
    const offsetY = (Math.floor((number - 1) / 15)) * -100;
    return "background: url('sprites/out.jpg') " + offsetX + "px " + offsetY + "px;";
}

export { Picture };

import * as m from 'mithril';
import { getPokemonData, Pokemon } from './pokeapi_data';
import { IModel } from './model';
import { Dex } from './dex';

const model: IModel = {
    pokemon: [] as Pokemon[],
    range: 151,
};

getPokemonData(model);

const Page: m.Component<{}, {}> = {
    view: () => {
        return m('.container', m(Dex, { model }));
    },
};

m.mount(document.body, Page);

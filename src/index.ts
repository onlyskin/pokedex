import * as m from 'mithril';
import {Pokedex} from 'pokeapi-js-wrapper';
import * as radar from 'svg-radar-chart';
import * as stringify from 'virtual-dom-stringify';

const pokedex = new Pokedex({
    protocol: 'https',
    cache: true,
    timeout: 60 * 1000,
});

type Stat = "attack" | "special-attack" | "defense" | "special-defense" | "speed" | "hp";

type StatMap = {[S in Stat]: string | number};

type Type = "Normal" | "Fire" | "Fighting" | "Water" | "Flying" | "Grass" | "Poison" | "Electric" | "Ground" | "Psychic" | "Rock" | "Ice" | "Bug" | "Dragon" | "Ghost" | "Dark" | "Steel" | "Fairy";

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

interface IPokemonType {
    slot: 1 | 2;
    type: IType;
};

interface IType {
    name: Type;
    url: string;
}

function shortStatName(name: Stat): string {
    return {
        "attack": "att",
        "special-attack": "sp-att",
        "defense": "def",
        "special-defense": "sp-def",
        "speed": "speed",
        "hp": "hp",
    }[name];
}

function makeRadarObj(
    stats: IPokemonStat[],
    processFunc: (pokemonStat: IPokemonStat) => string | number,
): StatMap {
    return stats.reduce((acc: StatMap, curr: IPokemonStat) => {
        return Object.assign(acc, {[curr.stat.name]: processFunc(curr)});
    }, {} as StatMap);
}

function statsChart(pokemon: Pokemon) {
    const captions: StatMap = makeRadarObj(
        pokemon.stats,
        (curr: IPokemonStat) => shortStatName(curr.stat.name),
    );
    const stats: StatMap = makeRadarObj(
        pokemon.stats,
        (curr: IPokemonStat) => curr.base_stat/255,
    );
    return radar(
        captions,
        [stats],
        {
            size: 150, // size of the chart (including captions)
            axes: true, // show axes?
            scales: 4, // show scale circles?
            captions: true, // show captions?
            captionsPosition: 1.0, // where on the axes are the captions?
            axisProps: () => ({className: 'axis'}),
            scaleProps: () => ({className: 'scale', fill: 'none'}),
            shapeProps: () => ({className: 'shape'}),
            captionProps: () => ({
                className: 'caption',
                textAnchor: 'middle', fontSize: 9,
                fontFamily: 'sans-serif'
            })
        }
    );
}

interface IModel {
    pokemon: Pokemon[];
    range: number;
};

const model: IModel = {
    pokemon: [] as Pokemon[],
    range: 151,
};

getPokemonData(model);

function getPokemonData(model: IModel): void {
    [...Array(model.range).keys()].map((index: number) => {
        pokedex.resource('/api/v2/pokemon/' + (index + 1))
            .then((r: Pokemon) => {
                model.pokemon[index] = r;
                m.redraw();
            });
    });
}

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
            height: '95px',
        }));
    },
};
console.log(Picture);

const Name: m.Component<{pokemon: Pokemon}, {}> = {
    view: (vnode) => {
        return m('.name', _format_name(vnode.attrs.pokemon.name));
    },
};

const HashNumber: m.Component<{number: number}, {}> = {
    view: (vnode) => {
        return m('.index', _format_index(vnode.attrs.number));
    },
};

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
console.log(Types);

const Chart: m.Component<{pokemon: Pokemon}, {}> = {
    oncreate: (vnode) => {
        vnode.dom.innerHTML = stringify(
            statsChart(vnode.attrs.pokemon),
        );
    },
    onupdate: (vnode) => {
        vnode.dom.innerHTML = stringify(
            statsChart(vnode.attrs.pokemon),
        );
    },
    view: (vnode) => {
        return m(
            'svg.chart',
            {
                version: "1",
                xmlns: "http://www.w3.org/2000/svg",
                height: 150,
                width: 150,
            },
        );
    },
};

const Pokemon: m.Component<{
    number: number;
    pokemon: Pokemon;
}, {}> = {
    view: (vnode) => {
        const number = vnode.attrs.number;
        const pokemon = vnode.attrs.pokemon;
        return m('.card', [
            // m(Picture, {number: number, pokemon: pokemon}),
            // m(Types, {pokemon: pokemon}),
            m(Chart, { pokemon }),
            m('.footer', [
                m(HashNumber, { number }),
                m(Name, { pokemon }),
            ]),
        ]);
    },
};

const Dex: m.Component<{model: IModel}, {}> = {
    view: (vnode) => {
        return m('.grid-container', [
            vnode.attrs.model.pokemon.map(function(pokemon, index) {
                return m(Pokemon, { pokemon, number: index + 1 });
            }),
            m('.grid-fill-text', 'Pokedex'),
        ]);
    },
};

const Page: m.Component<{}, {}> = {
    view: () => {
        return m('.container', m(Dex, { model }));
    },
};

m.mount(document.body, Page);

function _format_index(number: number): string {
    return '#' + number.toString().padStart(3, '0');
}

function _format_name(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function _image_url(number: number, name: string): string {
    return 'img/' + number.toString().padStart(3, '0') + _format_name(name) + '.png';
}

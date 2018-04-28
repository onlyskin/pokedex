import m from 'mithril';
import './pokedex.css';
import {Pokedex} from 'pokeapi-js-wrapper';
const radar = require('svg-radar-chart')
const stringify = require('virtual-dom-stringify');

const pokedex = new Pokedex({
    protocol: 'https',
    cache: true,
    timeout: 60 * 1000,
});

function shortStatName(name) {
    return {
        "attack": "att",
        "special-attack": "sp-att",
        "defense": "def",
        "special-defense": "sp-def",
        "speed": "speed",
        "hp": "hp",
    }[name];
}

function makeRadarObj(stats, processFunc) {
    return stats.reduce((acc, curr) => {
        return Object.assign(acc, {[curr.stat.name]: processFunc(curr)});
    }, {});
}

function statsChart(pokemon) {
    const captions = makeRadarObj(pokemon.stats, (curr) => shortStatName(curr.stat.name));
    const stats = makeRadarObj(pokemon.stats, (curr) => curr.base_stat/255);
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

const model = {
    pokemon: [],
    range: 386,
}
getPokemonData(model);

function getPokemonData(model) {
    [...Array(model.range).keys()].map((index) => {
        pokedex.resource('/api/v2/pokemon/' + (index + 1))
            .then((r) => {
                model.pokemon[index] = r;
                m.redraw();
            });
    });
};

const Picture = {
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

const Name = {
    view: (vnode) => {
        return m('.name', _format_name(vnode.attrs.pokemon.name));
    },
};

const HashNumber = {
    view: (vnode) => {
        return m('.index', _format_index(vnode.attrs.number));
    },
};

const Types = {
    view: (vnode) => {
        return m(
            '.types',
            vnode.attrs.pokemon.types.map(
                (type) => m('p', type.type.name),
            ),
        );
    },
};

const Chart = {
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
        console.log(vnode.attrs.pokemon.stats);
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
}

const Pokemon = {
    view: (vnode) => {
        const number = vnode.attrs.number;
        const pokemon = vnode.attrs.pokemon;
        return m('.card', [
            // m(Picture, {number: number, pokemon: pokemon}),
            // m(Types, {pokemon: pokemon}),
            m(Chart, {pokemon: pokemon}),
            m('.footer', [
                m(HashNumber, {number: number}),
                m(Name, {pokemon: pokemon}),
            ]),
        ]);
    },
}

const Dex = {
    view: () => {
        return m('.grid-container', [
            model.pokemon.map(function(pokemon, index) {
                return m(Pokemon, {pokemon: pokemon, number: index + 1});
            }),
            m('.grid-fill-text', 'Pokedex'),
        ]);
    },
}

const Page = {
    view: () => {
        return m('.container', m(Dex));
    },
}

m.mount(document.body, Page);

function _format_index(number) {
    return '#' + number.toString().padStart(3, '0');
}

function _format_name(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function _image_url(number, name) {
    return 'img/' + number.toString().padStart(3, '0') + _format_name(name) + '.png';
}

import * as m from 'mithril';
import * as radar from 'svg-radar-chart';
import * as stringify from 'virtual-dom-stringify';
import { Pokemon, IPokemonStat, Stat } from './pokeapi_data';

type StatMap = {[S in Stat]: string | number};

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

function makeRadarObj(
    stats: IPokemonStat[],
    processFunc: (pokemonStat: IPokemonStat) => string | number,
): StatMap {
    return stats.reduce((acc: StatMap, curr: IPokemonStat) => {
        return Object.assign(acc, {[curr.stat.name]: processFunc(curr)});
    }, {} as StatMap);
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

export { Chart };

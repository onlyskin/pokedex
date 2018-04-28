import m from 'mithril';
import './pokedex.css';

var model = {
    pokemon: [],
}

var pokemon = m.request({
    method: 'GET',
    url: 'data.json',
})
    .then(function(data) {
        model.pokemon = data;
    })

var Pokemon = {
    view: function(vnode) {
        return m('.card', [
            m('.picture', m('img', {
                src: _image_url(vnode.attrs.pokemon),
                height: '95px',
            })),
            m('.footer', [
                m('.index', _format_index(_url_to_index(vnode.attrs.pokemon.url))),
                m('.name', _format_name(vnode.attrs.pokemon.name)),
            ]),
        ]);
    },
}

var Pokedex = {
    view: function() {
        return m('.grid-container', [
            model.pokemon.map(function(pokemon) {
                return m(Pokemon, {pokemon: pokemon});
            }),
            m('.grid-fill-text', 'Pokedex'),
        ]);
    },
}

var Page = {
    view: function() {
        return m('.container', m(Pokedex));
    },
}

m.mount(document.body, Page);

function _url_to_index(url) {
    var start = url.indexOf('pokemon') + 8;
    var end = url.length - 1;
    return url.slice(start, end);
}

function _format_index(index) {
    return '#' + index.padStart(3, '0');
}

function _format_name(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function _image_url(pokemon) {
    return 'img/' + _url_to_index(pokemon.url).padStart(3, '0') + _format_name(pokemon.name) + '.png';
}

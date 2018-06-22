import * as m from 'mithril';

const SPRITE_COLUMNS: number = 15;
const IMAGE_SIZE: number = 150;
const IMAGE_SET: string = 'yellow';
const SPRITE_URL = `https://s3.eu-west-2.amazonaws.com/pokemon-sprite-sheets/${IMAGE_SET}.png`;

const Picture: m.Component<{
    index: number;
}, {}> = {
    view: (vnode) => {
        return m('.picture', m('img', {
            src: 'img_trans.gif',
            style: imageStyles(
                vnode.attrs.index,
            ),
        }));
    },
};

function imageStyles(index: number): string {
    return `background: ${backgroundStyle(index)}; height: ${IMAGE_SIZE}px;`;
}

function backgroundStyle(index: number) {
    const offsetX = xSpriteOffset(index);
    const offsetY = ySpriteOffset(index);
    return `url('${SPRITE_URL}') ${offsetX}px ${offsetY}px / ${SPRITE_COLUMNS * 100}%`;
}

function xSpriteOffset(index: number) {
    return ((index - 1) % SPRITE_COLUMNS) * - IMAGE_SIZE;
}

function ySpriteOffset(index: number) {
    return (Math.floor((index - 1) / SPRITE_COLUMNS)) * -IMAGE_SIZE;
}

export { Picture };

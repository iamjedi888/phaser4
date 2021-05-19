import { Frame } from '../textures/Frame';
import { Game } from '../Game';
import { IGameObject } from '../gameobjects/IGameObject';
import { ISprite } from '../gameobjects/sprite/ISprite';
import { Stats } from './Stats';
import { Texture } from '../textures/Texture';

const TreeCSS = `
.treeContainer {
    background: white;
    font: normal normal 13px/1.4 Segoe,"Segoe UI",Calibri,Helmet,FreeSans,Sans-Serif;
    padding: 50px;
    position: absolute;
    display: none;
    left: 0;
    top: 0;
  }

.tree,
.tree ul {
  margin:0 0 0 1em; /* indentation */
  padding:0;
  list-style:none;
  color:#369;
  position:relative;
}

.tree ul {margin-left:.5em} /* (indentation/2) */

.tree:before,
.tree ul:before {
  content:"";
  display:block;
  width:0;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  border-left:1px solid;
}

.tree li {
  margin:0;
  padding:0 1.5em; /* indentation + .5em */
  line-height:2em; /* default list item's line-height */
  font-weight:bold;
  position:relative;
}

.tree li:before {
  content:"";
  display:block;
  width:10px; /* same with indentation */
  height:0;
  border-top:1px solid;
  margin-top:-1px; /* border top width */
  position:absolute;
  top:1em; /* (line-height/2) */
  left:0;
}

.tree li:last-child:before {
  background:white; /* same with body background */
  height:auto;
  top:1em; /* (line-height/2) */
  bottom:0;
}
`;

export class StatsTree
{
    stats: Stats;
    game: Game;

    div: HTMLDivElement;
    root: HTMLUListElement;

    visible: boolean = false;

    constructor (stats: Stats)
    {
        this.stats = stats;
        this.game = stats.game;

        const style = document.createElement('style');

        style.type = 'text/css';
        style.innerHTML = TreeCSS;

        document.body.appendChild(style);

        const div = document.createElement('div');

        div.style.display = 'none;'
        div.className = 'treeContainer';

        const title = document.createElement('p');

        title.innerText = 'World';

        div.appendChild(title);

        const root = document.createElement('ul');

        root.className = 'tree';

        div.appendChild(root);

        this.div = div;
        this.root = root;
    }

    buildList (parent: HTMLUListElement, root: IGameObject)
    {
        const children = root.children;

        for (let i: number = 0; i < children.length; i++)
        {
            let entity = children[i];

            let textureInfo = '';

            if (entity.hasOwnProperty('texture'))
            {
                let texture: Texture = (entity as unknown as ISprite).texture;
                let frame: Frame = (entity as unknown as ISprite).frame;

                if (frame.key !== '__BASE')
                {
                    textureInfo += frame.key + ' ';
                }

                textureInfo += texture.width + ' x ' + texture.height;
            }

            let id: string = `${entity.type} (${textureInfo})`;

            let li = document.createElement('li');

            li.innerText = id;

            parent.appendChild(li);

            if (entity.numChildren > 0)
            {
                let ul = document.createElement('ul');

                li.appendChild(ul);

                this.buildList(ul, entity);
            }
        }
    }

    show ()
    {
        this.game.pause();

        const root = this.root;

        const world = this.game.scenes.getScene('scene0').world;

        let li = document.createElement('li');
        li.innerText = 'Frame: ' + this.game.frame + ' Total: ' + world.totalFrame + ' Dirty: ' + world.dirtyFrame;
        root.appendChild(li);


        this.buildList(root, world);

        this.visible = true;

        this.div.style.display = 'block';
    }

    hide ()
    {
        //  Nuke all current children
        const root = this.root;

        while (root.firstChild)
        {
            root.removeChild(root.firstChild);
        }

        this.game.resume();

        this.visible = false;

        this.div.style.display = 'none';
    }
}

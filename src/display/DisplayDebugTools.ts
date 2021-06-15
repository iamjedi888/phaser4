import { Container, GameObjectTree, Sprite } from '../gameobjects';

import { AddChild } from './AddChild';
import { AddChildAt } from './AddChildAt';
import { AddChildren } from './AddChildren';
import { BringChildToTop } from './BringChildToTop';
import { ConsoleTreeChildren } from './ConsoleTreeChildren';
import { CountMatchingChildren } from './CountMatchingChildren';
import { DepthFirstSearch } from './DepthFirstSearch';
import { DepthFirstSearchRecursive } from './DepthFirstSearchRecursive';
import { DestroyChildren } from './DestroyChildren';
import { FindChildrenByName } from './FindChildrenByName';
import { GetAllChildren } from './GetAllChildren';
import { GetChildAt } from './GetChildAt';
import { GetChildIndex } from './GetChildIndex';
import { GetChildren } from './GetChildren';
import { GetClosestChild } from './GetClosestChild';
import { GetFirstChild } from './GetFirstChild';
import { GetFirstChildByName } from './GetFirstChildByName';
import { GetFurthestChild } from './GetFurthestChild';
import { GetLastChild } from './GetLastChild';
import { GetParents } from './GetParents';
import { GetRandomChild } from './GetRandomChild';
import { IBaseWorld } from '../world/IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2Like } from '../math/vec2/IVec2Like';
import { IsValidParent } from './IsValidParent';
import { MoveChildDown } from './MoveChildDown';
import { MoveChildTo } from './MoveChildTo';
import { MoveChildUp } from './MoveChildUp';

export function DisplayDebugTools <W extends IBaseWorld> (world: W): void
{
    const top = window.parent.top;

    top['world'] = world;

    top['GameObjectTree'] = GameObjectTree;

    top['List'] = (parent: IGameObject = world) =>
    {
        ConsoleTreeChildren(parent);
    };

    top['Container'] = (x: number, y: number) =>
    {
        return new Container(x, y);
    };

    top['Sprite'] = (x: number, y: number, key: string, frame?: string | number) =>
    {
        return new Sprite(x, y, key, frame);
    };

    top['AddChild'] = (parent: IGameObject, child: IGameObject) =>
    {
        AddChild(parent, child);
    };

    top['AddChildAt'] = (parent: IGameObject, child: IGameObject, index: number = 0) =>
    {
        AddChildAt(parent, child, index);
    };

    top['AddChildren'] = (parent: IGameObject = world, ...children: IGameObject[]) =>
    {
        AddChildren(parent, ...children);
    };

    top['BringChildToTop'] = (child: IGameObject) =>
    {
        BringChildToTop(child);
    };

    top['CountMatchingChildren'] = (parent: IGameObject, property: string | symbol, value?: never) =>
    {
        CountMatchingChildren(parent, property, value);
    };

    top['DepthFirstSearch'] = (parent: IGameObject = world) =>
    {
        DepthFirstSearch(parent);
    };

    top['DepthFirstSearchRecursive'] = (parent: IGameObject = world) =>
    {
        DepthFirstSearchRecursive(parent);
    };

    top['DestroyChildren'] = (parent: IGameObject = world, beginIndex: number = 0, endIndex?: number) =>
    {
        DestroyChildren(parent, beginIndex, endIndex);
    };

    top['FindChildrenByName'] = (parent: IGameObject, searchString: string) =>
    {
        FindChildrenByName(parent, searchString);
    };

    top['GetAllChildren'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        GetAllChildren(parent, property, value);
    };

    top['GetChildAt'] = (parent: IGameObject, index: number) =>
    {
        GetChildAt(parent, index);
    };

    top['GetChildIndex'] = (child: IGameObject) =>
    {
        GetChildIndex(child);
    };

    top['GetChildren'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        GetChildren(parent, property, value);
    };

    top['GetClosestChild'] = (parent: IGameObject, point: IVec2Like) =>
    {
        GetClosestChild(parent, point);
    };

    top['GetFirstChild'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        GetFirstChild(parent, property, value);
    };

    top['GetFirstChildByName'] = (parent: IGameObject, searchString: string) =>
    {
        GetFirstChildByName(parent, searchString);
    };

    top['GetFurthestChild'] = (parent: IGameObject, point: IVec2Like) =>
    {
        GetFurthestChild(parent, point);
    };

    top['GetLastChild'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        GetLastChild(parent, property, value);
    };

    top['GetParents'] = (child: IGameObject) =>
    {
        GetParents(child);
    };

    top['GetRandomChild'] = (parent: IGameObject, startIndex: number = 0, length?: number) =>
    {
        GetRandomChild(parent, startIndex, length);
    };

    top['IsValidParent'] = (parent: IGameObject, child: IGameObject) =>
    {
        return IsValidParent(parent, child);
    };

    top['MoveChildDown'] = (child: IGameObject) =>
    {
        MoveChildDown(child);
    };

    top['MoveChildTo'] = (child: IGameObject, index: number) =>
    {
        MoveChildTo(child, index);
    };

    top['MoveChildUp'] = (child: IGameObject) =>
    {
        MoveChildUp(child);
    };

    top['DDHelp'] = () =>
    {
        const help: string[] = [
            'Phaser 4 Display Debug Tools Commands:',
            '',
            'world - A reference to the World instance',
            'GameObjectTree - The internal Game Object Tree Map',
            'List(parent) - Dump out the tree to the console',
            'Container(x, y) - Create a new Container instance',
            'Sprite(x, y, key, frame) - Create a new Sprite instance',
            '',
            'AddChild(parent, child)',
            'AddChildAt(parent, child, index?)',
            'AddChildren(parent, ...children)',
            'BringChildToTop(child)',
            'CountMatchingChildren(parent, property, value?)',
            'DepthFirstSearch(parent?)',
            'DepthFirstSearchRecursive(parent?)',
            'DestroyChildren(parent, beginIndex?, endIndex?)',
            'FindChildrenByName(parent, searchString)',
            'GetAllChildren(parent, property?, value?)',
            'GetChildAt(parent, index)',
            'GetChildIndex(child)',
            'GetChildren(parent, property?, value?)',
            'GetClosestChild(parent, IVec2Like point)',
            'GetFirstChild(parent, property?, value?)',
            'GetFirstChildByName(parent, searchString)',
            'GetFurthestChild(parent, IVec2Like point)',
            'GetLastChild(parent, property?, value?)',
            'GetParents(child)',
            'GetRandomChild(parent, startIndex?, length?)',
            'IsValidParent(parent, child)',
            'MoveChildDown(child)',
            'MoveChildTo(child, index)',
            'MoveChildUp(child)'
        ];

        console.log(help.join('\n'));

        // help.forEach(log => console.log(log));
    };

    console.log(
        '%cDisplay Debug Tools Installed%c DDHelp() for command list',
        'padding: 4px 16px; color: #fff; background: linear-gradient(#81003e 40%, #c3bc00)',
        ''
    );
}

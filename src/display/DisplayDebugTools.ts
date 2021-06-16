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
import { IContainer } from '../gameobjects/container/IContainer';
import { IGameObject } from '../gameobjects/IGameObject';
import { IVec2Like } from '../math/vec2/IVec2Like';
import { IsValidParent } from './IsValidParent';
import { MoveChildDown } from './MoveChildDown';
import { MoveChildTo } from './MoveChildTo';
import { MoveChildUp } from './MoveChildUp';
import { RemoveChild } from './RemoveChild';
import { RemoveChildAt } from './RemoveChildAt';
import { RemoveChildren } from './RemoveChildren';
import { RemoveChildrenAt } from './RemoveChildrenAt';
import { RemoveChildrenBetween } from './RemoveChildrenBetween';
import { RemoveWorld } from './RemoveWorld';
import { ReparentChildren } from './ReparentChildren';
import { ReplaceChild } from './ReplaceChild';
import { RotateChildrenLeft } from './RotateChildrenLeft';
import { RotateChildrenRight } from './RotateChildrenRight';
import { SendChildToBack } from './SendChildToBack';
import { SetChildrenValue } from './SetChildrenValue';
import { SetName } from './SetName';
import { SetOrigin } from './SetOrigin';
import { SetParent } from './SetParent';
import { SetPosition } from './SetPosition';
import { SetRotation } from './SetRotation';
import { SetScale } from './SetScale';
import { SetSize } from './SetSize';
import { SetSkew } from './SetSkew';
import { SetValue } from './SetValue';
import { SetVisible } from './SetVisible';
import { SetWorld } from './SetWorld';
import { ShuffleChildren } from './ShuffleChildren';
import { SwapChildren } from './SwapChildren';
import { TextureManagerInstance } from '../textures/TextureManagerInstance';

export function DisplayDebugTools <W extends IBaseWorld> (world: W): void
{
    const logHelp: string[] = [
        '%cPhaser 4 Display Debug Tools Commands:',
        '%c'
    ];

    const logCSS: string[] = [
        'color: red;',
        'color: white;'
    ];

    const addHelp = (command: string, description: string = ''): void =>
    {
        logHelp.push(`%c${command}  %c${description}`);
        logCSS.push('color: blue');
        logCSS.push('color: black');
    };

    const top = window.parent.top;

    top['world'] = world;

    addHelp('world', 'A reference to the World instance');

    top['GameObjectTree'] = GameObjectTree;

    addHelp('GameObjectTree', 'A reference to the internal Game Object Tree Map');

    top['List'] = (parent: IGameObject = world) =>
    {
        ConsoleTreeChildren(parent);
    };

    addHelp('List(parent?)', 'Dump the Display List to the console');

    top['Container'] = (x: number, y: number) =>
    {
        return new Container(x, y);
    };

    addHelp('Container(x, y)', 'Create and return a new Container Game Object');

    top['Sprite'] = (x: number, y: number, key: string, frame?: string | number) =>
    {
        return new Sprite(x, y, key, frame);
    };

    addHelp('Sprite(x, y, key, frame?)', 'Create and return a new Sprite Game Object');

    top['Textures'] = () =>
    {
        for (const key of TextureManagerInstance.get().textures.keys())
        {
            console.log(key);
        }
    };

    addHelp('Textures()', 'List all of the textures loaded into the Texture Manager');

    top['SaveList'] = (name: string) =>
    {
        const entries = DepthFirstSearch(world);

        console.log(entries);

        //  TODO
    };

    addHelp('SaveList(name)', 'Saves the Display List to Local Storage');

    top['LoadList'] = (name: string) =>
    {
        //  TODO
    };

    addHelp('LoadList(name)', 'Loads the Display List from Local Storage');


    addHelp('');

    //  -----------------------
    //  Display List functions:
    //  -----------------------

    top['AddChild'] = (parent: IGameObject, child: IGameObject) =>
    {
        return AddChild(parent, child);
    };

    addHelp('AddChild(parent, child)', 'Add the child to the parent');

    top['AddChildAt'] = (parent: IGameObject, child: IGameObject, index: number = 0) =>
    {
        return AddChildAt(parent, child, index);
    };

    addHelp('AddChildAt(parent, child, index?)', 'Add the child to the parent at the given index');

    top['AddChildren'] = (parent: IGameObject = world, ...children: IGameObject[]) =>
    {
        return AddChildren(parent, ...children);
    };

    addHelp('AddChildren(parent, ...children)', 'Add all children to the parent');

    top['BringChildToTop'] = (child: IGameObject) =>
    {
        return BringChildToTop(child);
    };

    addHelp('BringChildToTop(child)', 'Moves the child to the top of its parents display list');

    top['CountMatchingChildren'] = (parent: IGameObject, property: string | symbol, value?: never) =>
    {
        return CountMatchingChildren(parent, property, value);
    };

    addHelp('CountMatchingChildren(parent, property, value?)', 'How many children match the property and value');

    top['DepthFirstSearch'] = (parent: IGameObject = world) =>
    {
        return DepthFirstSearch(parent);
    };

    addHelp('DepthFirstSearch(parent?)', 'Return all children from a DFS of the parent');

    top['DepthFirstSearchRecursive'] = (parent: IGameObject = world) =>
    {
        return DepthFirstSearchRecursive(parent);
    };

    addHelp('DepthFirstSearchRecursive(parent?)', 'Return all children from a recursive DFS of the parent');

    top['DestroyChildren'] = (parent: IGameObject = world, beginIndex: number = 0, endIndex?: number) =>
    {
        return DestroyChildren(parent, beginIndex, endIndex);
    };

    addHelp('DestroyChildren(parent?, beginIndex?, endIndex?)', 'Destroy all children optionally between the indexes');

    top['FindChildrenByName'] = (parent: IGameObject, searchString: string) =>
    {
        return FindChildrenByName(parent, searchString);
    };

    addHelp('FindChildrenByName(parent, searchString)', 'Return all children with a name matching the string or regexp');

    top['GetAllChildren'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        return GetAllChildren(parent, property, value);
    };

    addHelp('GetAllChildren(parent, property?, value?)', 'Return all children of the parent in a deep scan');

    top['GetChildAt'] = (parent: IGameObject, index: number) =>
    {
        return GetChildAt(parent, index);
    };

    addHelp('GetChildAt(parent, index)', 'Return the child at the given index');

    top['GetChildIndex'] = (child: IGameObject) =>
    {
        return GetChildIndex(child);
    };

    addHelp('GetChildIndex(child)', 'Get the index of the child within the parent display list');

    top['GetChildren'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        return GetChildren(parent, property, value);
    };

    addHelp('GetChildren(parent, property?, value?)', 'Return all direct children of the parent');

    top['GetClosestChild'] = (parent: IGameObject, point: IVec2Like) =>
    {
        return GetClosestChild(parent, point);
    };

    addHelp('GetClosestChild(parent, IVec2Like point)', 'Return the child closest to the given vector point');

    top['GetFirstChild'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        return GetFirstChild(parent, property, value);
    };

    addHelp('GetFirstChild(parent, property?, value?)', 'Return the first child, optionally matching the given property and value');

    top['GetFirstChildByName'] = (parent: IGameObject, searchString: string) =>
    {
        return GetFirstChildByName(parent, searchString);
    };

    addHelp('GetFirstChildByName(parent, searchString)', 'Return the first child matching the string or regexp');

    top['GetFurthestChild'] = (parent: IGameObject, point: IVec2Like) =>
    {
        return GetFurthestChild(parent, point);
    };

    addHelp('GetFurthestChild(parent, IVec2Like point)', 'Return the child furthest away from the given vector point');

    top['GetLastChild'] = (parent: IGameObject, property?: string | symbol, value?: never) =>
    {
        return GetLastChild(parent, property, value);
    };

    addHelp('GetLastChild(parent, property?, value?)', 'Return the last child, optionally matching the given property and value');

    top['GetParents'] = (child: IGameObject) =>
    {
        return GetParents(child);
    };

    addHelp('GetParents(child)', 'Get all parents of the child in an array, recursively searching up');

    top['GetRandomChild'] = (parent: IGameObject, startIndex: number = 0, length?: number) =>
    {
        return GetRandomChild(parent, startIndex, length);
    };

    addHelp('GetRandomChild(parent, startIndex?, length?)', 'Get a random child from the parent, optionally between the indexes');

    top['IsValidParent'] = (parent: IGameObject, child: IGameObject) =>
    {
        return IsValidParent(parent, child);
    };

    addHelp('IsValidParent(parent, child)', 'Is the parent a valid candidate for the child?');

    top['MoveChildDown'] = (child: IGameObject) =>
    {
        return MoveChildDown(child);
    };

    addHelp('MoveChildDown(child)', 'Moves the child one index down the display list');

    top['MoveChildTo'] = (child: IGameObject, index: number) =>
    {
        return MoveChildTo(child, index);
    };

    addHelp('MoveChildTo(child, index)', 'Moves the child to the given index in the display list');

    top['MoveChildUp'] = (child: IGameObject) =>
    {
        return MoveChildUp(child);
    };

    addHelp('MoveChildUp(child)', 'Moves the child one index up the display list');

    top['RemoveChild'] = (parent: IGameObject, child: IGameObject) =>
    {
        return RemoveChild(parent, child);
    };

    addHelp('RemoveChild(parent, child)', 'Removes a single child from its parent');

    top['RemoveChildAt'] = (parent: IGameObject, index: number) =>
    {
        return RemoveChildAt(parent, index);
    };

    addHelp('RemoveChildAt(parent, index)', 'Removes the child at the given index from the parent');

    top['RemoveChildren'] = (parent: IGameObject, ...children: IGameObject[]) =>
    {
        return RemoveChildren(parent, ...children);
    };

    addHelp('RemoveChildren(parent, ...children)', 'Removes all given children from the parent');

    top['RemoveChildrenAt'] = (parent: IGameObject, ...index: number[]) =>
    {
        return RemoveChildrenAt(parent, ...index);
    };

    addHelp('RemoveChildrenAt(parent, ...index)', 'Removes the children at the given indexes from the parent');

    top['RemoveChildrenBetween'] = (parent: IGameObject, beginIndex: number = 0, endIndex?: number) =>
    {
        return RemoveChildrenBetween(parent, beginIndex, endIndex);
    };

    addHelp('RemoveChildrenBetween(parent, beginIndex, endIndex)', 'Removes the children from the parent between the start and end indexes');

    top['RemoveWorld'] = (world: IBaseWorld, ...children: IGameObject[]) =>
    {
        return RemoveWorld(world, ...children);
    };

    addHelp('RemoveWorld(world, ...children)', 'Removes the World component from the given children');

    top['ReparentChildren'] = (parent: IGameObject, newParent: IGameObject, beginIndex: number = 0, endIndex?: number) =>
    {
        return ReparentChildren(parent, newParent, beginIndex, endIndex);
    };

    addHelp('ReparentChildren(parent, newParent, beginIndex?, endIndex?)', 'Removes the children from parent and adds them to newParent');

    top['ReplaceChild'] = (target: IGameObject, source: IGameObject) =>
    {
        return ReplaceChild(target, source);
    };

    addHelp('ReplaceChild(target, source)', 'Replaces the target with the source child within the parent');

    top['RotateChildrenLeft'] = (parent: IGameObject, total: number = 1) =>
    {
        return RotateChildrenLeft(parent, total);
    };

    addHelp('RotateChildrenLeft(parent, total?)', 'Rotates the parent display list "total" places to the left');

    top['RotateChildrenRight'] = (parent: IGameObject, total: number = 1) =>
    {
        return RotateChildrenRight(parent, total);
    };

    addHelp('RotateChildrenRight(parent, total?)', 'Rotates the parent display list "total" places to the right');

    top['SendChildToBack'] = (child: IGameObject) =>
    {
        return SendChildToBack(child);
    };

    addHelp('SendChildToBack(child)', 'Sends the given child to the back of the parent display list');

    top['SetChildrenValue'] = (parent: IGameObject, property: string | symbol, value: never) =>
    {
        return SetChildrenValue(parent, property, value);
    };

    addHelp('SetChildrenValue(parent, property, value)', 'Sets the property to value on all children of the parent');

    top['SetName'] = (name: string, ...children: IGameObject[]) =>
    {
        return SetName(name, ...children);
    };

    addHelp('SetName(name, ...children)', 'Sets the name property on all given children');

    top['SetOrigin'] = (originX: number, originY: number, ...children: IContainer[]) =>
    {
        return SetOrigin(originX, originY, ...children);
    };

    addHelp('SetOrigin(originX, originY, ...children)', 'Sets the origin on all given children');

    top['SetParent'] = (parent: IGameObject, ...children: IGameObject[]) =>
    {
        return SetParent(parent, ...children);
    };

    addHelp('SetParent(parent, ...children)', 'Sets the parent on all given children, removing from previous parent');

    top['SetPosition'] = (x: number, y: number, ...children: IContainer[]) =>
    {
        return SetPosition(x, y, ...children);
    };

    addHelp('SetPosition(x, y, ...children)', 'Sets the position on all given children');

    top['SetRotation'] = (rotation: number, ...children: IContainer[]) =>
    {
        return SetRotation(rotation, ...children);
    };

    addHelp('SetRotation(rotation, ...children)', 'Sets the rotation on all given children');

    top['SetScale'] = (scaleX: number, scaleY: number, ...children: IContainer[]) =>
    {
        return SetScale(scaleX, scaleY, ...children);
    };

    addHelp('SetScale(scaleX, scaleY, ...children)', 'Sets the scale on all given children');

    top['SetSize'] = (width: number, height: number, ...children: IContainer[]) =>
    {
        return SetSize(width, height, ...children);
    };

    addHelp('SetSize(width, height, ...children)', 'Sets the size on all given children');

    top['SetSkew'] = (skewX: number, skewY: number, ...children: IContainer[]) =>
    {
        return SetSkew(skewX, skewY, ...children);
    };

    addHelp('SetSkew(skewX, skewY, ...children)', 'Sets the skew on all given children');

    top['SetValue'] = (property: string | symbol, value: never, ...children: IGameObject[]) =>
    {
        return SetValue(property, value, ...children);
    };

    addHelp('SetValue(property, value, ...children)', 'Sets the property to the value on all given children');

    top['SetVisible'] = (visible: boolean, ...children: IContainer[]) =>
    {
        return SetVisible(visible, ...children);
    };

    addHelp('SetVisible(visible, ...children)', 'Sets the visible state on all given children');

    top['SetWorld'] = (world: IBaseWorld, ...children: IContainer[]) =>
    {
        return SetWorld(world, ...children);
    };

    addHelp('SetWorld(world, ...children)', 'Sets the World on all given children');

    top['ShuffleChildren'] = (parent: IGameObject) =>
    {
        return ShuffleChildren(parent);
    };

    addHelp('ShuffleChildren(parent)', 'Shuffles all of the children of the given parent');

    top['SwapChildren'] = (child1: IGameObject, child2: IGameObject) =>
    {
        SwapChildren(child1, child2);
    };

    addHelp('SwapChildren(child1, child2)', 'Swaps the position of the 2 children of the same parent');

    top['DDHelp'] = () =>
    {
        console.log(
            logHelp.join('\n'),
            ...logCSS
        );
    };

    console.log(
        '%cDisplay Debug Tools Installed%c DDHelp() for command list',
        'padding: 4px 16px; color: #fff; background: linear-gradient(#81003e 40%, #c3bc00)',
        ''
    );
}

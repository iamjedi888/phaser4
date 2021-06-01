export const SceneAfterUpdateEvent: string = 'afterupdate';

export type SceneAfterUpdateEventHandler = (delta: number, time: number) => void;

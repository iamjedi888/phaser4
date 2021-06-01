export const SceneBeforeUpdateEvent: string = 'beforeupdate';

export type SceneBeforeUpdateEventHandler = (delta: number, time: number) => void;

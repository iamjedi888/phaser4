export const SceneUpdateEvent: string = 'update';

export type SceneUpdateEventHandler = (delta: number, time: number) => void;

import { GameInstance } from '../../GameInstance';
import { TimeComponent } from './TimeComponent';

export function UpdateDelta (id: number, time: number): void
{
    //  Note that privacy.resistFingerprinting can round this value to 100us or more!
    const now = performance.now();

    //  How long it took to process this frame
    const delta = now - time;

    TimeComponent.fpsCount[id]++;

    if (now >= TimeComponent.prevFrame[id] + 1000)
    {
        TimeComponent.fps[id] = (TimeComponent.fpsCount[id] * 1000) / (now - TimeComponent.prevFrame[id]);
        TimeComponent.prevFrame[id] = now;
        TimeComponent.fpsCount[id] = 0;
    }

    TimeComponent.lastTick[id] = now;
    TimeComponent.elapsed[id] += delta;
    TimeComponent.delta[id] = delta;
    TimeComponent.frame[id]++;

    GameInstance.setFrame(TimeComponent.frame[id]);
}

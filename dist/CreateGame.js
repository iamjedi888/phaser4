import { Game } from "./Game";
import { Once } from "./events/Once";
export function CreateGame(...settings) {
  const game = new Game(...settings);
  return new Promise((resolve) => {
    if (game.isBooted) {
      resolve(game);
    } else {
      Once(game, "boot", () => {
        resolve(game);
      });
    }
  });
}

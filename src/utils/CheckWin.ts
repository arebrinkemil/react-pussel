//kollar om tilesen har samma index som deras värde
export function checkWin(tiles: number[]): boolean {
  return tiles.every((tile, index) => {
    if (index === tiles.length - 1) {
      return tile === 0;
    } else {
      return tile === index + 1;
    }
  });
}

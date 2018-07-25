const fn = require('./index');

describe("deep-object-search", () => {
  it("it should fail when source object is invalid", () => {
    // First argument:
    expect(fn()).toEqual({ found: false });
    expect(fn('23423')).toEqual({ found: false });
    expect(fn('')).toEqual({ found: false });
    expect(fn(null)).toEqual({ found: false });
    expect(fn(undefined)).toEqual({ found: false });
    expect(fn(234)).toEqual({ found: false });
    expect(fn(24.3)).toEqual({ found: false });
    expect(fn(-34.3)).toEqual({ found: false });
    expect(fn(true)).toEqual({ found: false });
    expect(fn(false)).toEqual({ found: false });
    expect(fn(function(){})).toEqual({ found: false });
    expect(fn(() => {})).toEqual({ found: false });
    expect(fn([])).toEqual({ found: false });
    expect(fn({})).toEqual({ found: false });

    // Second argument:
    expect(fn({}, '')).toEqual({ found: false });
    expect(fn({}, null)).toEqual({ found: false });
    expect(fn({}, undefined)).toEqual({ found: false });
    expect(fn({}, 234)).toEqual({ found: false });
    expect(fn({}, 24.3)).toEqual({ found: false });
    expect(fn({}, -34.3)).toEqual({ found: false });
    expect(fn({}, true)).toEqual({ found: false });
    expect(fn({}, false)).toEqual({ found: false });
    expect(fn({}, function(){})).toEqual({ found: false });
    expect(fn({}, () => {})).toEqual({ found: false });
    expect(fn({}, [])).toEqual({ found: false });
    expect(fn({}, {})).toEqual({ found: false });
    expect(fn({},'dknf')).toEqual({ found: false });
  });
  it("should found when uses a path or key name", () => {
    // Assert:
    const tree = {
      body: {
        data: {
          firstname: 'Norman',
          lastname: 'Carcamo',
          house:399,
          games: {
            console: true,
            gameboy: undefined,
            physic: null
          }
        }
      },
      sports: {
        tennis: true,
        basketball: true,
        football: true,
        rugby: false,
      }
    }

    // Act + Assert:
    // body:
    expect(fn(tree, 'body')).toMatchObject({ found: true, value: tree.body });
    expect(fn(tree, 'body.data')).toMatchObject({ found: true, value: tree.body.data });
    expect(fn(tree, 'body.data.firstname')).toMatchObject({ found: true, value: 'Norman' });
    expect(fn(tree, 'body.data.lastname')).toMatchObject({ found: true, value: 'Carcamo' });
    expect(fn(tree, 'body.data.house')).toMatchObject({ found: true, value: 399 });
    expect(fn(tree, 'body.data.games')).toMatchObject({ found: true, value: tree.body.data.games });
    expect(fn(tree, 'body.data.games.console')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'body.data.games.gameboy')).toMatchObject({ found: true, value: undefined });
    expect(fn(tree, 'body.data.games.physic')).toMatchObject({ found: true, value: null });
    expect(fn(tree, 'data')).toMatchObject({ found: true });
    expect(fn(tree, 'data.firstname')).toMatchObject({ found: true, value: 'Norman' });
    expect(fn(tree, 'data.lastname')).toMatchObject({ found: true, value: 'Carcamo' });
    expect(fn(tree, 'data.house')).toMatchObject({ found: true, value: 399 });
    expect(fn(tree, 'data.games')).toMatchObject({ found: true });
    expect(fn(tree, 'data.games.console')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'data.games.gameboy')).toMatchObject({ found: true, value: undefined });
    expect(fn(tree, 'data.games.physic')).toMatchObject({ found: true, value: null });
    expect(fn(tree, 'firstname')).toMatchObject({ found: true });
    expect(fn(tree, 'lastname')).toMatchObject({ found: true });
    expect(fn(tree, 'house')).toMatchObject({ found: true });
    expect(fn(tree, 'games')).toMatchObject({ found: true });
    expect(fn(tree, 'games.console')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'games.gameboy')).toMatchObject({ found: true, value: undefined });
    expect(fn(tree, 'console')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'gameboy')).toMatchObject({ found: true, value: undefined });
    expect(fn(tree, 'physic')).toMatchObject({ found: true, value: null });

    // sports:
    expect(fn(tree, 'sports')).toMatchObject({ found: true, value: tree.sports });
    expect(fn(tree, 'sports.tennis')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'sports.basketball')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'sports.football')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'sports.rugby')).toMatchObject({ found: true, value: false });
    expect(fn(tree, 'tennis')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'basketball')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'football')).toMatchObject({ found: true, value: true });
    expect(fn(tree, 'rugby')).toMatchObject({ found: true, value: false });
  });
});

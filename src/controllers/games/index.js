function FindById(DB, id) {
    const game = DB.games.find(game => game.id === id);
    if (game === undefined) {
        throw new Error();
    }
    return game
}

function CreateNewGame(DB, game) {
    if (game === undefined) throw new Error();
    if (DB.games.find(g => g.id === game.id) !== undefined) throw new Error();

    DB.games.push(game);
    return game;
}

function DeleteGame(DB, id) {
    let index = DB.games.findIndex(g => g.id === id);

    if (index == -1) throw new Error();

    DB.games.splice(index, 1);
}

function EditGame(DB, game) {
    let index = DB.games.findIndex(g => g.id === game.id);

    if (index == -1) throw new Error();

    DB.games[index] = game;

}


module.exports = { FindById, CreateNewGame, DeleteGame, EditGame }
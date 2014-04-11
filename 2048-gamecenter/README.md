README.md
Rob Lasell
Tufts Comp20, Spring 2014
2048 Gamecenter

===============================================================

The entire project has been correctly implemented. Thanks to
Tyler and Connor for all of their help, as well as to Will Clarkson
for his work, "Mount Mingmore". I spent approximately 12 hours
in total completing this assignment.

In the game 2048, the score and grid are stored in a JSON object
in local storage called gameState, in local_storage_manager.js.

In order to post to my gamecenter from the game, I edited the game's
index.html file to include jquery in a script tag, then I edited
the file game_manager.js so that whenever the game was about to end
(meaning when clearGameState() was about to be called in restart() or
actuate()), the game would call a function that I had written called
gamecenter(), which looked like this:

//send your score and grid to Rob's gamecenter
GameManager.prototype.gamecenter = function () {
  var username = window.prompt('Enter your name');
  gs = this.storageManager.getGameState();
  $.post("http://ancient-gorge-5027.herokuapp.com/submit.json", {"username":username, "score":gs.score, "grid":gs.grid});
}


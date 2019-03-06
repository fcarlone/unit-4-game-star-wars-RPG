// console.log('game.js')

$(document).ready(function () {

  charactersData = {
    name: ["Captain America", "Iron Man", "Spider Man", "Wolverine"],
    charactersImageArray: ['assets/images/1.jpeg', 'assets/images/2.jpeg', 'assets/images/3.jpeg', 'assets/images/4.jpeg', 'assets/images/5.jpeg', 'assets/images/6.jpeg', 'assets/images/7.jpeg', 'assets/images/8.jpeg'],
    characterHealth: [115, 155, 175, 250],
    characterDamage: [5, 8, 13, 20]
  };
  // Initial website setup
  let characterSelectedArray = [];
  let defenderSelectedArray = [];
  let gameSelectedCharacterHealth = 0;
  let gameSelectedDefenderHealth = 0;
  // Initial population with all characters (remove selected character during onClick event)
  let charactersNotSelectedArray = charactersData.name;

  $(".attack-button-container").hide();
  $(".replay-game-button-container").hide();
  $(".game-defender-container").hide();

  let victoryCount = 0;

  const checkCount = () => {
    if (victoryCount > 3) {
      //  console.log(victoryCount >= 3)
      $("#game-attack-message").text("You did it.  You defeated all the Skrulls.  Great job.");
      $("#player-character p").remove();
      $(".replay-game-button-container").show(1000);
      // $("#game-defender-container").remove();
    }
  }

  // Display all the characters for user to select
  const createImageTags = (arr) => {

    for (let i = 0; i < arr.length; i++) {
      // Create image tag for each character 
      let characterImage = $("<img>")
      // Give each character a display-game-image class for styling
      characterImage.addClass("display-game-image");
      // Give each character a src link attribute to character image file
      characterImage.attr("src", `assets/images/${i + 1}.jpeg`);
      // Give each character a character unique id attribute
      characterImage.attr("id", i);
      // Give each character a character name attribute
      characterImage.attr("character-name", charactersData.name[i]);
      // Give each character a character health attribute
      characterImage.attr("character-health", charactersData.characterHealth[i])

      // Create div for character data to apppend
      let characterListDiv = $('<div class="character-list-data">');

      // Add character's name, health and image;
      characterListDiv.append(
        `<h3>${charactersData.name[i]}</h3>`,
        characterImage,
        `<h3>${charactersData.characterHealth[i]}</h3>`
      );
      $("#character-list-image").append(characterListDiv)
    };

    // on-Click event to select character
    $(".display-game-image").on("click", function () {

      // Chain the variables to attributes to act as a getter
      let characterSelected = ($(this).attr('src'))
      let characterSelectedName = ($(this).attr('character-name'))
      let characterSelectedHealth = ($(this).attr('character-health'))
      let characterSelectedId = ($(this).attr('id'))
      // Push character selected id to characterSelctedArray 
      characterSelectedArray.push(characterSelectedId);
      // Set gameSelectedCharacterHealth;
      gameSelectedCharacterHealth = characterSelectedHealth

      // display selected character image, name and health in battle arena
      $("#player-character").append(
        `<h3>${characterSelectedName}</h3>`,
        `<img src=${characterSelected}>`,
        `<p>${characterSelectedHealth}</p>`,
      );
      // Remove character selected from character list
      $("#character-list-image").remove();
      // Instruction for user to select a Skrull
      $("#game-attack-message").append("Select a Skrull")
      // Move other characters to "defender-list" id
      let indexNumber = parseInt(characterSelectedArray[0])

      for (let i = 0; i < arr.length; i++) {
        if (i !== indexNumber) {
          // Create image tag for each defender
          let defenderImage = $("<img>")
          // Give each defender a display-defender-game-image class for styling
          defenderImage.addClass("display-defender-game-image");
          // Give each  defender  a src link attribute to character image file
          defenderImage.attr("src", `assets/images/${i + 5}.jpeg`);
          // Give each  defender  a character unique id attribute
          defenderImage.attr("id", i);
          // Give each  defender  a character name attribute
          defenderImage.attr("character-name", charactersData.name[i]);
          // Give each  defender  a character health attribute
          defenderImage.attr("character-health", charactersData.characterHealth[i]);

          // Create defender div to append data
          let defenderListDiv = $('<div class="defender-list-data">');
          defenderListDiv.attr("id", i);

          defenderListDiv.append(
            // `<h3>Skrull ${charactersData.name[i]}</h3>`,
            defenderImage,
            // `<h3>${charactersData.characterHealth[i]}</h3>`
          );
          $("#defender-list-image").append(defenderListDiv)
        }
      }
      // Remove Avenger list div after selection
      $(".game-container").remove();
      $(".character-container").remove();

      // Invoke defenderOnClickEvent fuction - user to select defender
      defenderOnClickEvent();
      $(".game-defender-container").show();
      $(".game-defender-container").append("Skrull List:")
    });

  };
  // on-click event for user to select defender
  const defenderOnClickEvent = () => {
    $(".display-defender-game-image").on("click", function () {
      let defenderSelected = ($(this).attr('src'))
      let defenderSelectedName = ($(this).attr('character-name'))
      let defenderSelectedHealth = ($(this).attr('character-health'))
      let defenderSelectedId = ($(this).attr('id'))

      // Push defender selected to defenderSelectedArray array
      defenderSelectedArray[0] = (defenderSelectedId);
      // Move selected defender to arena
      $("#defender-character").append(
        `<h3>Skrull ${defenderSelectedName}</h3>`,
        `<img src=${defenderSelected}>`,
        `<p>${defenderSelectedHealth}</p>`
      );

      // Remove selected defender from Skrull list
      $(`.defender-list-data id#${defenderSelectedId}`).remove();
      // ****
      $(`#defender-list-image img#${defenderSelectedId}`).remove();

      // Get selected character and defender health 
      defenderCharacterHealth = charactersData.characterHealth[defenderSelectedArray]
      gameSelectedDefenderHealth = defenderCharacterHealth

      // Message to click the attack button
      $("#game-attack-message").text("Press the attack button")
      // Invoke Attack Function
      handleAttack();
    });
  }
  const handleAttack = () => {
    // Show attack button
    $(".attack-button-container").show(1000);
    // Attack button
    $("#attack-button").on("click", function () {
      // Add conditions 
      $("#player-character-health").append()
      // Get selected character and defender damage 
      selectedCharacterDamage = charactersData.characterDamage[characterSelectedArray]
      defenderCharacterDamage = charactersData.characterDamage[defenderSelectedArray]

      // attack calculations
      gameSelectedCharacterHealth -= defenderCharacterDamage;
      gameSelectedDefenderHealth -= selectedCharacterDamage

      // Update character health
      $("#player-character p").text(gameSelectedCharacterHealth)
      // Update defender health
      $("#defender-character p").text(gameSelectedDefenderHealth)

      if (gameSelectedCharacterHealth <= 0) {
        console.log('you lose - invoke play again button')
        $("#game-attack-message").text("You lost.  Do you want to play again?")
        // Remove losing player
        $("#player-character p").remove();
        $("#player-character h3").remove();
        $("#player-character img").remove();

        $("#defender-character p").remove();
        // Remove attach button
        $(".attack-button-container").hide(1000);
        // Play again button and message
        $(".replay-game-button-container").show(1500);

        $(".game-defender-container").hide(1000);
        $(".defender-container").remove();

      } else if (gameSelectedDefenderHealth <= 0) {
        victoryCount = victoryCount + 1;
        // Remove attach button
        $(".attack-button-container").hide(1000);

        $("#defender-character p").remove();
        $("#defender-character h3").remove();
        $("#defender-character img").remove();

        $("#game-attack-message").text("YOU WON.  Select a new opponent")

        gameSelectedDefenderHealth = 0;
        // Check number of wins
        checkCount();
      } else {

      }
    });
  };

  // Replay game 
  $("#replay-button").on("click", function () {
    location.reload();
  })

  // Create character image tags
  createImageTags(charactersData.name);

})

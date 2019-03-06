// console.log('game.js')

$(document).ready(function () {

  charactersData = {
    name: ["Captain America", "Iron Man", "Spider Man", "Wolverine"],
    charactersImageArray: ['assets/images/1.jpeg', 'assets/images/2.jpeg', 'assets/images/3.jpeg', 'assets/images/4.jpeg', 'assets/images/5.jpeg', 'assets/images/6.jpeg', 'assets/images/7.jpeg', 'assets/images/8.jpeg'],
    characterHealth: [115, 155, 205, 250],
    characterDamage: [5, 8, 13, 20]
  };
  // Initial website setup
  let characterSelectedArray = [];
  let defenderSelectedArray = [];
  let gameSelectedCharacterHealth = 0;
  let gameSelectedDefenderHealth = 0;
  // Initial population with all characters (remove selected character during onClick event)
  let charactersNotSelectedArray = charactersData.name;
  console.log(`Global 1 charactersNotSelectd ${charactersNotSelectedArray}`)
  $(".attack-button-container").hide();
  $(".replay-game-button-container").hide();
  $(".game-defender-container").hide();

  let victoryCount = 0;

  const checkCount = () => {
    if (victoryCount > 3) {
      console.log(victoryCount >= 3)
      $("#game-attack-message").text("You did it.  You defeated all the Skrulls.  Great job.");
      $("#player-character p").remove();
      $(".replay-game-button-container").show(1000);
      $(".game-defender-container").hide(1000);
    }
  }

  // Display all the characters for user to select
  const createImageTags = (arr) => {
    console.log(`createImageTag invloked`)

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

      // // **update here
      let characterListDiv = $('<div class="character-list-data">');

      // Add character's name, health and image;
      characterListDiv.append(
        `<h3>${charactersData.name[i]}</h3>`,
        characterImage,
        `<h3>${charactersData.characterHealth[i]}</h3>`

      );

      $("#character-list-image").append(characterListDiv)
      // characterListDiv.append(
      //   `<h3>${charactersData.name[i]}</h3>`,
      //   $("#character-list-image").append(characterImage),
      //   `<h3>${charactersData.characterHealth[i]}</h3>`
      // );

      // $("#character-list-image").append($(characterImage).attr("character-name"));
      // $("#character-list-image").append($(characterImage).attr("character-health"));
      // $("#character-list-image").append(characterImage);
    };

    // on-Click event to select character
    $(".display-game-image").on("click", function () {
      console.log('character selected')
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
      // $("#player-character").append(characterSelectedHealth);
      console.log('characterButton')


      // Move other characters to "defender-list" id
      console.log('Index number of character selected', characterSelectedArray)
      let indexNumber = parseInt(characterSelectedArray[0])
      console.log('arr', arr)
      for (let i = 0; i < arr.length; i++) {
        if (i !== indexNumber) {
          console.log(i)

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

          // Dispaly defender image, name and health
          // $("#defender-list-image").append($(defenderImage).attr("character-name"));
          // $("#defender-list-image").append($(defenderImage).attr("character-health");

          $("#defender-list-image").append(defenderImage);
        }

      }
      console.log(`charactersNotSelectd ${charactersNotSelectedArray}`)

      // Remove Avenger list div after selection
      $(".game-container").remove();
      $(".character-container").remove();

      // Invoke defenderOnClickEvent fuction - user to select defender
      defenderOnClickEvent();
      $(".game-defender-container").show();
      $(".game-defender-container").append("Skrull List:")
    })

  };
  // on-click event for user to select defender
  const defenderOnClickEvent = () => {
    $(".display-defender-game-image").on("click", function () {
      let defenderSelected = ($(this).attr('src'))
      let defenderSelectedName = ($(this).attr('character-name'))
      let defenderSelectedHealth = ($(this).attr('character-health'))
      let defenderSelectedId = ($(this).attr('id'))
      console.log('defender on-click event', defenderSelected)
      console.log('info ==> ', defenderSelected, defenderSelectedName, defenderSelectedHealth, defenderSelectedId)
      // Push defender selected to defenderSelectedArray array
      console.log('defenderSelectedArray -> ', defenderSelectedArray)
      defenderSelectedArray[0] = (defenderSelectedId);
      // Move selected defender to arena
      $("#defender-character").append(
        `<h3>Skrull ${defenderSelectedName}</h3>`,
        `<img src=${defenderSelected}>`,
        `<p>${defenderSelectedHealth}</p>`
      );
      // Add defender name and health
      // $("#defender-list-image").append('');

      // Remove selected defender from Skrull list
      $(".defender-character-name").remove();
      $(`#defender-list-image img#${defenderSelectedId}`).remove();

      // Get selected character and defender health **update
      // selectedCharacterHealth = gameSelectedCharacterHealth
      defenderCharacterHealth = charactersData.characterHealth[defenderSelectedArray]
      // gameSelectedCharacterHealth = selectedCharacterHealth
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
      console.log('attack button clicked')
      console.log('attack characterSelected array: ', characterSelectedArray)
      console.log('attack defenderSelected array: ', defenderSelectedArray)

      console.log('selectedCharacterHealth ', gameSelectedCharacterHealth)
      console.log('defenderCharacterHealth ', defenderCharacterHealth)
      $("#player-character-health").append()
      // Get selected character and defender damage  ***update
      selectedCharacterDamage = charactersData.characterDamage[characterSelectedArray]
      defenderCharacterDamage = charactersData.characterDamage[defenderSelectedArray]
      console.log('selectedCharacterDamage ', selectedCharacterDamage)
      console.log('defenderCharacterDamage ', defenderCharacterDamage)

      // attack calculations
      gameSelectedCharacterHealth -= defenderCharacterDamage;
      console.log("gameSelectedCharacterHealth", gameSelectedCharacterHealth)
      gameSelectedDefenderHealth -= selectedCharacterDamage
      console.log('gameSelectedDefenderHealth', gameSelectedDefenderHealth)
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
        console.log('you win')
        // Remove attach button
        $(".attack-button-container").hide(1000);

        // $(".game-defender-container").remove();
        $("#defender-character p").remove();
        $("#defender-character h3").remove();
        $("#defender-character img").remove();

        $("#game-attack-message").text("YOU WON.  Select a new opponent")

        gameSelectedDefenderHealth = 0;
        // Check number of wins
        console.log('victory count', victoryCount)
        checkCount();
      } else {

      }
    });
  };

  // Replay game 
  $("#replay-button").on("click", function () {
    console.log('replay button')
    location.reload();
  })
  console.log('___________________________')
  console.log('Global characterSelected array: ', characterSelectedArray)
  console.log('Global defenderSelected array: ', defenderSelectedArray)
  createImageTags(charactersData.name);
  console.log(`Global charactersNotSelectd ${charactersNotSelectedArray}`)
})

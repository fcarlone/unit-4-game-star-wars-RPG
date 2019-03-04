// console.log('game.js')

$(document).ready(function () {

  charactersData = {
    name: ["Captain America", "Iron Man", "Spider Man", "Wolverine"],
    charactersImageArray: ['assets/images/1.jpeg', 'assets/images/2.jpeg', 'assets/images/3.jpeg', 'assets/images/4.jpeg', 'assets/images/5.jpeg', 'assets/images/6.jpeg', 'assets/images/7.jpeg', 'assets/images/8.jpeg'],
    characterHealth: [100, 150, 200, 250],
    characterDamage: [5, 8, 13, 20]
  }


  let characterSelectedArray = [];
  let defenderSelectedArray = [];
  let gameSelectedCharacterHealth = 0;
  let gameSelectedDefenderHealth = 0;
  // Initial population with all characters (remove selected character during onClick event)
  let charactersNotSelectedArray = charactersData.name;
  console.log(`Global 1 charactersNotSelectd ${charactersNotSelectedArray}`)

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
      // Add character image to website - id = "character-list-image"
      // $(".character-container").append($(characterImage).attr("character-name"))
      $("#character-list-image").append($(characterImage).attr("character-name"));
      $("#character-list-image").append($(characterImage).attr("character-health"))
      $("#character-list-image").append(characterImage);




    }

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


      // display selected character image, name and health in battle arena
      $("#player-character").append(
        `<p>${characterSelectedName}</p>`,
        `<img src=${characterSelected}>`,
        `<p>${characterSelectedHealth}</p>`,
      );

      // $("#player-character").append(characterSelectedHealth);
      console.log('characterButton')
      // Remove character selected from character list
      $("#character-list-image").remove();

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
          defenderImage.attr("character-health", charactersData.characterHealth[i])
          // Add  defender  image to website - id = "defender-list-image"

          $("#defender-list-image").append(defenderImage);

          // Dispaly defender name and health
          // $("#defender-list-image").append(charactersData.name[i])
          // $("#defender-list-image").append(charactersData.characterHealth[i])

        }
        // Set gameSelectedCharacterHealth;
        gameSelectedCharacterHealth = charactersData.characterHealth[i]

      }
      console.log(`charactersNotSelectd ${charactersNotSelectedArray}`)

      // Invoke defenderOnClickEvent fuction - user to select defender
      defenderOnClickEvent();
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
      // Push defender selected to defenderSelectedArray array
      defenderSelectedArray[0] = (defenderSelectedId);
      // Move selected defender to arena
      $("#defender-character").append(
        `<p>${defenderSelectedName}</p>`,
        `<img src=${defenderSelected}>`,
        `<p>${defenderSelectedHealth}</p>`
      );
      // Add defender name and health
      // $("#defender-character").append(defenderSelectedName);
      // $("#defender-character").append(defenderSelectedHealth);
      // Remove selected defender from defende-character list
      $("#defender-list-image").append('');
      $(`#defender-list-image img#${defenderSelectedId}`).remove();

      // Get selected character and defender health **update
      // selectedCharacterHealth = gameSelectedCharacterHealth
      defenderCharacterHealth = charactersData.characterHealth[defenderSelectedArray]
      // gameSelectedCharacterHealth = selectedCharacterHealth
      gameSelectedDefenderHealth = defenderCharacterHealth

      // Invoke Attack Function
      handleAttack();
    });
  }
  const handleAttack = () => {
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

      if (gameSelectedCharacterHealth <= 0) {

        console.log('you lose - invoke play again button')
        $("#game-attack-message").text("you lost")


      } else if (gameSelectedDefenderHealth <= 0) {
        console.log('you win')
        $("#defender-character").remove();
        $("#game-attack-message").text("YOU WON.  Select a new opponent")
        gameSelectedDefenderHealth = 0;

        handleAttack()
      } else {

      }
    });
  };


  console.log('___________________________')
  console.log('Global characterSelected array: ', characterSelectedArray)
  console.log('Global defenderSelected array: ', defenderSelectedArray)
  createImageTags(charactersData.name);
  console.log(`Global charactersNotSelectd ${charactersNotSelectedArray}`)
})

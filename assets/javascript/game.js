// console.log('game.js')

$(document).ready(function () {

  charactersData = {
    name: ["steve", "fred", "sue", "ralph"],
    charactersImageArray: ['assets/images/1.jpg', 'assets/images/2.jpg', 'assets/images/3.jpg', 'assets/images/4.jpg'],
    characterHealth: [100, 150, 200, 250]
  }

  // let charactersArray = ['assets/images/1.jpg', 'assets/images/2.jpg', 'assets/images/3.jpg', 'assets/images/4.jpg'];
  let characterSelctedArray = [];
  // Initial population with all characters (remove selected character during onClick event)
  let charactersNotSelectedArray = charactersData.name;
  console.log(`Global 1 charactersNotSelectd ${charactersNotSelectedArray}`)

  // Display all the characters for user to select
  const createImageTags = (arr) => {
    console.log(`createImageTag invloked`)

    for (let i = 0; i < arr.length; i++) {
      console.log('test image for loop')
      // Create image tag for each character 
      let characterImage = $("<img>")
      // Give each character a display-game-image class for styling
      characterImage.addClass("display-game-image");
      // Give each character a src link attribute to character image file
      characterImage.attr("src", `assets/images/${i + 1}.jpg`);
      // Give each character a character unique id attribute
      characterImage.attr("id", i);
      // Give each character a character name attribute
      characterImage.attr("character-name", charactersData.name[i]);
      // Give each character a character health attribute
      characterImage.attr("character-health", charactersData.characterHealth[i])
      // Add character image to website - id = "character-list-image"
      $("#character-list-image").append(characterImage);

    }

    // on-Click event for each character image
    $(".display-game-image").on("click", function () {
      console.log('button selected')
      // Chain the "characterSelected" variable to "character-name" attribute to act as a getter
      let characterSelected = ($(this).attr('src'))
      let characterSelectedName = ($(this).attr('character-name'))
      let characterSelectedHealth = ($(this).attr('character-health'))
      let characterSelectedId = ($(this).attr('id'))
      // Push character selected id to characterSelctedArray 
      characterSelctedArray.push(characterSelectedId);

      // display selected character image and name in arena
      $("#player-character").html(
        `<img src=${characterSelected}>`
      );
      $("#player-character").append(characterSelectedName);
      $("#player-character").append(characterSelectedHealth);
      console.log('characterButton')
      // Remove character selected from character list
      $("#character-list-image").remove();

      // Move other characters to "defender-list" id
      console.log(characterSelctedArray)
      let indexNumber = characterSelctedArray;
      let indexNumberValue = charactersData.name[indexNumber];
      console.log(indexNumberValue)
      if (arr.includes(indexNumberValue)) {
        charactersNotSelectedArray.splice(indexNumber, 1)

        // for-loop through updated charactersNotSelectedArray array
        for (let i = 0; i < charactersNotSelectedArray.length; i++) {
          console.log(charactersNotSelectedArray)
        }

      }
      console.log(`charactersNotSelectd ${charactersNotSelectedArray}`)

    })

  };
  console.log('___________________________')
  console.log(characterSelctedArray)
  createImageTags(charactersData.name);
  console.log(`Global charactersNotSelectd ${charactersNotSelectedArray}`)
})

$(document).ready(function () {
    var chineseFood = ["bao", "chow-mein", "dumplings", "egg-rolls",
        "fortune-cookies", "fried-rice", "gyoza", "lo-mein", "mapo-tofu",
        "ramen", "shumai", "wonton-soup"];
    var dinosaurs = ["ankylosaurus", "brachiosaurus", "dilophosaurus",
        "pachycelphalosaurus", "pterodactyl", "stegosaurus",
        "styracosaurus", "triceratops", "tyrannosaurus-rex",
        "velociraptor"];
    var solarSystem = ["earth", "jupiter", "luna", "mars", "mercury",
        "neptune", "saturn", "sol", "uranus", "venus"];

    $("#imageSet").change(showAllImages);
    $("#huntButton").click(arrayHunt);

    showAllImages();

    function showAllImages()
    {
        // What image set was selected? This is the directory name
        var directoryName = $("#imageSet").val();
        // Based on the selection, use the correct array
        var arrayOfImagesNames = getSelectedArray();

        // Empty out any children from the div
        var imageDiv = $("#originalArray").empty();

        // Make two rows of images, half in each row
        var half = arrayOfImagesNames.length / 2;
        // How many images are in the current row?
        var count = 0;
        // The current <div class="row">
        var row;

        for (var fileName of arrayOfImagesNames) {
            // Time to make a new row?
            if (count === 0 || count >= half) {
                row = $("<div>").addClass("row");
                imageDiv.append(row);
                count = 0;
            }
            // append a <figure> with the image and its caption
            row.append(createImage(directoryName, fileName));
            count++;
        }

    }

    function createImage(directory, fileName)
    {
        // Create a div with a Bootstrap class
        var col = $("<div>").addClass("col");
        // Create a figure (can have a caption)
        var figure = $("<figure>").addClass("figure");
        col.append(figure);

        // Create the image itself
        var img = $("<img>");
        img.attr("src", `${directory}/${fileName}.png`);
        img.attr("alt", fileName);

        // Add the image to the figure
        figure.append(img);

        // Create a caption
        var caption = $(`<figcaption>${fileName}</figcaption>`)
            .addClass("figure-caption text-center");
        figure.append(caption);

        return col;
    }

    function getSelectedArray()
    {
        // Which image set was selected?
        var selection = $("#imageSet").val();

        // Return the array that corresponds to
        // the selected string
        if (selection === "chinese")
            return chineseFood;
        else if (selection === "solar")
            return solarSystem;
        else if (selection === "dinos")
            return dinosaurs;
    }

    function arrayHunt()
    {
        var myArray = getSelectedArray();

        /*
        Find the first and last string in the array.
        Output them to td#firstLast
         */
        $("td#firstLast").text(myArray[0] + " " +
            myArray[myArray.length - 1]);

        /*
        Find the first string that contains an 'n'.
        Output it to td#firstEnn
         */
        var word;
        for(var str of myArray) {
            if(str.includes("n")) {
                word = str;
                break;
            }
        }
        $("td#firstEnn").text(word);

        /*
        Find all of the strings with less than 6 characters.
        Output them to td#lessThanSix
         */
        var lessThanSix = [];
        myArray.forEach(function(element, index) {
            if(element.length < 6) {
                lessThanSix.push(element);
            }
        });
        var less = lessThanSix.join(" ");
        $("td#lessThanSix").text(less);

        /*
        Find the longest string in the array.
        Output it to td#longName
         */
        var longestWord;
        var wordLength = 0;
        myArray.forEach(function(element, index) {
            if(element.length > wordLength) {
                longestWord = element;
                wordLength = element.length;
            }
        }) ;
        $("td#longName").text(longestWord);


        /*
        Find all of the strings that do not contain the letter 's'.
        Output them to td#noEss
         */
        var hasNoS = [];
        myArray.forEach(function (element, index){
            if(element.indexOf("s") === -1) {
                hasNoS.push(element);
            }
        });
        $("td#noEss").text(hasNoS.join(" "));

        /*
        Output all of the strings, but with all of their vowels
        in uppercase, to td#upperVowels
         */
        var upperVowels = [];
        myArray.forEach(function(element, index) {
            var replacement = element.replaceAll("a", "A");
            replacement = replacement.replaceAll("e", "E");
            replacement = replacement.replaceAll("i", "I");
            replacement = replacement.replaceAll("o", "O");
            replacement = replacement.replaceAll("u", "U");
            upperVowels.push(replacement);
        });
        $("td#upperVowels").text(upperVowels);

        /*
        Output all of the strings in reverse order and separated by
        ' - ' to td#reverseDash
         */
        $("td#reverseDash").text(myArray.reverse().join(" - "));

    }

});
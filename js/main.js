

(function pokedexApp(){
  //start stuff when browser loaded
    this.init = function() {
        this.searchPokemon();
        this.getPokemon();
    };

    this.searchPokemon = function() {

    }

    this.getPokemon = function() {
        // var http = new XMLHttpRequest();
        // var url = `https://pokeapi.co/api/v1/pokemon/charmander/`;
        //
        // var method = "GET";
        // http.open(method, url);
        //
        // http.onreadystatechange = function() {
        //     if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        //       var json = JSON.parse(http.response);
        //       displayPokemon(json);
        //       // console.log(json);
        //     } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
        //       alert("Error");
        //     }
        // }
        // http.send();
        var urls = [`https://pokeapi.co/api/v1/pokemon/charmander/`, `https://pokeapi.co/api/v2/pokemon/charmander/`];

        var url = `https://pokeapi.co/api/v1/pokemon/charmander/`;
        var url2 = `https://pokeapi.co/api/v2/pokemon/charmander/`;

        var data = [];

        fetch(url)
        .then(function(response) {
            return response.json();
          })
        .then(function(json) {
            var descriptionURI = "http://pokeapi.co" + json.descriptions[0].resource_uri;
            var pokeDescription = "";
          })
        .catch(function(err){
              alert(err);
          });

//

          fetch(url)
          .then(function(response) {
              return response.json();
            })
          .then(function(json2) {
              pokeDescription = json2.description;
              // console.log("Description URI: ", data);
              // console.log("Description: ", pokeDescription);
              // console.log(pokeDescription);
            })
          .catch(function(err){
                alert(err);
            });


          fetch(url2).then(function(response) {
              return response.json();
            }).then(function(json3) {
              var imageURI = json3.sprites.front_default;
              console.log(imageURI);
            }).catch(function(err){
                alert(err);
            });

    };

    this.displayPokemon = function(data){
        var content_container = document.querySelector("#content-container");
        var template = "";

      //       for(var i in json){
      //         if (json.hasOwnProperty(i)) {
      //       console.log(i, json[i]);
      //   }
      // }
      var pokeID = data.national_id;
      var pokeName = data.name;
      var pokeType1 = data.types[0].name;
      if (data.types.length == 2) {
          var pokeType2 = data.types[1].name;
        } else {
          var pokeType2 = null;
        }
      console.log(pokeID,pokeName,pokeType1,pokeType2);
      console.log(data2);
        // for(var i = 0; i < json.length; i++){
        //       // template += '<div class="card_list">'+ json[i].name +'</div>';
        //       // template += '<div style="background:url('+ json.sprites[i].resource_uri +');"</div>';
        // }

        // template += '<div>'+ json.name +'</div>';
        //
        // console.log(`name: ${json.name}`);
        // console.log(`ID: ${json.national_id}`);
        // console.log(`Type: ${json.types[i].name}`);
        // console.log(json.descriptions[0].resource_uri);
        // console.log(json);

        content_container.innerHTML = "";
        content_container.insertAdjacentHTML("afterbegin", template);

    };

    this.init();
})();

//
// function pokeSubmit(){
//     var param = document.getElementById("pokeInput").value;
//     var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;
//
//     // new URL for 3rd GET request
//     var pokeURL2 = "http://pokeapi.co/api/v2/pokemon/" + param;
//
//     $.getJSON(pokeURL, function(data){
//         //console.log(data);
//         var pokeID = data.national_id;
//         var pokeName = data.name;
//         var pokeType1 = data.types[0].name;
//         if (data.types.length == 2) {
//             var pokeType2 = data.types[1].name;
//         }
//         else var pokeType2 = null;
//         var descriptionURI = "http://pokeapi.co" + data.descriptions[0].resource_uri;
//         var pokeDescription = "";
//
//         $.getJSON(descriptionURI, function(data2){
//             //console.log(data2);
//             pokeDescription = data2.description;
//         });
//
//         // 3rd GET request to get an image
//         $.getJSON(pokeURL2, function(data3){
//             console.log(data3);
//             console.log(JSON.stringify(data, null, "  "));
//             /*
//             console.log("Number: ", pokeID);
//             console.log("Name: ", pokeName);
//             console.log("Type 1: ", pokeType1);
//             console.log("Type 2: ", pokeType2);
//             console.log("Description URI: ", descriptionURI);
//             console.log("Description: ", pokeDescription);
//             */
//         });
//
//     });	// 2nd and 3rd GET requests are nested in success function of 1st GET request
// }

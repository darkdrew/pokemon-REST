

(function pokedexApp(){
  //start stuff when browser loaded
    this.init = function() {
        this.searchPokemon();
        this.getPokemon();
    };

    this.searchPokemon = function() {

    }


    this.getPokemon = function() {
      var data = [];
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
        const urls = [`https://pokeapi.co/api/v1/pokemon/charmander/`, `https://pokeapi.co/api/v2/pokemon/charmander/`];

        // var url = `https://pokeapi.co/api/v1/pokemon/charmander/`;
        var url2 = `https://pokeapi.co/api/v2/pokemon/charmander/`;



        Promise.all(urls.map( (url) => {
            return fetch(url);
          })
        )
        .then( (response) => {
            return Promise.all(
              response.map( (res) => {
              return res.json();
            })
          )
        })
        .then( (result) => {
            // const descriptionURI = "http://pokeapi.co" + result[0].descriptions[0].resource_uri;
            // urls.push(descriptionURI);
            // displayPokemon(result);
            // console.log(descriptionURI);

            // return fetch(descriptionURI);

            data["results"] = result;
            displayPokemon(data);
        })
        // .then ( (descriptions,result) => {
        //     console.log(descriptions);
        //     console.log("results " + result);
        // })
        .catch( (error) => {
          alert(error);
        })
        console.log(result);


        // console.log(data);


          // displayPokemon(data);

          //
          // fetch(descriptionURI)
          // .then(function(response) {
          //     return response.json();
          //   })
          // .then(function(json) {
          //
          //     // console.log("Description URI: ", data);
          //     // console.log("Description: ", pokeDescription);
          //
          //   })
          // .catch(function(err){
          //       alert(err);
          //   });


          // fetch(url2, {method:'get'}).then(function(response) {
          //     return response.json();
          //   }).then(function(json3) {
          //     var imageURI = json3.sprites.front_default;
          //     // data.push({"image": imageURI});
          //     // console.log(imageURI);
          //   }).catch(function(err){
          //       alert(err);
          //   });
          // // console.log(data);




    };

    this.displayPokemon = (json) => {
        var content_container = document.querySelector("#content-container");
        var template = "";

      //       for(var i in data){
      //         if (data.hasOwnProperty(i)) {
      //       console.log(i, data[i]);
      //   }
      // }

      // const pokeID = json[0].national_id;
      // const pokeName = json[0].name;
      // const pokeType1 = json[0].types[0].name;
      // if (json[0].types.length == 2) {
      //     const pokeType2 = json[0].types[1].name;
      //   } else {
      //     const pokeType2 = null;
      //   }


      // let pokeDescription = "";

      console.log(json['results'][0]);




        // for(var i = 0; i < json.length; i++){
        //       // template += '<div class="card_list">'+ json[i].name +'</div>';
        //       // template += '<div style="background:url('+ json.sprites[i].resource_uri +');"</div>';
        // }

        // template += '<div>'+ pokeName +'</div>';
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

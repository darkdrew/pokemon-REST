

(function pokedexApp(){
  //start stuff when browser loaded
    this.init = function() {
        this.searchPokemon();
        this.getPokemon();
    };

    this.searchPokemon = function() {

    }

    this.getPokemon = function() {
        var http = new XMLHttpRequest();
        var url_1 = `https://pokeapi.co/api/v1/pokemon/charmander/`;
        var url_2 =
        var method = "GET";
        http.open(method, url);

        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
              var json = JSON.parse(http.response);
              displayPokemon(json);
              // console.log(json);
            } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
              alert("Error");
            }
        }
        http.send();
    };

    this.displayPokemon = function(json){
        var content_container = document.querySelector("#content-container");
        var template = "";

            for(var i in json.sprites){
              if (json.sprites.hasOwnProperty(i)) {
            console.log('key name= '+ i, 'value= ' + json.sprites[i]);
        }
      };

        for(var i = 0; i < json.sprites.length; i++){
              // template += '<div class="card_list">'+ json[i].name +'</div>';
              // template += '<div style="background:url('+ json.sprites[i].resource_uri +');"</div>';

        }

        template += '<div>'+ json.name +'</div>';

        console.log(json.name);
        console.log(json.sprites);

        content_container.innerHTML = "";
        content_container.insertAdjacentHTML("afterbegin", template);

    };

    this.init();
})();

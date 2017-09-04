

(function pokedexApp(){
  //start stuff when browser loaded
    this.init = function() {
        this.searchPokemon();
        this.getPokemon();
    };

    this.searchPokemon = function() {

    }


    this.getPokemon = function() {

        // API url V1 and V2
        const urls = [`https://pokeapi.co/api/v1/pokemon/squirtle/`, `https://pokeapi.co/api/v2/pokemon/squirtle/`];

        //Higher Scope for passing results to pass down promise chain
        let result1;

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
            let descriptionURI = "https://pokeapi.co" + result[0].descriptions[0].resource_uri;
            result1 = result;
            return fetch(descriptionURI);
        })
        .then ( (response2) => {
            return response2.json();
        })
        .then( (result2) => {
            result1.push(result2);
            displayPokemon(result1);
        })
        .catch( (error) => {
          console.log(error);
        });

    }; //End of GetPokemon

    this.displayPokemon = (json) => {
        const content_container = document.querySelector("#content-container");
        let template = "";

      let pokeID = json[0].national_id;
      let pokeName = json[0].name;
      let pokeType1 = json[0].types[0].name;
      let imageURI = json[1].sprites.front_default;
      let pokeDescription = json[2].description;
      let pokeAttack = json[0].attack;
      let pokeDefense = json[0].defense;

      let pokeAbilities = json[0].abilities.map( (item)=> item.name );
      let pokeEggGroup = json[0].egg_groups.map( (item)=> item.name );

      let pokeEvolution = json[0].evolutions;
      let pokeEvolutionTo = [...new Set(pokeEvolution.map( (item)=> item.to ) )];
      let pokeEvolutionLevel = [...new Set(pokeEvolution.map( (item)=> item.level ) )];
      let pokeEvolutionMethod = [...new Set(pokeEvolution.map( (item)=> item.method ) )];

        if(pokeEvolution.length === 0){
            pokeEvolutionTo = null;
            pokeEvolutionLevel = null;
            pokeEvolutionMethod = null;
        }else if(!pokeEvolutionTo){
            pokeEvolutionTo = null;
        }else if (typeof pokeEvolutionLevel[0] === 'undefined' || pokeEvolutionLevel === null){
            pokeEvolutionLevel = null;
        }


        let pokeType2;
        if (json[0].types.length === 2) {
            pokeType2 = json[0].types[1].name;
          } else {
            pokeType2 = null;
          }

      let pokeMoves = json[0].moves.map( (item) => item.name);

      console.log(pokeID,pokeName,pokeType1, pokeType2, pokeDescription, pokeAttack, pokeDefense ,pokeAbilities, pokeEggGroup,pokeEvolutionTo, pokeEvolutionTo ,pokeEvolutionLevel,pokeEvolutionMethod,imageURI, pokeMoves);
      console.log(json);

      template +=`
      <div class="col col-md-4">

        <div class="col-md-12 text-center box"><img src="${imageURI}"></div>

        <div class="col-md-12 text-center border-list"># ${pokeID}</div>
        <div class="col-md-12 text-center border-list">${pokeName}</div>
        <div class="col-md-12 text-center border-list">Type1: ${pokeType1}</div>
        <div class="col-md-12 text-center border-list">Type2: ${pokeType2}</div>

      </div>


      <div class="col">
          <div class="col-md-12">
              <div class="card" style="margin-bottom:10px;">
                <div class="card-block">
                  <div class="card-text">Description: ${pokeDescription}</div>
                </div>
              </div>
          </div>


          <div class="col-md-12">
                <div class="card" style="margin-bottom:10px;">
                  <div class="card-block">
                    <div class="card-text">Species: ${pokeEggGroup}</div>
                  </div>
                  <div class="card-block">
                    <div class="card-text">Abilities: ${pokeAbilities}</div>
                  </div>
                </div>
          </div>


        <div class="col-md-12">
          <div class="card" style="margin-bottom:10px;">
            <div class="row">
              <div class="col-md-6 card-block">Attack: ${pokeAttack}</div>
              <div class="col-md-6 card-block">Defense: ${pokeDefense}</div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="card" style="margin-bottom:10px;">
            <div class="card-block">Evolve to: ${pokeEvolutionTo}</div>
            <div class="card-block">Evolve level: ${pokeEvolutionLevel}</div>
            <div class="card-block">Evolve method: ${pokeEvolutionMethod}</div>
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#flipFlop">List of Moves</button>

          </div>
        </div>

      </div>
      `;

      template +=`
      <div class="modal fade" id="flipFlop" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">List of Moves</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">${pokeMoves}</div>
           </div>
          </div>
      </div>
      `;

        content_container.innerHTML = "";
        content_container.insertAdjacentHTML("afterbegin", template);
    };

    

    this.init();
})();



(function pokedexApp(){
  //start stuff when browser loaded
    this.init = function() {
        this.searchPokemon();
    };

    this.searchPokemon = () => {

      const form = document.querySelector('#form');
        form.addEventListener("submit",function(e){
            e.preventDefault();
            let value = document.querySelector('#input_search').value;
            form.reset();
            getPokemon(value.toLowerCase().replace(/\s+/g, ''));
            // getData(value.split(' ').join("+"));
        });
        // Click submit
        document.querySelector("#btn-submit").addEventListener("click", (e)=>{
            e.preventDefault();
            let value = document.querySelector('#input_search').value;
            form.reset();
            getPokemon(value.toLowerCase().replace(/\s+/g, ''));
        });
    };


    this.getPokemon = (pokemon) => {

        // API url V1 and V2
        const urls = [`https://pokeapi.co/api/v1/pokemon/${pokemon}/`, `https://pokeapi.co/api/v2/pokemon/${pokemon}/`];
        console.log(urls);
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
          document.querySelector('#not_match').style.display = 'block';
          document.querySelector("#content-container").innerHTML = "";
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
      let pokeSpeedName = json[1].stats[0].stat.name;
      let pokeSpeedStat = json[1].stats[0].base_stat;
      let pokeSAttackName = json[1].stats[2].stat.name;
      let pokeSAttackStat = json[1].stats[2].base_stat;
      let pokeWeight = json[0].weight;
      let pokeHeight = json[0].height;
      let pokeHp = json[0].hp;

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

      console.log(json[1].stats[0].stat.name);
      console.log(json[1].stats[0].base_stat);

      document.querySelector('#not_match').style.display = 'none';

      template +=`
      <div class="col col-md-4">

        <div class="col-md-12 text-center box"><img src="${imageURI}"></div>

        <div class="col-md-12 text-center border-list" style="background-color:#ff747a;"># ${pokeID}</div>
        <div class="col-md-12 text-center border-list">${pokeName}</div>
        <div class="col-md-12 text-center border-list">Type1: ${pokeType1}</div>
        `;
        if (pokeType2 != null){
      template +=`<div class="col-md-12 text-center border-list">Type2: ${pokeType2}</div>`;
        }
      template +=`
        <div class="col-md-12 text-center border-list">Health: ${pokeHp} <i class="fa fa-heart-o" aria-hidden="true"></i></div>
        <div class="col-md-12 text-center border-list">Weight: ${pokeWeight}kg</div>
        <div class="col-md-12 text-center border-list">Height: ${pokeHeight}m</div>
      </div>


      <div class="col">
          <div class="col-md-12">
              <div class="card" style="margin-bottom:10px;background-color:#27c89f;">
                <div class="card-block">
                  <div class="card-text"><span class="font">Description: </span>${pokeDescription}</div>
                </div>
              </div>
          </div>


          <div class="col-md-12">
                <div class="card" style="margin-bottom:10px;background-color:#ffc833;">
                  <div class="card-block">
                    <div class="card-text"><span class="font">Species: </span>${pokeEggGroup}</div>
                  </div>
                  <div class="card-block">
                    <div class="card-text"><span class="font">Abilities: </span>${pokeAbilities}</div>
                  </div>
                </div>
          </div>


        <div class="col-md-12">
          <div class="card" style="margin-bottom:10px;background-color:#8ded8e;">
            <div class="row">
                <div class="card-block">
                    <div class="col-md-8"><span class="font">Attack: </span>${pokeAttack}</div>
                </div>
                <div class="card-block">
                    <div class="col-md-8"><span class="font">Defense: </span>${pokeDefense}</div>
                </div>
                <div class="card-block">
                    <div class="col-md-8"><span class="font">${pokeSpeedName}: </span>${pokeSpeedStat}</div>
                </div>
            </div>
          </div>
        </div>


        <div class="col-md-12">
          <div class="card" style="margin-bottom:10px;background-color:#3fe5e3;">
            <div class="card-block"><span class="font">Evolve to: </span>${pokeEvolutionTo}</div>
        `;
        if (pokeEvolutionLevel != null){
        template +=`<div class="card-block"><span class="font">Evolve level: </span>${pokeEvolutionLevel}</div>`;
        }
        template +=`
            <div class="card-block"><span class="font">Evolve method: </span>${pokeEvolutionMethod}</div>
          </div>
        </div>

        <div class="col-md-12">
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModalLong">List of Moves</button>
        </div>

      </div>
      `;

      template +=`
      <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">List of Moves</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
      `;
      template +=`
            <div class="modal-body">
      `;
      pokeMoves.forEach((value, i) => {
      template +=`
               <span class="badge badge-pill badge-info" style="font-size:20px;margin:5px;">${value}</span>
      `;
      });
      template +=`
             </div>
      `;
      template +=`
           </div>
          </div>
      </div>
      `;

        content_container.innerHTML = "";
        content_container.insertAdjacentHTML("afterbegin", template);
      // } //End of if statement
      // else {
      //   document.querySelector('#not_match').style.display = 'block';
      // }
    }; //End of getPokemon function

    this.init();
})();

//Imprimir pokemon + habilidad 10ptos
//Imprimir pokemon + todas las habilidades 15puntos
//Imprimir pokemon habilidades y cualquier otra cosas del pokemon +20ptos
//No hacerlo con document.write 30pts
//Hacerlo con jquery 35ptos
//Agregar CSS 45ptos

$(document).ready(function(){

  $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        /*console.log(modal, trigger);*/
      },
      complete: function() {} // Callback for Modal close
    }
  );

  var insertarPokemon = function(pokemon) {
    var html_pokemon = '<div class="col s12 m2 pokemon-single" id="'+pokemon.id+'">' +
        '<a href="#pokemon-modal">' +
        '    <div class="pokemon-content">' +
        '        <img class="responsive-img pokemon" src="https://img.pokemondb.net/sprites/x-y/normal/'+pokemon.name+'.png" alt="Bulbasaur">' +
        '        <p class="pokemon-icons center-align">' +
        '            <img src="assets/icon/pokeball_gray.png">' +
        '            <img src="assets/icon/valentines-heart.png">' +
        '            <img src="assets/icon/data.png">' +
        '        </p>' +
        '        <p class="pokemon-name center-align">' +
        '            ' + pokemon.name + 
        '             <br><i>Peso:</i>' +  pokemon.weight;
    
        var habilidades = "";
        $.each(pokemon.abilities, function (index, pokemon) {
            habilidades += pokemon.ability.name + ', ';
        });

    html_pokemon += '<br><i>Habilidades:</i>' +  habilidades +
        '        </p>' +
        '    </div>' +
        '</a>' +
    '</div>';

    $("#pokemones-container").append(html_pokemon);
  }

  var ajaxInsertarDetalles = function(url) {
    /*console.log(url);*/

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {'limit': '1'},
    })
    .done(function(pokemon) {
        insertarPokemon(pokemon);
    })
    .fail(function() {
        /*console.log("error");*/
    })
    .always(function() {
        /*console.log("complete");*/
    });
  }

  var generarListaDePokemones = function(json_pokemones) {
    $.each(json_pokemones, function (index, pokemon) {
        /*console.log(pokemon);*/
        /*insertarPokemon(pokemon.name);*/
        ajaxInsertarDetalles(pokemon.url);
    });
  }

  var ajaxPokemon = function() {
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon',
        type: 'GET',
        dataType: 'json',
        data: {'limit': '15'},
    })
    .done(function(respuesta) {
        /*console.log(respuesta);*/
        /*console.log(respuesta.results);*/
        generarListaDePokemones(respuesta.results);
    })
    .fail(function() {
        /*console.log("error");*/
    })
    .always(function() {
        /*console.log("complete");*/
    });
  }

  ajaxPokemon();

  $("#pokemones-container").on('click', '.pokemon-single', function(event) {
    event.preventDefault();
    /*console.log($(this).find(".pokemon-name").text());*/
    $("#pokemon-modal h4").text($(this).find('.pokemon-name').text());
    $("#pokemon-modal img.modal-img").attr("src", $(this).find('img').attr("src"));
  });

});

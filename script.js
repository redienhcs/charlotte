
function iniciar() {
  clearInterval(timer);
  //Iniciar timer
  var dataAtual = new Date();
  var dataFinal = addMinutes( dataAtual, parseInt( $('#tempoQuestionario').val()))

  timer = setInterval( function () {
    dataAtual = new Date().getTime();
    t = dataFinal.getTime()- dataAtual;

    var days = Math.floor( t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t %(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById("clock").innerHTML = minutes + ":" + seconds;

    if (t < 0) {
      clearInterval(timer);
      document.getElementById("clock").innerHTML = '<span style="redColor">Finalizado</span>';
      window.alert('Tempo finalizado');
    }
  });

  //Iniciar as perguntas
  gerarPergunta();
}

function calcularTempoFinal( ) {
  return dataFinal = addMinutes( new Date, 5)
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */

  timer = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

function gerarPergunta() {
  var currentQuestion		= $('#hid_currentQuestion');

  var quantidadePerguntas = parseInt( $('#quantidadePerguntas').val());
  var limiteInferior = parseInt( $('#limiteInferior').val())
  var limiteSuperior = parseInt( $('#limiteSuperior').val())

  primeiro_numero = Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + limiteInferior;
  segundo_numero = Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + limiteInferior;

  resultado = primeiro_numero+segundo_numero

  currentQuestion.val( resultado);
  $('#pergunta' ).html( primeiro_numero +"+"+segundo_numero );

  $('#inputResposta' ).focus();

}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function enviarResposta() {
  if( $('#inputResposta').val() != 0 ) {
    var respostasCorretas = $('#hid_respostasCorretas');
    var respostasErradas	= $('#hid_respostasErradas');
    var totalDePerguntas = $('#hid_totalPerguntas' );

    var respostaCorreta		= $('#hid_currentQuestion').val();
    var respostaUsuario		= $('#inputResposta').val();

    var valorRespostasErradas   =   parseInt( respostasErradas.val() );
    var valorRespostasCorretas  =   parseInt( respostasCorretas.val() );

    if( respostaCorreta == respostaUsuario) {
      valorRespostasCorretas +=1;

      respostasCorretas.val( valorRespostasCorretas ) ;

      $('#info_nroPerguntasCertas' ).html( respostasCorretas.val( ) );

      $('.info_sug').html( 'Resposta => '+$('#pergunta' ).html()+' : '+respostaCorreta );
      $('.info_sug').addClass('greenColor');
      $('.info_sug').removeClass('redColor');



    } else {
      console.log("Resposta errada.")
      valorRespostasErradas +=1;
      respostasErradas.val( valorRespostasErradas);

      $('#info_nroPerguntasErradas' ).html( respostasErradas.val() );
      $('.info_sug').html( 'Resposta => '+$('#pergunta' ).html()+' : '+respostaCorreta );
      $('.info_sug').addClass('redColor');
      $('.info_sug').removeClass('greenColor');

    }





    var intTotalPerguntas = parseInt( totalDePerguntas.val());
    intTotalPerguntas +=1;
    totalDePerguntas.val( intTotalPerguntas );

    console.log(
      "Respostas corretas: "+valorRespostasCorretas,
      "Respostas erradas: "+valorRespostasErradas,
      "Total de respostas:" + intTotalPerguntas
    );

    var porcentagem = valorRespostasCorretas/(valorRespostasErradas+valorRespostasCorretas);
    console.log("Porcentagem: "+porcentagem);
    $('#info_numeroPorcentagem' ).html( porcentagem*100 );


    $('#info_totalDePerguntas' ).html( intTotalPerguntas);



  } else {
    console.log("Sem resposta");
  }

  $('#inputResposta').val('');
  gerarPergunta();

  return false;
}

function changeDisplay( elementId ) {
  if( $( elementId ).css('display') == 'none') {
    $( elementId ).css('display' , 'block');
  } else {
    $( elementId ).css('display' , 'none');
  }
}

function resetar(){
  $('#hid_respostasCorretas').val('0');
  $('#hid_respostasErradas').val('0');
  $('#hid_currentQuestion').val('');
  $('#hid_totalPerguntas').val('0');
  $('#inputResposta').val('');
  $('#tempoQuestionario').val('5');


  $('#info_nroPerguntasCertas').html('0');
  $('#info_nroPerguntasErradas').html('0');
  $('#info_numeroPorcentagem').html('0');
  $('#info_totalDePerguntas').html('1');
  $('.info_sug').html("");
}

function limparCampos(){
  $('#hid_respostasCorretas').val('0');
  $('#hid_respostasErradas').val('0');
  $('#hid_currentQuestion').val('');
  $('#hid_totalPerguntas').val('0');
  $('#inputResposta').val('');


  $('#info_nroPerguntasCertas').html('0');
  $('#info_nroPerguntasErradas').html('0');
  $('#info_numeroPorcentagem').html('0');
  $('#info_totalDePerguntas').html('1');
  $('.info_sug').html("");
}

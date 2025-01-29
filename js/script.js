$(document).ready(function () {
  //Ocultar a 'div-erro'
  $("#div-erro").hide();
  async function CarregarDados() {
    try {
      $("#div-erro").hide();
      const response = await fetch(
        "https://www.mercadobitcoin.net/api/BTC/trades/"
      );
      const dados = await response.json();
      prepararMapas(dados);
    } catch (e) {
      $("#div-erro").show();
      $("#div-erro").html("<b>Erro ao carregar acessar API</b>" + e);
    }
  }
  prepararMapas = (dados) => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    //criar um arryay para os dados de cada linha
    dados_linha = [['Índice', 'Preço']];
    $.each(dados, function (i, item) {
            dados_linha.push([new Date(item.date * 1000), (item.price)]);
    });

    function drawChart() {
      var data = google.visualization.arrayToDataTable(dados_linha);

      var options = {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
      };

      var chart = new google.visualization.LineChart(
        document.getElementById("grafico-precos")
      );

      chart.draw(data, options);
    }
  };

  //Tornar o método visível para os eventos
  window.CarregarDados = CarregarDados;
});

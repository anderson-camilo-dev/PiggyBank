class Transacoes {
  constructor() {
    //atributos {
    this.id = 1;
    this.arrayTrans = [];
    this.entrada = 0;
    this.saida = 0;

    //    }
  }

  // o usuario vai clicar no botão e ele vai entrar na função Adicionar()
  Adicionar() {
    //ele vai criar uma variavel que vai receber os dados da função LerDados()
    let transacoes = this.LerDados();

    //ele vai ver se a função validaCampo é verdadeira, se for verdadeira ela adiciona os dados que a função ValidaCampo retornaram no array por meio da função AdicionarNoArray()
    if (this.validaCampo(transacoes)) {
      this.AdicionarNoArray(transacoes);
    }

    // depois ela vai chmar a função listaTabela() pra gerar a tabela
    this.listaTabela();
    this.Total();
    this.Saida();
    this.Entrada();

    console.log(this.arrayTrans[0].transacoes);
  } //metodos

  AdicionarNoArray(transacoes) {
    //essa função vai dar push (injetar) as informações que estão no função Transacoes()
    this.arrayTrans.push(transacoes);
    //vai mudar o id, o id vai receber id + 1 = 2, id + 1 = 3 ...
    this.id++;
  }

  listaTabela() {
    //essa função vai ser responsavel por gerar a tabela com a lista de transações

    // cria uma variavel que recebe a div que vai ser colocada as transações
    let resultado = document.querySelector("div.resultado-lista");
    resultado.innerHTML = ""; // Limpa a lista antes de desenhar para não duplicar tudo

    //ele roda o array pra pegar dados de cada espaço (id) do array
    for (let i = 0; i < this.arrayTrans.length; i++) {
      let item = this.arrayTrans[i]; // Pegamos a transação atual da lista

      //dera a transação na posição do "i" que começa no 0
      // Dentro do seu loop for no listaTabela:
      resultado.innerHTML += `
<div class="resultado">
    <h1 id="categoria-resultado">${item.nomeTrans}</h1> 
    <h1 id="valor">R$ ${item.valorTrans}</h1>
    <input class="excluir" type="button" value="X" onclick="transacoes.Deletar(${item.idTrans})">
</div>`;

      console.log(this.arrayTrans[i]);
    }
  }
  LerDados() {
    // vai criar uma variavel que vai receber as informações da transações
    let transacoes = {};
    this.checkbox = document.getElementsByName("opcao");

    transacoes.idTrans = this.id;
    transacoes.nomeTrans = document.querySelector("input#nome-transacao").value;
    transacoes.valorTrans = document.querySelector(
      "input#valor-transacao",
    ).value;
    transacoes.categoriaTrans = document.querySelector(
      "input#categoria-transacao",
    ).value;

    transacoes.tipo = "";
    if (this.checkbox[0].checked) {
      transacoes.tipo = "entrada";
    } else {
      transacoes.tipo = "saida";
    }

    // vai retornar a variavel com os dados
    return transacoes;
  }

  validaCampo(transacoes) {
    //vai criar uma variavel pra ser verificada no final
    let msg = "";

    //vai verificar se os campos estão prenchidos
    if (transacoes.nomeTrans == "") {
      msg += "- Informe o nome da transação\n";
    }
    if (transacoes.valorTrans == "") {
      msg += "- Informe o valor da transação \n";
    }
    if (transacoes.categoriaTrans == "") {
      msg += "- Informe a categoria da transação \n";
    }

    //se o campo n for igual a null, se a variavel msg = '' então ela vai retornar false
    if (msg != "") {
      alert(msg);
      return false;
    }

    //se msg n estiver vazia ele vai retornar true
    return true;
  }

  Deletar(idProcurado) {
    // 1. Encontrar a posição (índice) do item que tem o ID que recebemos
    // Percorremos o array e verificamos qual item tem o idTrans igual ao idProcurado
    for (let i = 0; i < this.arrayTrans.length; i++) {
      if (this.arrayTrans[i].idTrans == idProcurado) {
        // 2. Remove 1 elemento daquela posição específica
        this.arrayTrans.splice(i, 1);
      }
    }

    // 3. Manda redesenhar a tabela na tela
    this.listaTabela();

    alert("Transação " + idProcurado + " removida!");
    this.Total();
    this.Saida();
  } //metodos

  Total() {
    // vai criar uma variavel que vai receber as informações da transações
    let resultadoSeta = document.querySelector("img.img-seta");
    this.total = 0;
    let resultadoTotal = document.querySelector("span#resultado-total");

    for (let i = 0; i < this.arrayTrans.length; i++) {
      if (this.arrayTrans[i].tipo == "entrada") {
        this.total = this.total + Number(this.arrayTrans[i].valorTrans);
      } else if (this.arrayTrans[i].tipo == "saida") {
        this.total = this.total - Number(this.arrayTrans[i].valorTrans);
      }
    }
    if (this.total < 0) {
      resultadoSeta.src = "./img/icons/graficoCaindo.ico";
    } else if (this.total > 0) {
      resultadoSeta.src = "./img/icons/graficoSubindo.ico";
    } else {
       resultadoSeta.src = "";
    }
    resultadoTotal.innerHTML = `${this.total}`;

    
  }

  

  Saida() {
    this.saida = 0;
    let resultadoSaida = document.querySelector("span#resultado-saida");

    for (let i = 0; i < this.arrayTrans.length; i++) {
      if (this.arrayTrans[i].tipo == "saida") {
        this.saida = this.saida + Number(this.arrayTrans[i].valorTrans);
      }
    }
    resultadoSaida.innerHTML = `${this.saida}`;
  }

  Entrada() {
    this.entrada = 0;
    let resultadoEntrada = document.querySelector("span#resultado-entrada");

    for (let i = 0; i < this.arrayTrans.length; i++) {
      if (this.arrayTrans[i].tipo == "entrada") {
        this.entrada = this.entrada + Number(this.arrayTrans[i].valorTrans);
      }
    }
    resultadoEntrada.innerHTML = `${this.entrada}`;
  }
}

let transacoes = new Transacoes();

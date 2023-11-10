let listaNumerosSorteados = [];
let listaChute = []
let numeroSecreto;
let tamanho;
let tentativas = 1;
let cliques = 1;
var maximo = 100;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha o número máximo que deseja acertar');
exibirTextoNaTela('button', 'Começar!');

function gerarNumeroAleatorio(maximo){
    let numeroEscolhido = parseInt(Math.random() * maximo + 1);
    if (listaNumerosSorteados.includes(numeroEscolhido)){
       return gerarNumeroAleatorio(maximo);
    }else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

document.querySelector('.container__input').addEventListener('keyup',function(event){
    if (event.key == 'Enter'){
        verificarChute()
    }
})

function verificarChute(){
    if (cliques == 1){
        maximo = document.querySelector('input').value;
        numeroSecreto = gerarNumeroAleatorio(maximo);
        exibirTextoNaTela('p','Escolha um número entre 1 e ' + maximo);
        exibirTextoNaTela('button','Chute')
        limparCampo()
    }else{    
        let chute = document.querySelector('input').value;
        console.log(numeroSecreto);
        if (chute == numeroSecreto){
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Parabéns! Você acertou com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', mensagemTentativas);
        }else{
            listaChute.push(chute);
            tamanho = chute > numeroSecreto ? 'menor' : 'maior';
            exibirTextoNaTela('h1', 'O número é '+ tamanho);
            exibirTextoNaTela('p', listaChute);
            tentativas++;
            limparCampo()
        }
        document.getElementById('reiniciar').disabled = false;
    }
    cliques++;
}

function novoJogo(maximo){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e ' + maximo);
    tentativas = 1;
    cliques = 2;
    document.getElementById('reiniciar').disabled = true;
    limparCampo();
    listaChute = [];
    numeroSecreto = gerarNumeroAleatorio(maximo);
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ''
}
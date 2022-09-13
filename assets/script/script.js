const moedaAtualUm = document.getElementById('moedaUm');
const quantidadeAtualUm = document.getElementById('quantidadeUm');
const moedaAtualDois = document.getElementById('moedaDois');
const quantidadeAtualDois = document.getElementById('quantidadeDois');
const taxa = document.getElementById('taxa');
const trocar = document.getElementById('inverter');

function Calcular() {
    const moeda_Um = moedaAtualUm.value;
    const moeda_Dois = moedaAtualDois.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${moeda_Um}`)
        .then(res => res.json())
        .then(data => {
            const taxaAtual = data.rates[moeda_Dois];

            taxa.innerText = `1 ${moeda_Um} = ${taxaAtual} ${moeda_Dois}`;

            quantidadeAtualDois.value = (quantidadeAtualUm.value * taxaAtual).toFixed(2);
        });
}

moedaAtualUm.addEventListener('change', Calcular);
quantidadeAtualUm.addEventListener('input', Calcular);
moedaAtualDois.addEventListener('change', Calcular);
quantidadeAtualDois.addEventListener('input', Calcular);

trocar.addEventListener('click', () => {
    const temp = moedaAtualUm.value;
    moedaAtualUm.value = moedaAtualDois.value;
    moedaAtualDois.value = temp;
    Calcular();
});

Calcular();
// 1. Seleção dos elementos do HTML usando as classes e IDs ajustados
const convertButton = document.querySelector(".convert-button");
const cashSelect = document.querySelector(".cash-select");
const currencySelect = document.querySelector(".currency-select");

const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value-converted");

const cashName = document.getElementById("cash-name");
const cashImage = document.querySelector(".cash-img");
const currencyName = document.getElementById("currency-name");
const currencyImage = document.querySelector(".currency-img");

// 2. Objeto de mapeamento das taxas de câmbio (Tendo o Real - BRL como base de cálculo)
const rates = {
    real: 1.00,
    dolar: 5.18,
    euro: 5.82,
    libra: 6.62,
    bitcoin: 416419.00
};

// 3. Função principal que realiza o cálculo e formata os valores na tela
function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value);

    // Validação de segurança: se o campo estiver vazio ou for menor/igual a zero, ignora o cálculo
    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        return;
    }

    const fromCurrency = cashSelect.value;     // Moeda selecionada no "De"
    const toCurrency = currencySelect.value;   // Moeda selecionada no "Para"

    // PASSO 1: Converte o valor da moeda de origem nativa para a base em REAL (BRL)
    const valueInReal = inputCurrencyValue * rates[fromCurrency];

    // PASSO 2: Converte o valor base de Real para a moeda final de destino
    const finalConvertedValue = valueInReal / rates[toCurrency];

    // --- Formatação e Exibição do Valor de Origem (Bloco de Cima / Esquerda) ---
    if (fromCurrency === "real") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inputCurrencyValue);
    } else if (fromCurrency === "dolar") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(inputCurrencyValue);
    } else if (fromCurrency === "euro") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(inputCurrencyValue);
    } else if (fromCurrency === "libra") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(inputCurrencyValue);
    } else if (fromCurrency === "bitcoin") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "BTC", minimumFractionDigits: 4 }).format(inputCurrencyValue);
    }

    // --- Formatação e Exibição do Valor Final Convertido (Bloco de Baixo / Direita) ---
    if (toCurrency === "real") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(finalConvertedValue);
    } else if (toCurrency === "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(finalConvertedValue);
    } else if (toCurrency === "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(finalConvertedValue);
    } else if (toCurrency === "libra") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(finalConvertedValue);
    } else if (toCurrency === "bitcoin") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", { style: "currency", currency: "BTC", minimumFractionDigits: 4 }).format(finalConvertedValue);
    }
}

// 4. Função dinâmica para gerenciar a troca de textos, bandeiras e disparar a atualização visual
function changeCurrency() {
    const currencyData = {
        real: { name: "Real Brasileiro", img: "./assets/Real.png" },
        "dolar-americano": { name: "Dólar americano", img: "./assets/dolar.png" },
        dolar: { name: "Dólar Americano", img: "./assets/dolar.png" },
        euro: { name: "Euro", img: "./assets/Euro-€.png" },
        libra: { name: "Libra", img: "./assets/libra.png" },
        bitcoin: { name: "Bitcoin", img: "./assets/bitcoin.png" }
    };
    // Atualiza a interface gráfica do seletor "Converter De"
    if (cashName && cashImage && currencyData[cashSelect.value]) {
        cashName.innerHTML = currencyData[cashSelect.value].name;
        cashImage.src = currencyData[cashSelect.value].img;
    }

    // Atualiza a interface gráfica do seletor "Converter Para"
    if (currencyName && currencyImage && currencyData[currencySelect.value]) {
        currencyName.innerHTML = currencyData[currencySelect.value].name;
        currencyImage.src = currencyData[currencySelect.value].img;
    }

    // Recalcula os valores na tela instantaneamente ao mudar qualquer select
    convertValues();
}

// 5. Mapeamento de Eventos (Listeners)
cashSelect.addEventListener("change", changeCurrency);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

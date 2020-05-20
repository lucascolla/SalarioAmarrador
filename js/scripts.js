document.getElementById("btn_calcular").onclick = calcular;

function calcular() {
    //declaração de variaveis
    var salBase = Number(document.getElementById("sal_base").value);
    var horaExtra = Number(document.getElementById("hora_extra").value);
    var horaNoturna = Number(document.getElementById("hora_noturna").value);
    var horaRisco = Number(document.getElementById("hora_risco").value);
    var domingos = Number(document.getElementById("domingos").value);
    var qtdDependentes = Number(document.getElementById("dependentes").value);
    var saude = Number(document.getElementById("saude").value);
    var diasUteis = 0;
    var inss = 0;
    var valorVT = 0;
    var aliquota_inss = 0;
    var deducao_inss = 0;
    var aliquota_irrf = 0;
    var deducao_irrf = 0;
    var vt = false;
    var vtcheck = document.getElementById("vt");

    if (vtcheck.checked) {
        vt = true;
    }
    else {
        vt = false;
    }


    //Calculos de adicionais
    diasUteis = (30 - domingos);

    var valorHora = (salBase / 180);

    var valorHoraExtra = (valorHora * 2) * horaExtra;
    var txtHoraExtra = document.getElementById("txtHoraExtra");
    txtHoraExtra.textContent = "Hora Extra: " + Number(valorHoraExtra).toFixed(2);

    var valorHoraNoturna = (valorHora * 0.5) * horaNoturna;
    var txtHoraNoturna = document.getElementById("txtHoraNoturna");
    txtHoraNoturna.textContent = "Hora Noturna: " + Number(valorHoraNoturna).toFixed(2);

    var valorHoraRisco = (valorHora * 0.4) * horaRisco;
    var txtHoraRisco = document.getElementById("txtHoraRisco");
    txtHoraRisco.textContent = "Adicional Risco: " + Number(valorHoraRisco).toFixed(2);

    var valorDsr = (((valorHoraExtra + valorHoraNoturna + valorHoraRisco) / diasUteis) * domingos);
    var txtDSR = document.getElementById("txtDSR");
    txtDSR.textContent = "DSR Variável: " + Number(valorDsr).toFixed(2);

    //Calculo Bruto
    var totalSoma = (salBase + valorHoraExtra + valorHoraNoturna + valorHoraRisco + valorDsr);
    var txtSomaTotal = document.getElementById("totalSoma");
    txtSomaTotal.textContent = "Salário Bruto: " + Number(totalSoma).toFixed(2);

    //Calculo do INSS --- ATUALIZADO 2020 ---
    if (totalSoma < 1045.1) {
        aliquota_inss = 0.075;
        deducao_inss = 0;
    }
    else if (totalSoma >= 1045.1 && totalSoma < 2089.61) {
        aliquota_inss = 0.09;
        deducao_inss = 15.684;
    }
    else if (totalSoma >= 2089.61 && totalSoma < 3134.41) {
        aliquota_inss = 0.12;
        deducao_inss = 78.378;
    }
    else if (totalSoma >= 3134.41 && totalSoma < 6101.07) {
        aliquota_inss = 0.14;
        deducao_inss = 141.068;
    }
    else {
        aliquota_inss = 0;
        deducao_inss = -713.08;
    }

    inss = (totalSoma * aliquota_inss - deducao_inss);
    var txtINSS = document.getElementById("txtINSS");
    txtINSS.textContent = "Desconto Inss: " + Number(inss).toFixed(2);


    //Calculo do VT
    if (vt == true) { valorVT = salBase * 0.06; }
    else { valorVT = 0; }
    var txtVT = document.getElementById("txtVT");
    txtVT.textContent = "Desconto VT: " + Number(valorVT).toFixed(2);

    //Calculo do VR
    var vr = salBase * 0.01;
    var txtVR = document.getElementById("txtVR");
    txtVR.textContent = "Desconto VR: " + Number(vr).toFixed(2);

    //Calculo Imposto de Renda
    var vlrDependentes = qtdDependentes * 189.59;
    var calculoRenda = totalSoma - inss - vlrDependentes;
    if (calculoRenda < 1903.99) {
        aliquota_irrf = 0;
        deducao_irrf = 0;
    }
    else if (calculoRenda >= 1903.99 && calculoRenda < 2836.66) {
        aliquota_irrf = 0.075;
        deducao_irrf = 142.80;
    }
    else if (calculoRenda >= 2836.66 && calculoRenda < 3751.06) {
        aliquota_irrf = 0.15;
        deducao_irrf = 354.80;
    }
    else if (calculoRenda >= 3751.06 && calculoRenda < 4664.68) {
        aliquota_irrf = 0.225;
        deducao_irrf = 636.13;
    }
    else {
        aliquota_irrf = 0.275;
        deducao_irrf = 869.36;
    }


    var irrf = (calculoRenda * aliquota_irrf - deducao_irrf);
    var txtIRRF = document.getElementById("txtIRRF");
    txtIRRF.textContent = "Retido na fonte: " + Number(irrf).toFixed(2);


    //Calculo descontos
    var totalDescontos = (inss + valorVT + vr + saude + irrf);

    //Calculo liquido
    var salLiquido = totalSoma - totalDescontos;
    var txtLiquido = document.getElementById("salLiquido");
    txtLiquido.textContent = "Salário Líquido: " + Number(salLiquido).toFixed(2);
}
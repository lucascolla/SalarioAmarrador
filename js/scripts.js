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
    var aliquota = 0;
    var deducao = 0;
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
    txtHoraExtra.textContent = "Hora Extra: R$ " + Number(valorHoraExtra).toFixed(2);

    var valorHoraNoturna = (valorHora * 0.5) * horaNoturna;
    var txtHoraNoturna = document.getElementById("txtHoraNoturna");
    txtHoraNoturna.textContent = "Hora Noturna: R$ " + Number(valorHoraNoturna).toFixed(2);

    var valorHoraRisco = (valorHora * 0.4) * horaRisco;
    var txtHoraRisco = document.getElementById("txtHoraRisco");
    txtHoraRisco.textContent = "Adicional Risco: R$ " + Number(valorHoraRisco).toFixed(2);

    var valorDsr = (((valorHoraExtra + valorHoraNoturna + valorHoraRisco) / diasUteis) * domingos);
    var txtDSR = document.getElementById("txtDSR");
    txtDSR.textContent = "DSR Variável: R$ " + Number(valorDsr).toFixed(2);

    //Calculo Bruto
    var totalSoma = (salBase + valorHoraExtra + valorHoraNoturna + valorHoraRisco + valorDsr);
    var txtSomaTotal = document.getElementById("totalSoma");
    txtSomaTotal.textContent = "Salário Bruto: R$ " + Number(totalSoma).toFixed(2);

    //Calculo do INSS
    if (totalSoma < 1556.95) { inss = totalSoma * 0.08; }
    else if (totalSoma >= 1556.95 && totalSoma < 2594.93) { inss = totalSoma * 0.09; }
    else { inss = totalSoma * 0.11; }
    var txtINSS = document.getElementById("txtINSS");
    txtINSS.textContent = "Desconto Inss: R$ " + Number(inss).toFixed(2);


    //Calculo do VT
    if (vt == true) { valorVT = salBase * 0.06; }
    else { valorVT = 0; }
    var txtVT = document.getElementById("txtVT");
    txtVT.textContent = "Desconto VT: R$ " + Number(valorVT).toFixed(2);

    //Calculo do VR
    var vr = salBase * 0.01;
    var txtVR = document.getElementById("txtVR");
    txtVR.textContent = "Desconto VR: R$ " + Number(vr).toFixed(2);

    //Calculo Imposto de Renda
    var vlrDependentes = qtdDependentes * 189.59;
    var calculoRenda = totalSoma - inss - vlrDependentes;
    if (calculoRenda < 1903.99) {
        aliquota = 0;
        deducao = 0;
    }
    else if (calculoRenda >= 1903.99 && calculoRenda < 2826.66) {
        aliquota = 0.075;
        deducao = 142.80;
    }
    else if (calculoRenda >= 2826.66 && calculoRenda < 3751.06) {
        aliquota = 0.15;
        deducao = 354.80;
    }
    else if (calculoRenda >= 3751.06 && calculoRenda < 4664.68) {
        aliquota = 0.225;
        deducao = 636.13;
    }
    else {
        aliquota = 0.275;
        deducao = 869.36;
    }


    var irrf = (calculoRenda * aliquota - deducao);
    var txtIRRF = document.getElementById("txtIRRF");
    txtIRRF.textContent = "Retido na fonte: R$ " + Number(irrf).toFixed(2);


    //Calculo descontos
    var totalDescontos = (inss + valorVT + vr + saude + irrf);

    //Calculo liquido
    var salLiquido = totalSoma - totalDescontos;
    var txtLiquido = document.getElementById("salLiquido");
    txtLiquido.textContent = "Salário Líquido: R$ " + Number(salLiquido).toFixed(2);
}
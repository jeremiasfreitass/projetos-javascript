var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

// Extração de informações do paciente do formulário
    var paciente = obtemPacienteDoFormulario(form); 



// Verificar validez dos dados do paciente
    var erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagensDeErro(erros);

        return;
    }

    adicionaPacienteNaTabela(paciente);


// Limpa campos e mensagens de erro do formulário após paciente ser adicionado
    form.reset();

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

//-------------------------------------------------------------------------------------------------------------

// Funções abaixo

function adicionaPacienteNaTabela(paciente){
     
    var pacienteTr = montaTr(paciente); // Cria a Tr e a Td do paciente

    var tabela = document.querySelector("#tabela-pacientes"); //Adiciona na tabela
    tabela.appendChild(pacienteTr);

}


function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){

    var pacienteTr = document.createElement("Tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement("Td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("Nome inválido!")
    }

    if(!validaPeso(paciente.peso)){ 
        erros.push("Peso inválido!");
    }

    if(!validaAltura(paciente.altura)){
        erros.push("Altura inválida!");
    }

    if(paciente.gordura.length == 0){
        erros.push("Gordura corporal inválida!");
    }

    return erros;
}


function exibeMensagensDeErro(erros){
    
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}
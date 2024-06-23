let votoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-direita');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa () {

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        
        (i === 0) ? numeroHtml += `<div class="numero pisca"></div>` : numeroHtml += `<div class="numero"></div>`;
    }

    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizarInterface () {

    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter( (item) => {

        return item.numero === numero;
    });

    if (candidato.length > 0) {
        
        candidato = candidato[0];
        votoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';

        for (let i in candidato.fotos) {

            if (candidato.fotos[i].pequeno) {

                fotosHtml += `<div class="d-1-imagem pequeno"><img src="${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML += `<br/> Vice: ${candidato.vice}`;

            } else {

                fotosHtml += `<div class="d-1-imagem"><img src="${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }

        }

        lateral.innerHTML = fotosHtml;

    } else {

        votoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

document.querySelectorAll('.btn-num').forEach( (e) => {

    e.addEventListener('click', () => {
        
        let numeroClicado = e.value;
        let elemento = document.querySelector('.numero.pisca');

        if (elemento !== null) {
            
            elemento.innerHTML = numeroClicado;
            numero = `${numero}${numeroClicado}`;

            elemento.classList.remove('pisca');
            if(elemento.nextElementSibling !== null) {
                
                elemento.nextElementSibling.classList.add('pisca');

            } else {

                atualizarInterface();
            }
        }
    });
});

document.querySelector('#funcaoBranco').addEventListener('click', () => {

    numero = '';
    votoBranco = true;
    votoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    lateral.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
});

document.querySelector('#funcaoCorrige').addEventListener('click', () => {

    comecarEtapa();
});

document.querySelector('#funcaoConfirma').addEventListener('click', () => {

    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {

        votoConfirmado = true;

    } else if (numero.length === etapa.numeros) {

        votoConfirmado = true;
    }

    if (votoConfirmado) {
        
        etapaAtual++;

        if (etapas[etapaAtual] !== undefined) {
            
            comecarEtapa();

        } else {

            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
        }
    }
});

comecarEtapa();
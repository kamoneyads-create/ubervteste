
export const PRELOADED_ADDRESSES: Record<string, any[]> = {
  'CURITIBA': [
    {
      pickup: { address: "Av. Sete de Setembro, 2775 - Rebouças, Curitiba - PR", lat: -25.4382, lng: -49.2672 },
      destination: { address: "Av. Rocha Pombo, 1500 - Águas Belas, São José dos Pinhais - PR", lat: -25.5317, lng: -49.1761 }
    },
    {
      pickup: { address: "R. Eng. Ostoja Roguski, 120 - Jardim Botânico, Curitiba - PR", lat: -25.4431, lng: -49.2397 },
      destination: { address: "R. Mal. Hermes, 999 - Centro Cívico, Curitiba - PR", lat: -25.4104, lng: -49.2671 }
    }
  ],
  'PORTO ALEGRE': [
    {
      pickup: { address: "Av. Severo Dullius, 904 - Anchieta, Porto Alegre - RS", lat: -29.9939, lng: -51.1711 },
      destination: { address: "Av. João Wallig, 1800 - Passo d'Areia, Porto Alegre - RS", lat: -30.0277, lng: -51.1631 }
    },
    {
      pickup: { address: "Av. Padre Cacique, 891 - Praia de Belas, Porto Alegre - RS", lat: -30.0655, lng: -51.2359 },
      destination: { address: "Av. João Pessoa, 500 - Farroupilha, Porto Alegre - RS", lat: -30.0368, lng: -51.2186 }
    }
  ],
  'SALVADOR': [
    {
      pickup: { address: "Praça Gago Coutinho, 100 - São Cristóvão, Salvador - BA", lat: -12.9111, lng: -38.3322 },
      destination: { address: "Largo do Pelourinho, 50 - Centro Histórico, Salvador - BA", lat: -12.9718, lng: -38.5086 }
    },
    {
      pickup: { address: "Av. Tancredo Neves, 148 - Caminho das Árvores, Salvador - BA", lat: -12.9801, lng: -38.4641 },
      destination: { address: "Largo do Farol da Barra, 20 - Barra, Salvador - BA", lat: -13.0104, lng: -38.5329 }
    }
  ],
  'FORTALEZA': [
    {
      pickup: { address: "Av. Sen. Carlos Jereissati, 3000 - Serrinha, Fortaleza - CE", lat: -3.7761, lng: -38.5326 },
      destination: { address: "R. Porto das Dunas, 2734 - Porto das Dunas, Aquiraz - CE", lat: -3.8408, lng: -38.3919 }
    },
    {
      pickup: { address: "Av. Washington Soares, 85 - Edson Queiroz, Fortaleza - CE", lat: -3.7554, lng: -38.4889 },
      destination: { address: "Av. Clóvis Arrais Maia, 1200 - Praia do Futuro, Fortaleza - CE", lat: -3.7411, lng: -38.4439 }
    }
  ],
  'BRASÍLIA': [
    {
      pickup: { address: "Lago Sul, Quadra 10, Brasília - DF", lat: -15.8697, lng: -47.9172 },
      destination: { address: "Eixo Monumental, Bloco B, Brasília - DF", lat: -15.7975, lng: -47.8642 }
    },
    {
      pickup: { address: "SCN Quadra 5, Bloco A - Asa Norte, Brasília - DF", lat: -15.7892, lng: -47.8894 },
      destination: { address: "SHIS QL 10, Lote 1/30 - Lago Sul, Brasília - DF", lat: -15.8247, lng: -47.8719 }
    }
  ],
  'RECIFE': [
    {
      pickup: { address: "Praça Min. Salgado Filho, 150 - Imbiribeira, Recife - PE", lat: -8.1263, lng: -34.9228 },
      destination: { address: "Praça Rio Branco, 10 - Recife Antigo, Recife - PE", lat: -8.0631, lng: -34.8711 }
    },
    {
      pickup: { address: "R. Padre Carapuceiro, 777 - Boa Viagem, Recife - PE", lat: -8.1191, lng: -34.9050 },
      destination: { address: "Av. Boa Viagem, 2000 - Boa Viagem, Recife - PE", lat: -8.1297, lng: -34.8925 }
    }
  ],
  'GOIÂNIA': [
    {
      pickup: { address: "Alameda Orlando de Moraes, 500 - Santa Genoveva, Goiânia - GO", lat: -16.6325, lng: -49.2211 },
      destination: { address: "Av. Dep. Jamel Cecílio, 3300 - Jardim Goiás, Goiânia - GO", lat: -16.7097, lng: -49.2344 }
    },
    {
      pickup: { address: "Av. T-10, 120 - Setor Bueno, Goiânia - GO", lat: -16.7056, lng: -49.2719 },
      destination: { address: "R. 44, 399 - Setor Norte Ferroviário, Goiânia - GO", lat: -16.6647, lng: -49.2611 }
    }
  ],
  'MANAUS': [
    {
      pickup: { address: "Av. Santos Dumont, 1350 - Tarumã, Manaus - AM", lat: -3.0358, lng: -60.0464 },
      destination: { address: "Largo de São Sebastião, 10 - Centro, Manaus - AM", lat: -3.1303, lng: -60.0236 }
    },
    {
      pickup: { address: "Av. Mário Ypiranga, 1300 - Adrianópolis, Manaus - AM", lat: -3.1039, lng: -60.0114 },
      destination: { address: "Av. Coronel Teixeira, 500 - Ponta Negra, Manaus - AM", lat: -3.0611, lng: -60.1011 }
    }
  ],
  'BELÉM': [
    {
      pickup: { address: "Av. Júlio César, 1200 - Val de Cans, Belém - PA", lat: -1.3831, lng: -48.4789 },
      destination: { address: "Av. Mal. Hermes, 450 - Campina, Belém - PA", lat: -1.4508, lng: -48.5011 }
    },
    {
      pickup: { address: "Travessa Padre Eutíquio, 1078 - Batista Campos, Belém - PA", lat: -1.4554, lng: -48.4889 },
      destination: { address: "Praça Justo Chermont, 10 - Nazaré, Belém - PA", lat: -1.4525, lng: -48.4786 }
    }
  ],
  'FLORIANÓPOLIS': [
    {
      pickup: { address: "Rod. Ac. ao Aeroporto, 6200 - Carianos, Florianópolis - SC", lat: -27.6701, lng: -48.5458 },
      destination: { address: "R. Bocaiúva, 2468 - Centro, Florianópolis - SC", lat: -27.5854, lng: -48.5441 }
    },
    {
      pickup: { address: "R. Conselheiro Mafra, 255 - Centro, Florianópolis - SC", lat: -27.5975, lng: -48.5511 },
      destination: { address: "Av. dos Búzios, 1500 - Jurerê, Florianópolis - SC", lat: -27.4411, lng: -48.4911 }
    }
  ],
  'VITÓRIA': [
    {
      pickup: { address: "Av. Roza Helena Schorling Albuquerque, 100 - Goiabeiras, Vitória - ES", lat: -20.2581, lng: -40.2864 },
      destination: { address: "Av. Américo Buaiz, 200 - Enseada do Suá, Vitória - ES", lat: -20.3154, lng: -40.2889 }
    },
    {
      pickup: { address: "Av. Dante Michelini, 500 - Camburi, Vitória - ES", lat: -20.2781, lng: -40.2811 },
      destination: { address: "R. Vasco Coutinho, 150 - Prainha, Vila Velha - ES", lat: -20.3289, lng: -40.2861 }
    }
  ],
  'NATAL': [
    {
      pickup: { address: "Av. Ruy Pereira dos Santos, 3100 - Aeroporto, São Gonçalo do Amarante - RN", lat: -5.7689, lng: -35.3664 },
      destination: { address: "Av. Erivan França, 450 - Ponta Negra, Natal - RN", lat: -5.8854, lng: -35.1741 }
    },
    {
      pickup: { address: "Av. Bernardo Vieira, 3775 - Tirol, Natal - RN", lat: -5.8111, lng: -35.2058 },
      destination: { address: "Vila de Ponta Negra, 100 - Ponta Negra, Natal - RN", lat: -5.8911, lng: -35.1689 }
    }
  ],
  'MACEIÓ': [
    {
      pickup: { address: "Rod. BR-104, 1500 - Tabuleiro do Martins, Maceió - AL", lat: -9.5108, lng: -35.7917 },
      destination: { address: "Av. Comendador Gustavo Paiva, 2990 - Mangabeiras, Maceió - AL", lat: -9.6454, lng: -35.7089 }
    },
    {
      pickup: { address: "Av. Dr. Antônio Gouveia, 120 - Pajuçara, Maceió - AL", lat: -9.6681, lng: -35.7011 },
      destination: { address: "Av. Silvio Carlos Viana, 300 - Ponta Verde, Maceió - AL", lat: -9.6611, lng: -35.6941 }
    }
  ],
  'CAMPO GRANDE': [
    {
      pickup: { address: "Av. Duque de Caxias, 1500 - Vila Serradinho, Campo Grande - MS", lat: -20.4697, lng: -54.6703 },
      destination: { address: "Av. Afonso Pena, 4909 - Santa Fé, Campo Grande - MS", lat: -20.4554, lng: -54.5889 }
    },
    {
      pickup: { address: "Av. Afonso Pena, 2000 - Itanhangá Park, Campo Grande - MS", lat: -20.4511, lng: -54.5711 },
      destination: { address: "Av. Gury Marques, 1215 - Universitário, Campo Grande - MS", lat: -20.5111, lng: -54.6111 }
    }
  ],
  'CUIABÁ': [
    {
      pickup: { address: "Av. João Ponce de Arruda, 500 - Jardim Aeroporto, Várzea Grande - MT", lat: -15.6528, lng: -56.1167 },
      destination: { address: "Av. Historiador Rubens de Mendonça, 3300 - Jardim Aclimação, Cuiabá - MT", lat: -15.5854, lng: -56.0689 }
    },
    {
      pickup: { address: "Av. Hermina Torquarto da Silva, 120 - Centro Político Administrativo, Cuiabá - MT", lat: -15.5711, lng: -56.0711 },
      destination: { address: "Av. Agrícola Paes de Barros, 100 - Verdão, Cuiabá - MT", lat: -15.6039, lng: -56.1211 }
    }
  ],
  'SÃO LUÍS': [
    {
      pickup: { address: "Av. dos Libaneses, 150 - Tirirical, São Luís - MA", lat: -2.5869, lng: -44.2361 },
      destination: { address: "Av. Prof. Carlos Cunha, 1000 - Jaracaty, São Luís - MA", lat: -2.5054, lng: -44.2889 }
    },
    {
      pickup: { address: "R. Portugal, 10 - Praia Grande, São Luís - MA", lat: -2.5289, lng: -44.3061 },
      destination: { address: "Av. dos Holandeses, 1500 - Ponta d'Areia, São Luís - MA", lat: -2.4811, lng: -44.3111 }
    }
  ],
  'TERESINA': [
    {
      pickup: { address: "Av. Centenário, 500 - Aeroporto, Teresina - PI", lat: -5.0606, lng: -42.8242 },
      destination: { address: "Av. Raul Lopes, 1000 - Noivos, Teresina - PI", lat: -5.0854, lng: -42.7889 }
    },
    {
      pickup: { address: "Av. Raul Lopes, 500 - Noivos, Teresina - PI", lat: -5.0911, lng: -42.7911 },
      destination: { address: "Av. Raul Lopes, 1500 - Fátima, Teresina - PI", lat: -5.0711, lng: -42.8011 }
    }
  ],
  'JOÃO PESSOA': [
    {
      pickup: { address: "Av. Mal. Rondon, 100 - Bayeux, João Pessoa - PB", lat: -7.1483, lng: -34.9506 },
      destination: { address: "Av. Gov. Flávio Ribeiro Coutinho, 805 - Manaíra, João Pessoa - PB", lat: -7.0954, lng: -34.8389 }
    },
    {
      pickup: { address: "Av. Cabo Branco, 1500 - Cabo Branco, João Pessoa - PB", lat: -7.1475, lng: -34.7967 },
      destination: { address: "Av. Alm. Tamandaré, 200 - Tambaú, João Pessoa - PB", lat: -7.1111, lng: -34.8211 }
    }
  ],
  'ARACAJU': [
    {
      pickup: { address: "Av. Sen. Júlio César Leite, 150 - Aeroporto, Aracaju - SE", lat: -10.9853, lng: -37.0733 },
      destination: { address: "Av. Min. Geraldo Barreto Sobral, 215 - Jardins, Aracaju - SE", lat: -10.9354, lng: -37.0589 }
    },
    {
      pickup: { address: "Av. Santos Dumont, 500 - Atalaia, Aracaju - SE", lat: -10.9811, lng: -37.0411 },
      destination: { address: "Av. Santos Dumont, 1500 - Atalaia, Aracaju - SE", lat: -10.9911, lng: -37.0489 }
    }
  ],
  'PORTO VELHO': [
    {
      pickup: { address: "Av. Gov. Jorge Teixeira, 1200 - Aeroporto, Porto Velho - RO", lat: -8.7136, lng: -63.9028 },
      destination: { address: "Av. Rio Madeira, 3288 - Flodoaldo Pontes Pinto, Porto Velho - RO", lat: -8.7454, lng: -63.8789 }
    },
    {
      pickup: { address: "Av. Sete de Setembro, 10 - Centro, Porto Velho - RO", lat: -8.7611, lng: -63.9111 },
      destination: { address: "Av. Calama, 1500 - Flodoaldo Pontes Pinto, Porto Velho - RO", lat: -8.7311, lng: -63.8611 }
    }
  ],
  'BOA VISTA': [
    {
      pickup: { address: "Praça Santos Dumont, 100 - Aeroporto, Boa Vista - RR", lat: 2.8414, lng: -60.6922 },
      destination: { address: "Av. Ville Roy, 1544 - Caçari, Boa Vista - RR", lat: 2.8354, lng: -60.6589 }
    },
    {
      pickup: { address: "Av. Ene Garcez, 500 - Centro, Boa Vista - RR", lat: 2.8211, lng: -60.6711 },
      destination: { address: "Av. Brigadeiro Eduardo Gomes, 1200 - Aeroporto, Boa Vista - RR", lat: 2.8511, lng: -60.6811 }
    }
  ],
  'MACAPÁ': [
    {
      pickup: { address: "R. Hildemar Maia, 500 - Santa Rita, Macapá - AP", lat: 0.0508, lng: -51.0717 },
      destination: { address: "Rod. JK, 1200 - Universidade, Macapá - AP", lat: 0.0054, lng: -51.0889 }
    },
    {
      pickup: { address: "Rod. JK, 10 - Jardim Marco Zero, Macapá - AP", lat: 0.0000, lng: -51.0789 },
      destination: { address: "R. Cândido Mendes, 150 - Centro, Macapá - AP", lat: 0.0389, lng: -51.0489 }
    }
  ],
  'RIO BRANCO': [
    {
      pickup: { address: "Rod. BR-364, 1500 - Aeroporto Velho, Rio Branco - AC", lat: -9.8683, lng: -67.8944 },
      destination: { address: "Estrada da Floresta, 2320 - Floresta Sul, Rio Branco - AC", lat: -9.9554, lng: -67.8589 }
    },
    {
      pickup: { address: "R. Benjamin Constant, 10 - Centro, Rio Branco - AC", lat: -9.9711, lng: -67.8111 },
      destination: { address: "Av. Ceará, 500 - Centro, Rio Branco - AC", lat: -9.9611, lng: -67.8211 }
    }
  ],
  'PALMAS': [
    {
      pickup: { address: "Av. Joaquim Teotônio Segurado, 1500 - Plano Diretor Sul, Palmas - TO", lat: -10.2903, lng: -48.3578 },
      destination: { address: "Av. JK, 120 - Plano Diretor Norte, Palmas - TO", lat: -10.1854, lng: -48.3389 }
    },
    {
      pickup: { address: "Av. NS-01, 10 - Plano Diretor Centro, Palmas - TO", lat: -10.1811, lng: -48.3311 },
      destination: { address: "Av. NS-15, 500 - Plano Diretor Sul, Palmas - TO", lat: -10.2011, lng: -48.3611 }
    }
  ],
  'RIBEIRÃO PRETO': [
    {
      pickup: { address: "Av. Thomaz Alberto Whately, 100 - Jardim Aeroporto, Ribeirão Preto - SP", lat: -21.1364, lng: -47.7767 },
      destination: { address: "Av. Cel. Fernando Ferreira Leite, 1540 - Jardim Nova Aliança, Ribeirão Preto - SP", lat: -21.2154, lng: -47.8189 }
    },
    {
      pickup: { address: "Av. Pres. Kennedy, 1500 - Ribeirânia, Ribeirão Preto - SP", lat: -21.1911, lng: -47.7611 },
      destination: { address: "Av. Jerônimo Gonçalves, 640 - Centro, Ribeirão Preto - SP", lat: -21.1781, lng: -47.8111 }
    }
  ],
  'SOROCABA': [
    {
      pickup: { address: "Av. Gisele Constantino, 1850 - Parque Campolim, Sorocaba - SP", lat: -23.5354, lng: -47.4689 },
      destination: { address: "Av. Santos Dumont, 500 - Vila Santa Clara, Sorocaba - SP", lat: -23.4831, lng: -47.4889 }
    },
    {
      pickup: { address: "R. Dr. Álvaro Soares, 430 - Centro, Sorocaba - SP", lat: -23.4975, lng: -47.4511 },
      destination: { address: "Av. Dom Aguirre, 1500 - Jardim Abaeté, Sorocaba - SP", lat: -23.4711, lng: -47.4311 }
    }
  ],
  'JOINVILLE': [
    {
      pickup: { address: "Av. Santos Dumont, 9000 - Jardim Sofia, Joinville - SC", lat: -26.2231, lng: -48.7989 },
      destination: { address: "Av. Rolf Wiest, 333 - Bom Retiro, Joinville - SC", lat: -26.2554, lng: -48.8489 }
    },
    {
      pickup: { address: "R. das Palmeiras, 10 - Centro, Joinville - SC", lat: -26.3011, lng: -48.8411 },
      destination: { address: "Av. José Vieira, 315 - América, Joinville - SC", lat: -26.2911, lng: -48.8311 }
    }
  ],
  'LONDRINA': [
    {
      pickup: { address: "R. Ten. João Maurício Medeiros, 300 - Aeroporto, Londrina - PR", lat: -23.3331, lng: -51.1389 },
      destination: { address: "Rod. Celso Garcia Cid, 1500 - Gleba Fazenda Palhano, Londrina - PR", lat: -23.3454, lng: -51.1889 }
    },
    {
      pickup: { address: "Av. Higienópolis, 500 - Jardim Higienópolis, Londrina - PR", lat: -23.3211, lng: -51.1611 },
      destination: { address: "Av. Dez de Dezembro, 1830 - Vila Siam, Londrina - PR", lat: -23.3111, lng: -51.1411 }
    }
  ],
  'SANTOS': [
    {
      pickup: { address: "Av. Bartolomeu de Gusmão, 500 - Ponta da Praia, Santos - SP", lat: -23.9864, lng: -46.3089 },
      destination: { address: "R. Alexandre Martins, 80 - Aparecida, Santos - SP", lat: -23.9754, lng: -46.3111 }
    },
    {
      pickup: { address: "R. Princesa Isabel, 100 - Vila Belmiro, Santos - SP", lat: -23.9511, lng: -46.3389 },
      destination: { address: "Praça da República, 10 - Centro, Santos - SP", lat: -23.9311, lng: -46.3211 }
    }
  ],
  'SÃO JOSÉ DOS CAMPOS': [
    {
      pickup: { address: "Av. Brig. Faria Lima, 1941 - Putim, São José dos Campos - SP", lat: -23.2289, lng: -45.8711 },
      destination: { address: "Av. Dep. Benedito Matarazzo, 9403 - Jardim Oswaldo Cruz, São José dos Campos - SP", lat: -23.2054, lng: -45.8789 }
    },
    {
      pickup: { address: "R. Eng. Prudente Meireles de Morais, 302 - Vila Adyana, São José dos Campos - SP", lat: -23.1911, lng: -45.8911 },
      destination: { address: "Av. São João, 2200 - Jardim das Colinas, São José dos Campos - SP", lat: -23.2011, lng: -45.9111 }
    }
  ],
  'UBERLÂNDIA': [
    {
      pickup: { address: "Av. Ten. Aviador Rafael Rezende, 1500 - Jardim Uberlândia, Uberlândia - MG", lat: -18.8831, lng: -48.2289 },
      destination: { address: "Av. João Naves de Ávila, 1331 - Tibery, Uberlândia - MG", lat: -18.9154, lng: -48.2611 }
    },
    {
      pickup: { address: "R. Haia, 500 - Tibery, Uberlândia - MG", lat: -18.9011, lng: -48.2311 },
      destination: { address: "Av. Paulo Gracindo, 15 - Morada da Colina, Uberlândia - MG", lat: -18.9511, lng: -48.2811 }
    }
  ],
  'NITERÓI': [
    {
      pickup: { address: "Mirante da Boa Viagem, 10 - Boa Viagem, Niterói - RJ", lat: -22.9078, lng: -43.1258 },
      destination: { address: "R. Quinze de Novembro, 8 - Centro, Niterói - RJ", lat: -22.8954, lng: -43.1211 }
    },
    {
      pickup: { address: "Praça Arariboia, 10 - Centro, Niterói - RJ", lat: -22.8911, lng: -43.1289 },
      destination: { address: "Av. Jorn. Alberto Francisco Torres, 500 - Icaraí, Niterói - RJ", lat: -22.9089, lng: -43.1111 }
    }
  ],
  'CAMPINAS': [
    {
      pickup: { address: "Rod. Santos Dumont, 1500 - Jardim das Bandeiras, Campinas - SP", lat: -23.0069, lng: -47.1344 },
      destination: { address: "Av. Iguatemi, 777 - Vila Brandina, Campinas - SP", lat: -22.8925, lng: -47.0258 }
    },
    {
      pickup: { address: "Av. Dr. Heitor Penteado, 500 - Taquaral, Campinas - SP", lat: -22.8754, lng: -47.0558 },
      destination: { address: "Av. Guilherme Campos, 500 - Jardim Santa Genebra, Campinas - SP", lat: -22.8489, lng: -47.0631 }
    }
  ],
  'GUARULHOS': [
    {
      pickup: { address: "Rod. Hélio Smidt, 1500 - Aeroporto, Guarulhos - SP", lat: -23.4356, lng: -46.4731 },
      destination: { address: "Rod. Pres. Dutra, 2000 - Itapegica, Guarulhos - SP", lat: -23.4854, lng: -46.5189 }
    },
    {
      pickup: { address: "Av. Paulo Faccini, 500 - Centro, Guarulhos - SP", lat: -23.4589, lng: -46.5211 },
      destination: { address: "Av. Bartolomeu de Carlos, 230 - Jardim Flor da Montanha, Guarulhos - SP", lat: -23.4411, lng: -46.5311 }
    }
  ],
  'SÃO BERNARDO DO CAMPO': [
    {
      pickup: { address: "Av. Rotary, 624 - Centro, São Bernardo do Campo - SP", lat: -23.7154, lng: -46.5489 },
      destination: { address: "R. Portugal, 150 - Riacho Grande, São Bernardo do Campo - SP", lat: -23.7611, lng: -46.5111 }
    },
    {
      pickup: { address: "Av. Kennedy, 700 - Jardim do Mar, São Bernardo do Campo - SP", lat: -23.6889, lng: -46.5511 },
      destination: { address: "Praça Samuel Sabatini, 200 - Centro, São Bernardo do Campo - SP", lat: -23.6911, lng: -46.5411 }
    }
  ],
  'OSASCO': [
    {
      pickup: { address: "Av. dos Autonomistas, 1828 - Vila Yara, Osasco - SP", lat: -23.5411, lng: -46.7689 },
      destination: { address: "R. Ten. Avelar Pires de Azevedo, 81 - Centro, Osasco - SP", lat: -23.5325, lng: -46.7758 }
    },
    {
      pickup: { address: "R. Lázaro Suave, 15 - City Bussocaba, Osasco - SP", lat: -23.5611, lng: -46.7811 },
      destination: { address: "Av. dos Autonomistas, 1400 - Vila Yara, Osasco - SP", lat: -23.5454, lng: -46.7611 }
    }
  ],
  'SÃO GONÇALO': [
    {
      pickup: { address: "Av. Pres. Kennedy, 425 - Centro, São Gonçalo - RJ", lat: -22.8244, lng: -43.0511 },
      destination: { address: "Rod. Niterói-Manilha, 1500 - Boa Vista, São Gonçalo - RJ", lat: -22.8154, lng: -43.0389 }
    },
    {
      pickup: { address: "R. Feliciano Sodré, 100 - Centro, São Gonçalo - RJ", lat: -22.8269, lng: -43.0539 },
      destination: { address: "R. Osório Costa, 500 - Colubandê, São Gonçalo - RJ", lat: -22.8411, lng: -42.9911 }
    }
  ],
  'DUQUE DE CAXIAS': [
    {
      pickup: { address: "Rod. Washington Luíz, 2895 - Parque Duque, Duque de Caxias - RJ", lat: -22.7954, lng: -43.2889 },
      destination: { address: "Rod. Washington Luíz, 1500 - Santa Cruz da Serra, Duque de Caxias - RJ", lat: -22.6511, lng: -43.3111 }
    },
    {
      pickup: { address: "R. Mariano Sendra dos Santos, 10 - Centro, Duque de Caxias - RJ", lat: -22.7856, lng: -43.3117 },
      destination: { address: "Rod. Washington Luíz, 500 - Parque Beira Mar, Duque de Caxias - RJ", lat: -22.7711, lng: -43.2911 }
    }
  ]
};

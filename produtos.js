const CATEGORIAS = [
    { id: "comida",     titulo: "Comida",     texto: "Alimentação para manter o topete forte e saudável." },
    { id: "brinquedos", titulo: "Brinquedos", texto: "Diversão para gastar energia e afiar o bico." },
    { id: "casinhas",   titulo: "Casinhas",   texto: "Um cantinho confortável para descansar." }
];
 
const PRODUTOS = [
    // ---------- Comida ----------
    { id: "frutas",  categoria: "comida", nome: "Frutas para calopsita 400 g", descricao: "Frutas para calopsitas adultas.", preco: 29.90, imagem: "imagem/frutas.jpg" },
    { id: "alpiste", categoria: "comida", nome: "Alpiste 500 g",               descricao: "Alpiste.",                        preco: 10.00, imagem: "imagem/alpiste.jpg" },
    { id: "painco",  categoria: "comida", nome: "Painço 500 g",                descricao: "Painço.",                         preco: 19.90, imagem: "imagem/painco.jpg" },       
    { id: "papinha", categoria: "comida", nome: "Papinha 400 g",               descricao: "Papinha para filhotes.",          preco: 20.00, imagem: "imagem/papinha.webp" },
    { id: "pote", categoria: "comida", nome: "kit dois comedouros",               descricao: "Kit com dois comedouros para calopsitas.",          preco: 20.00, imagem: "imagem/kit_dois_comedouro.webp" },
    { id: "kit gaiola", categoria: "comida", nome: "Kit pote plastico",               descricao: "Kit 6 Unidades Comedouro Com Aba Lateral Para Gaiola",          preco: 12.50, imagem: "imagem/kit_gaiola.webp" },
    { id: "kit pote", categoria: "comida", nome: "Kit pote + bebedouro + banheira",               descricao: "Kit com pote, bebedouro e banheira.",          preco: 32.80, imagem: "imagem/kit-pote.webp" },
 
    // ---------- Brinquedos ----------
    { id: "poleiro",    categoria: "brinquedos", nome: "Poleiro",         descricao: "5 unidades, 40 cm x 12 mm.",                                    preco: 20.90,  imagem: "imagem/poleiro.webp" },
    { id: "balanco",    categoria: "brinquedos", nome: "Balanço",         descricao: "Balanço para a calopsita se divertir.",                         preco: 12.60,  imagem: "imagem/balanco.webp" },
    { id: "chuveiro",   categoria: "brinquedos", nome: "Chuveiro",        descricao: "Chuveiro para a calopsita se refrescar.",                       preco: 34.90,  imagem: "imagem/chuveiro.jpg", video: "imagem/chuveiro_video.mp4" },   
    { id: "argola",     categoria: "brinquedos", nome: "Argola e Palito", descricao: "Argolas e palitos para o estímulo da sua ave.",                 preco: 15.80,  imagem: "imagem/argola-palito.webp" },
    { id: "espelho",    categoria: "brinquedos", nome: "Espelho",         descricao: "Espelho para a sua ave se admirar + amolador de bico para afiar.", preco: 12.80, imagem: "imagem/espelho-amolador.jpg" },
    { id: "kit",        categoria: "brinquedos", nome: "Kit útil",        descricao: "Cabana aberta + balanço + mordedor.",                           preco: 22.30,  imagem: "imagem/kit.jpg" },
    { id: "mochila",    categoria: "brinquedos", nome: "Mochila",         descricao: "Mochila para sua calopsita te acompanhar nos passeios.",        preco: 168.96, imagem: "imagem/mochila.jpg" },
    { id: "playground", categoria: "brinquedos", nome: "Playground",      descricao: "Playground para o divertimento do seu amigão.",                 preco: 55.80,  imagem: "imagem/playground.webp" },
 
    // ---------- Casinhas ----------
    { id: "cabana-fechada", categoria: "casinhas", nome: "Cabana meio fechada", descricao: "Cabana meio fechada para sua calopsita descansar.", preco: 13.40, imagem: "imagem/cabana-fechada.webp" },
    { id: "cabana-aberta",  categoria: "casinhas", nome: "Cabana aberta",       descricao: "Cabana aberta para o conforto da sua ave.",         preco: 13.20, imagem: "imagem/cabana-aberta.webp" },
    { id: "rapunzel",       categoria: "casinhas", nome: "Casinha da Rapunzel", descricao: "Casinha da Rapunzel para a sua diva.",              preco: 14.90, imagem: "imagem/casinha-rapunzel.webp" },
    { id: "ninho",          categoria: "casinhas", nome: "Casinha",             descricao: "Ninho para casal.",                                 preco: 20.80, imagem: "imagem/ninho.webp" },
    { id: "gaiola-grande",  categoria: "casinhas", nome: "Gaiola Grande",     descricao: "Gaiola grande para sua calopsita.",                 preco: 132.50, imagem: "imagem/gaiola-grande.webp" },
    { id: "viveiro",  categoria: "casinhas", nome: "viveiro supremo",             descricao: "Viveiro supremo com rodinha para sua calopsita.", preco: 370.00, imagem: "imagem/viveiro-supremo.webp" },
    { id: "gaiola",  categoria: "casinhas", nome: "gaiola pequena",             descricao: "Gaiola pequena para sua calopsita.", preco: 65.60, imagem: "imagem/gaiola-pequena.jpg" },
];
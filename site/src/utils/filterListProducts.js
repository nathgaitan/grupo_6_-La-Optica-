module.exports = {
    priceMenor : (objeto) => objeto.sort(function(a,b) {
        return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
    }),
    priceMayor : (objeto) => objeto.sort(function(a,b) {
        return a.price > b.price ? -1 : a.price < b.price ? 1 : 0;
    }),
    titleDesc : (objeto) => objeto.sort(function(a,b) {
        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0;
    }),
    titleAsc : (objeto) => objeto.sort(function(a,b) {
        return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : a.title.toLowerCase() < b.title.toLowerCase() ? 1 : 0;
    }),
    marcaDesc : (objeto) => objeto.sort(function(a,b) {
        return a.marca.toLowerCase() < b.marca.toLowerCase() ? -1 : a.marca.toLowerCase() > b.marca.toLowerCase() ? 1 : 0;
    }),
    marcaAsc : (objeto) => objeto.sort(function(a,b) {
        return a.marca.toLowerCase() > b.marca.toLowerCase() ? -1 : a.marca.toLowerCase() < b.marca.toLowerCase() ? 1 : 0;
    })
}
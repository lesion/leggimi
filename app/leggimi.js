/* global fetch */

let fake = `Due bambine, dopo aver raccolto funghi nel bosco, se ne stavano tornando a casa, quando giunsero 
davanti alla strada ferrata. Credendo che il treno fosse ancora lontano, non esitarono a passare
Ma ecco, all'improvviso, il fragore del treno. La maggiore delle sorelle fece un balzo indietro; 
la pi<F9> giovane, invece, attravers<F2> le rotaie.
- Resta dove sei! -  le grid<F2> la sorella maggiore. Ma la locomotiva era cos<EC> vicina e il rumore cos<EC> 
assordante, che la sorella minore non cap<EC>. Credette che la sorella le ordinasse di tornare 
indietro e ritorn<F2> precipitosamente sui suoi passi. Ma sulle rotaie incespic<F2>: i funghi si 
sparpagliarono per terra, e la bambina si chin<F2> a raccoglierli.
Il treno era ormai vicinissimo. Il macchinista lanciava nell'aria un fischio acuto e insistente
Vieni via! Lascia quei funghi!- gridava la sorella maggiore disperata. Ma la piccina non capiva, 
pensava che le ordinasse di raccoglierli, e li raccoglieva in tutta fretta trascinandosi in ginocchio `

const stories = [
  'LA BAMBINA DEI FUNGHI',
  'L\'INDIANO E L\'INGLESE',
  'LA RUGIADA',
  'LA GALLINA E LA RONDINE',
  'L\'ASINO E LA PELLE DEL LEONE',
  'IL CERVO E IL SUO CERBIATTO',
  'IL VESTITO',
  'LO SCIAT E IL DON',
  'IL CANE E LA SUA IMMAGINE',
  'LA VOLPE E L\'UVA',
  'IL GALLO E LE DONNE',
  'IL SALICE',
  'COME I LUPI EDUCANO I LORO FIGLI',
  'IL SORCIO NEL GRANAIO',
  'LA LEPRE E LE RANE',
  'GIVIC'
]

export default {
  stories,
  getStory: (id) => fetch('./storie/' + stories[id].replace(/ /g, '_') + '.txt')
                      .then(ret => ret.text())
                      // giusto per ora che non ci sono le apiTOFIX
                      .catch(e => fake)
}
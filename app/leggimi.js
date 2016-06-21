/* global fetch */

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
  getStory: (id) => fetch('./storie/' + stories[id].replace(/ /g, '_') + '.txt').then(ret => ret.text())
}
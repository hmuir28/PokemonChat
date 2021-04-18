import Ability from './interfaces/ability';

export default class CustomPokemon {
  abilities: Array<Ability>;
  displayName: string;
  description: string;
  logoUrl: string;
  moreDetailUrl: string;
  name: string;
  uid: string;

  constructor(
    abilities: Array<Ability>,
    displayName: string,
    description: string,
    logoUrl: string,
    moreDetailUrl: string,
    name: string,
    uid: string,
  ) {
    this.abilities = abilities;
    this.displayName = displayName;
    this.description = description;
    this.logoUrl = logoUrl;
    this.moreDetailUrl = moreDetailUrl;
    this.name = name;
    this.uid = uid;
  }
}

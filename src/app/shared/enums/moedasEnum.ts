export enum MoedasDisponiveis {
  TIBAR = 'Tibar',
  OURO_REAL = 'Ouro Real',
}

export const listaMoedas = Object.values(MoedasDisponiveis).map(
  (moeda) => moeda
);

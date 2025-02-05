export interface Transacao {
  id?: string;
  valor: number;
  taxa: number;
  moedaOrigem: string;
  moedaDestino: string;
  date: string;
  resultado: number | null;
}

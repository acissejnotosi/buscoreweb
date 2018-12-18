export interface ILinha {
	linhaId: number;
	dataCadastro: Date;
	numeroLinha: number;
	nomeLinha: string;
	numParadas: number;
	numBuracos: number;
	numLombadas: number;
	numSemaforo: number;
	totalRPNFreiosFabrica: number;
	totalRPNEmbreagemFabrica: number;
	totalRPNSuspensaoFabrica: number;
	totalKmFreiosFabrica: number;
	totalKmEmbreagemFabrica: number;
	totalKmSuspensaoFabrica: number;
	tipoOnibusId: number;
	tipoOnibusNome: string;
	pesoOnibus: number;
	
}
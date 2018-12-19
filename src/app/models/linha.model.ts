export interface ILinha {
	linhaId: number;
	numeroLinha: number;
	nomeLinha: string;
	totalRPNFreiosFabrica: number;
	totalRPNEmbreagemFabrica: number;
	totalRPNSuspensaoFabrica: number;
	totalKmFreiosFabrica: number;
	totalKmEmbreagemFabrica: number;
	totalKmSuspensaoFabrica: number;
	rpnSuspensaoBuracoFabrica: number;
	rpnSuspensaoRedutorFabrica: number;
	rpnSuspensaoCargaFabrica: number;
	rpnEmbreagemParadaFabrica: number;
	rpnEmbreagemSemaforoFabrica: number;
	rpnEmbreagemRedutorFabrica: number;
	rpnFreioParadaFabrica: number;
	rpnFreioSemaforoFabrica: number;
	rpnFreioRedutorFabrica: number;
	tipoOnibusId: number;
	tipoOnibusNome: string;
	pesoOnibus: number;
}
const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

export const getExchangeRate = async (valCode: string, date: string): Promise<number> => {
	const res = await fetch(`${URL}&valcode=${valCode}&date=${date}`)

	if (!res.ok) {
		throw new Error(`НБУ API error: ${res.status}`)
	}

	const rateData = await res.json()

	if (!Array.isArray(rateData) || rateData.length === 0) {
		throw new Error(`Курс для ${valCode} на ${date} не знайдено`)
	}

	return rateData[0].rate
}

const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

export const getExchangeRate = async (valCode: string, date: string) => {
	const res = await fetch(`${URL}&valcode=${valCode}&date=${date}`)
	const rateData = await res.json()

	return rateData[0].rate
}
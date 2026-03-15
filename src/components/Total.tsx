import { useTranslation } from 'react-i18next'

import { TotalSums } from '../types/Income'

interface TotalProps {
	parsedIncomesSums: TotalSums;
}

export const Total = ({ parsedIncomesSums }: TotalProps) => {
	const { t } = useTranslation()

	return (
		<div className="sticky top-20 p-2 rounded-lg shadow-md bg-white max-[1372px]:static max-[1372px]:mb-8">
			<div className="overflow-x-auto">
				<table className="w-full text-sm border-collapse">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('period')}</th>
							<th className="text-left px-4 py-3 font-semibold text-gray-700">{t('sum')}</th>
							<th className="text-left px-4 py-3 font-semibold text-gray-700">1%</th>
							<th className="text-left px-4 py-3 font-semibold text-gray-700">3%</th>
							<th className="text-left px-4 py-3 font-semibold text-gray-700">5%</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(parsedIncomesSums.quarter).map(([quarter, total]) => (
							<tr key={quarter} className="border-b border-gray-100 hover:bg-gray-50">
								<td className="px-4 py-2">{t(quarter)}</td>
								<td className="px-4 py-2">{total.sum.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage1.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage3.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage5.toFixed(2)}</td>
							</tr>
						))}
						{Object.entries(parsedIncomesSums.half).map(([half, total]) => (
							<tr key={half} className="border-b border-gray-100 hover:bg-gray-50">
								<td className="px-4 py-2">{t(half)}</td>
								<td className="px-4 py-2">{total.sum.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage1.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage3.toFixed(2)}</td>
								<td className="px-4 py-2">{total.percentage5.toFixed(2)}</td>
							</tr>
						))}
						<tr className="hover:bg-gray-50">
							<td className="px-4 py-2">{t('year')}</td>
							<td className="px-4 py-2">{parsedIncomesSums.year.sum.toFixed(2)}</td>
							<td className="px-4 py-2">{parsedIncomesSums.year.percentage1.toFixed(2)}</td>
							<td className="px-4 py-2">{parsedIncomesSums.year.percentage3.toFixed(2)}</td>
							<td className="px-4 py-2">{parsedIncomesSums.year.percentage5.toFixed(2)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

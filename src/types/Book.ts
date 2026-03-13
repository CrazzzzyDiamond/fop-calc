import { Income } from './Income'

export interface Book {
	id: string;
	name: string;
	incomes: Income[];
}

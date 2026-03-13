import i18n from 'i18next'                      
import { initReactI18next } from 'react-i18next'

i18n
	.use(initReactI18next)
	.init({
		lng: 'en',
		fallbackLng: 'en',
		// debug: true,
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				translation: {
					period: 'Period',
					sum: 'Sum',
					date: 'Date',
					currency: 'Currency',
					rate: 'Rate',
					uahSum: 'Uah Sum',
					tax1: '1%',
					addIncome: 'Add income',
					add: 'Add',
					cancel: 'Cancel',
					confirm: 'Confirm',
					Q1: '1 quarter',
					Q2: '2 quarter',
					Q3: '3 quarter',
					Q4: '4 quarter',
					year: 'Year',
					firstHalf: 'First half year',
					secondHalf: 'Second half year',
					areYouSure: 'Are you sure?',
					canNotBeUndone: 'This action can not be undone',
					clear: 'Clear',
					clearTitle: 'Clear all data?',
					noIncomes: 'No data',
					newBook: 'New book',
					deleteBook: 'Delete book',
					deleteBookTitle: 'Delete this book?',
					create: 'Create',
					bookName: 'Book name',
				},
			},
			ua: {
				translation: {
					period: 'Період',
					sum: 'Сума',
					date: 'Дата',
					currency: 'Валюта',
					rate: 'Курс',
					uahSum: 'Сума в грн',
					tax1: '1%',
					addIncome: 'Додати дохід',
					add: 'Додати',
					cancel: 'Скасувати',
					confirm: 'Підтвердити',
					Q1: '1 квартал',
					Q2: '2 квартал',
					Q3: '3 квартал',
					Q4: '4 квартал',
					year: 'Рік',
					firstHalf: 'Перша половина року',
					secondHalf: 'Друга половина року',
					areYouSure: 'Ви впевнені?',
					canNotBeUndone: 'Цю дію не можна скасувати',
					clear: 'Очистити',
					clearTitle: 'Очистити всі дані?',
					noIncomes: 'Записів немає',
					newBook: 'Нова книга',
					deleteBook: 'Видалити книгу',
					deleteBookTitle: 'Видалити цю книгу?',
					create: 'Створити',
					bookName: 'Назва книги',
				},
			}
		},
	})

export default i18n
/**
 * Получает случайную активность с внешнего API.
 * @async
 * @returns {Promise<string>} Возвращает текст активности.
 * @throws Ошибка, если запрос завершился неудачно.
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // это массив
        return data[0]; // берём первый элемент массива
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

